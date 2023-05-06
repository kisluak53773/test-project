import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../http/orderAPI";

const initialState = {
  cart: [],
  error: false,
};

export const saveProducts = createAsyncThunk(
  "cart/saveProducts",
  async ({ id, cart, comment, payment, name, city, phone, address }) => {
    const response = await createOrder(
      id,
      cart,
      comment,
      payment,
      name,
      city,
      phone,
      address
    );
    return response;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((c) => c.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const filteredItems = state.cart.filter((c) => c.id !== action.payload);
      state.cart = filteredItems;
    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find((c) => c.id === action.payload);
      itemInCart.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find((c) => c.id === action.payload);
      if (itemInCart.quantity === 1) {
        itemInCart.quantity = 1;
      } else {
        itemInCart.quantity--;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveProducts.fulfilled, (state) => {
      state.error = false;
      state.cart = [];
    });
    builder.addCase(saveProducts.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export const getError = (state) => state.cart.error;
export const getCart = (state) => state.cart.cart;

export default cartSlice.reducer;
