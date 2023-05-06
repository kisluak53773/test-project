import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrders, patchOrder } from "../http/orderAPI";

const initialState = {
  page: 1,
  limit: 5,
  count: 0,
  orders: [],
  isLoading: false,
  error: false,
};

export const fetchOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { getState }) => {
    const { limit, page } = getState().orders;
    const response = await getAllOrders(limit, page);
    return response;
  }
);

export const changeState = createAsyncThunk(
  "orders/changeState",
  async ({ status, id }) => {
    const response = await patchOrder(status, id);
    return response;
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.error = false;
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      const { count, orders } = action.payload;
      state.orders = orders;
      state.count = count;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(changeState.fulfilled, (state) => {
      state.error = false;
    });
    builder.addCase(changeState.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const getIsLoading = (state) => state.orders.isLoading;
export const getError = (state) => state.orders.error;
export const getOrders = (state) => state.orders.orders;
export const getLimit = (state) => state.orders.limit;
export const getPage = (state) => state.orders.page;
export const getCount = (state) => state.orders.count;

export const { setPage } = orderSlice.actions;

export default orderSlice.reducer;
