import { renderWithContext, getStateWithItems } from "../../test-utils";
import {  screen } from "@testing-library/react";
import ProductItem from "../ProductItem";
import userEvent from "@testing-library/user-event";

const mockData = {
      id: 3,
      name: "Ранч пицца",
      price: 28,
      img: "bf256384-f734-4ace-9a57-3514a595d95d.jpg",
      compound:
          "американский соус ранч, филе цыпленка, ветчина, свежие томаты, сыр моцарелла, базилик",
      createdAt: "2023-03-31T00:58:01.931Z",
      updatedAt: "2023-03-31T00:58:01.931Z",
      typeId: 1,
    };

const mockCart =   {
      id: 3,
      name: "Ранч пицца",
      price: 28,
      img: "bf256384-f734-4ace-9a57-3514a595d95d.jpg",
      compound:
          "американский соус ранч, филе цыпленка, ветчина, свежие томаты, сыр моцарелла, базилик",
      createdAt: "2023-03-31T00:58:01.931Z",
      updatedAt: "2023-03-31T00:58:01.931Z",
      typeId: 1,
      quantity: 2,
    };

describe("ProductItem", () => {
  it("should render", () => {
    renderWithContext(<ProductItem product={mockData} quantity={false} />);
    expect(screen.getByRole("product__item")).toBeInTheDocument();
  });
  it("should render product", () => {
    renderWithContext(<ProductItem product={mockData} quantity={false} />);
    expect(screen.getByText("Добавить в корзину")).toBeInTheDocument();
  });
  it("should add item to the cart", () => {
    const { store } = renderWithContext(<ProductItem product={mockData} quantity={false} />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(store.getState().cart.cart[0].quantity).toBe(1);
  });
  it("should increment quantity", () => {
    const state = getStateWithItems({ cart: [mockCart] });
    const { store } = renderWithContext(<ProductItem product={mockData} quantity={1} />,state);
    const button = screen.getByRole("increment");
    userEvent.click(button);
    expect(store.getState().cart.cart[0].quantity).toBe(3);
  });
  it("should decrement quantity", () => {
    const state = getStateWithItems({ cart: [mockCart] });
    const { store } = renderWithContext(<ProductItem product={mockData} quantity={1} />,state);
    const button = screen.getByRole("decrement");
    userEvent.click(button);
    expect(store.getState().cart.cart[0].quantity).toBe(1);
  });
});
