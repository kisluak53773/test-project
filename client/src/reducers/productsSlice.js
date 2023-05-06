import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTypes, getProducts } from "../http/productAPI";

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

export const fetchTypes = createAsyncThunk("types/fetchTypes", async () => {
  const response = await getTypes();
  return response;
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (typeId) => {
    const response = await getProducts(typeId);
    return response;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectType: (state, action) => {
      state.selectedType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors.products = false;
      state.productList = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errors.products = action.error.message;
    });
    builder.addCase(fetchTypes.fulfilled, (state, action) => {
      state.errors.types = false;
      state.types = action.payload;
    });
    builder.addCase(fetchTypes.rejected, (state, action) => {
      state.errors.types = action.error.message;
    });
  },
});

export const { setSelectType } = productSlice.actions;

export const getIsLoading = (state) => state.products.isLoading;
export const getError = (state) => state.products.errors;
export const getAllTypes = (state) => state.products.types;
export const getAllProducts = (state) => state.products.productList;
export const getSelectedType = (state) => state.products.selectedType;

export default productSlice.reducer;
