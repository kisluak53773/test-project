import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { getStoreWithState } from "./store";
import { render } from "@testing-library/react";

export function renderWithContext(element, state) {
  const store = getStoreWithState(state);
  const utils = render(
    <Provider store={store}>
      <Router>{element}</Router>
    </Provider>
  );
  return { store, ...utils };
}

export function getStateWithItems({
  types = [],
  productList = [],
  cart = [],
  orders = [],
  user = {},
}) {
  const state = {
    products: {
      types,
      productList,
      selectedType: "",
      isLoading: { products: false, types: false },
      errors: {
        products: "",
        types: "",
      },
    },
    cart: { cart, error: "" },
    orders: {
      page: 1,
      limit: 5,
      count: 0,
      orders,
      isLoading: false,
      error: "",
    },
    user: {
      isAuth: false,
      user,
      isLoading: false,
      error: "",
    },
  };
  return state;
}
