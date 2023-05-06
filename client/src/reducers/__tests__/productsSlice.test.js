import * as API from "../../http/productAPI";
import { getStoreWithState } from "../../store";
import productsReducer, {
  fetchProducts,
  fetchTypes,
  setSelectType,
} from "../productsSlice";

jest.mock("../../http/productAPI", () => {
  return {
    async getProducts() {
      return [{ success: true }];
    },
    async getTypes() {
      return [{ success: true }];
    },
  };
});

describe("OrderReducer test", () => {
  describe("reducer", () => {
    it("an empty action", () => {
      const initialState = undefined;
      const action = { type: "" };
      const result = productsReducer(initialState, action);
      expect(result).toEqual({
        types: [],
        productList: [],
        selectedType: "",
        isLoading: false,
        errors: {
          products: false,
          types: false,
        },
      });
    });
    it("should change type", () => {
      const initialState = {
        types: [],
        productList: [],
        selectedType: "",
        isLoading: false,
        errors: {
          products: false,
          types: false,
        },
      };
      const action = setSelectType("all");
      const result = productsReducer(initialState, action);
      expect(result).toEqual({
        types: [],
        productList: [],
        selectedType: "all",
        isLoading: false,
        errors: {
          products: false,
          types: false,
        },
      });
    });
  });
  describe("async thunks", () => {
    it("fetch products", async () => {
      const dispatch = jest.fn();
      const thunk = fetchProducts();
      await thunk(dispatch);
      const { calls } = dispatch.mock;
      const [start, end] = calls;
      expect(start[0].type).toBe(fetchProducts.pending().type);
      expect(end[0].type).toBe(fetchProducts.fulfilled().type);
    });
    it("should fetch types", async () => {
      const dispatch = jest.fn();
      const thunk = fetchTypes();
      await thunk(dispatch);
      const { calls } = dispatch.mock;
      const [start, end] = calls;
      expect(start[0].type).toBe(fetchTypes.pending().type);
      expect(end[0].type).toBe(fetchTypes.fulfilled().type);
    });
  });
  describe("test with mock store", () => {
    it("should set products", async () => {
      const state = {
        products: {
          types: [],
          productList: [],
          selectedType: "",
          isLoading: { products: false, types: false },
          errors: {
            products: false,
            types: false,
          },
        },
      };
      const store = getStoreWithState(state);
      await store.dispatch(fetchProducts());
      expect(store.getState().products.productList).toStrictEqual([
        { success: true },
      ]);
    });
    it("should set products", async () => {
      const state = {
        products: {
          types: [],
          productList: [],
          selectedType: "",
          isLoading: { products: false, types: false },
          errors: {
            products: false,
            types: false,
          },
        },
      };
      const store = getStoreWithState(state);
      await store.dispatch(fetchTypes());
      expect(store.getState().products.types).toStrictEqual([
        { success: true },
      ]);
    });
  });
});
