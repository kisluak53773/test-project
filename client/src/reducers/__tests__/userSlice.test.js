import userReducer, {
  fetchUser,
  register,
  auth,
  logoutUser,
} from "../userSlice";
import * as API from "../../http/userAPI";
import { getStoreWithState } from "../../store";

jest.mock("../../http/userAPI", () => {
  return {
    async loginUser(email, password) {
      if (!email || !password)
        throw new Error("Email or password should not be empty");
      return { success: true };
    },
    async registerUser(email, password) {
      if (!email || !password)
        throw new Error("Email or password should not be empty");
      return { success: true };
    },
    async checkUser() {
      return {
        success: true,
      };
    },
  };
});

describe("UserSlice", () => {
  describe("reducers", () => {
    it("an empty action", () => {
      const initialState = undefined;
      const action = { type: "" };
      const result = userReducer(initialState, action);
      expect(result).toEqual({
        isAuth: false,
        user: {},
        isLoading: false,
        error: false,
      });
    });
    it("should logout user", () => {
      const initialState = {
        isAuth: true,
        user: { id: 1 },
        isLoading: false,
        error: false,
      };
      const action = logoutUser;
      const result = userReducer(initialState, action);
      expect(result).toEqual({
        isAuth: false,
        user: {},
        isLoading: false,
        error: false,
      });
    });
  });
  describe("async thunks", () => {
    it("should register user", async () => {
      const dispatch = jest.fn();
      const thunk = register({ email: 1, password: 1 });
      await thunk(dispatch);
      const { calls } = dispatch.mock;
      console.log(calls[1]);
      const [start, end] = calls;
      expect(start[0].type).toBe(register.pending().type);
      expect(end[0].type).toBe(register.fulfilled().type);
      expect(end[0].payload).toEqual({ success: true });
    });
    it("should login user", async () => {
      const dispatch = jest.fn();
      const thunk = fetchUser({ email: 1, password: 1 });
      await thunk(dispatch);
      const { calls } = dispatch.mock;
      console.log(calls[1]);
      const [start, end] = calls;
      expect(start[0].type).toBe(fetchUser.pending().type);
      expect(end[0].type).toBe(fetchUser.fulfilled().type);
      expect(end[0].payload).toEqual({ success: true });
    });
    it("should auth user", async () => {
      const dispatch = jest.fn();
      const thunk = auth();
      await thunk(dispatch);
      const { calls } = dispatch.mock;
      console.log(calls[1]);
      const [start, end] = calls;
      expect(start[0].type).toBe(auth.pending().type);
      expect(end[0].type).toBe(auth.fulfilled().type);
      expect(end[0].payload).toEqual({ success: true });
    });
  });
  describe("tests with mock store", () => {
    it("should set user", async () => {
      const state = {
        user: {
          isAuth: false,
          user: {},
          isLoading: false,
          error: false,
        },
      };
      const store = getStoreWithState(state);
      await store.dispatch(fetchUser({ email: 1, password: 1 }));
      expect(store.getState().user.isAuth).toBe(true);
      expect(store.getState().user.user).toStrictEqual({ success: true });
    });
  });
});
