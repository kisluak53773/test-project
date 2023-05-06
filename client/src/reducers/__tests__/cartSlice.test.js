import cartReducer, {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  getCart,
  getError,
  saveProducts,
} from "../cartSlice";
import * as API from "../../http/orderAPI";
import { getStoreWithState } from "../../store";

jest.mock("../../http/orderAPI", () => {
  return {
    async createOrder(id, cart, comment, payment, name, city, phone, address) {
      if (
        !id ||
        !cart ||
        !comment ||
        !payment ||
        !name ||
        !city ||
        !phone ||
        !address
      )
        throw new Error("Not enough data about the order");
      return { success: true };
    },
  };
});

test("api test", async () => {
  const result = await API.createOrder(1, 1, 1, 1, 1, 1, 1, 1);
  expect(result).toEqual({ success: true });
});

describe("CartReducer", () => {
  describe("cart reducer", () => {
    it("an empty action", () => {
      const initialState = undefined;
      const action = { type: "" };
      const result = cartReducer(initialState, action);
      expect(result).toEqual({ cart: [], error: false });
    });
    it("should add product to cart", () => {
      const initialState = undefined;
      const action = addToCart({ id: 1 });
      const result = cartReducer(initialState, action);
      expect(result).toEqual({ cart: [{ id: 1, quantity: 1 }], error: false });
    });
    it("should remove product from cart", () => {
      const initialState = { cart: [{ id: 1, quantity: 1 }], error: false };
      const action = removeFromCart(1);
      const result = cartReducer(initialState, action);
      expect(result).toEqual({ cart: [], error: false });
    });
    it("increment quantity", () => {
      const initialState = { cart: [{ id: 1, quantity: 1 }], error: false };
      const action = incrementQuantity(1);
      const result = cartReducer(initialState, action);
      expect(result).toEqual({ cart: [{ id: 1, quantity: 2 }], error: false });
    });
    it("decrement quantity", () => {
      const initialState = { cart: [{ id: 1, quantity: 3 }], error: false };
      const action = decrementQuantity(1);
      const result = cartReducer(initialState, action);
      expect(result).toEqual({ cart: [{ id: 1, quantity: 2 }], error: false });
    });
  });
  describe("cart selectors", () => {
    it("should return empty cart", () => {
      const initialState = { cart: { cart: [], error: "" } };
      const result = getCart(initialState);
      expect(result).toEqual([]);
    });
    it("should return error", () => {
      const initialState = {
        cart: { cart: [], error: "something went wrong" },
      };
      const result = getError(initialState);
      expect(result).toEqual("something went wrong");
    });
  });
  describe("cart save method testing", () => {
    it("should receive all required data for request", async () => {
      const dispatch = jest.fn();
      const thunk = saveProducts({
        id: 1,
        cart: 1,
        comment: 1,
        payment: 1,
        name: 1,
        city: 1,
        phone: 1,
        address: 1,
      });
      await thunk(dispatch);
      const { calls } = dispatch.mock;
      const [start, end] = calls;
      expect(start[0].type).toBe(saveProducts.pending().type);
      expect(end[0].type).toBe(saveProducts.fulfilled().type);
      expect(end[0].payload).toEqual({ success: true });
    });
    it("should drop data about an order when it sent", async () => {
      const state = {
        cart: {
          cart: [{ item: 1, item: 2 }],
          error: "some error",
        },
      };
      const store = getStoreWithState(state);
      await store.dispatch(
        saveProducts({
          id: 1,
          cart: 1,
          comment: 1,
          payment: 1,
          name: 1,
          city: 1,
          phone: 1,
          address: 1,
        })
      );
      expect(store.getState().cart.cart).toStrictEqual([]);
      expect(store.getState().cart.error).toBe(false);
    });
  });
});
