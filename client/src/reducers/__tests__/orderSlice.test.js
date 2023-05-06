import orderReducer, { changeState, fetchOrders, setPage } from "../orderSlice";
import { getStoreWithState } from "../../store";
import * as API from "../../http/orderAPI";

jest.mock("../../http/orderAPI", () => {
  return {
    async getAllOrders() {
      return {
        status: 200,
        count: 1,
        orders: [{ item: 1 }, { item: 2 }],
      };
    },
    async patchOrder(status, id) {
      if (!status || !id) throw new Error("Status and id should not be empty");
      return { success: true };
    },
  };
});

describe("OrderReducer test", () => {
  describe("reducers", () => {
    it("an empty action ", () => {
      const initialState = undefined;
      const action = { type: "" };
      const result = orderReducer(initialState, action);
      expect(result).toEqual({
        page: 1,
        limit: 5,
        count: 0,
        orders: [],
        isLoading: false,
        error: false,
      });
    });

    it("should change a page", () => {
      const initialState = undefined;
      const action = setPage(2);
      const result = orderReducer(initialState, action);
      expect(result).toEqual({
        page: 2,
        limit: 5,
        count: 0,
        orders: [],
        isLoading: false,
        error: false,
      });
    });
  });

  describe("async thunks", () => {
    it("should fetch all Orders", async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => {
        return {
          orders: {
            page: 1,
            limit: 5,
          },
        };
      });
      const thunk = fetchOrders();
      await thunk(dispatch, getState, undefined);
      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      const [start, end] = calls;
      expect(start[0].type).toBe(fetchOrders.pending().type);
      expect(end[0].type).toBe(fetchOrders.fulfilled().type);
    });
    it("should post new state", async () => {
      const dispatch = jest.fn();
      const thunk = changeState({ status: "Завершен", id: 1 });
      await thunk(dispatch);
      const { calls } = dispatch.mock;
      const [start, end] = calls;
      expect(start[0].type).toBe(changeState.pending().type);
      expect(end[0].type).toBe(changeState.fulfilled().type);
      expect(end[0].payload).toEqual({ success: true });
    });
  });

  describe("test with mock store", () => {
    it("should save orders", async () => {
      const state = {
        orders: {
          page: 1,
          limit: 5,
          count: 0,
          orders: [],
          isLoading: false,
          error: false,
        },
      };
      const store = getStoreWithState(state);
      await store.dispatch(fetchOrders());
      expect(store.getState().orders.orders).toStrictEqual([
        { item: 1 },
        { item: 2 },
      ]);
    });
  });
});
