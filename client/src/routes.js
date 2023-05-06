import {
  ADMIN_ROUTE,
  CART_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  STORE_ROUTE,
  ERROR_ROUTE,
} from "./utils/consts";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Store from "./pages/Store";
import Registration from "./pages/Registration";
import ErrorPage from "./pages/ErrorPage";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: CART_ROUTE,
    Component: Cart,
  },
];

export const publicRoutes = [
  {
    path: STORE_ROUTE,
    Component: Store,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: ERROR_ROUTE,
    Component: ErrorPage,
  },
];
