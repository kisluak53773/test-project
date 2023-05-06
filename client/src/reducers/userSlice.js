import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, checkUser, registerUser } from "../http/userAPI";

const initialState = {
  isAuth: false,
  user: {},
  isLoading: false,
  error: false,
};

export const fetchUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    console.log("email" + email + " password" + password);
    const user = await loginUser(email, password);
    return user;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ email, password }) => {
    const user = await registerUser(email, password);
    return user;
  }
);

export const auth = createAsyncThunk("user/auth", async () => {
  const data = await checkUser();
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuth = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.error = false;
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.error = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(auth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(auth.fulfilled, (state, action) => {
      state.error = false;
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(auth.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { logoutUser } = userSlice.actions;

export const getIsLoading = (state) => state.user.isLoading;
export const getError = (state) => state.user.error;
export const getIsAuth = (state) => state.user.isAuth;
export const getUser = (state) => state.user.user;

export default userSlice.reducer;
