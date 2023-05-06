import { screen } from "@testing-library/react";
import {getStateWithItems, renderWithContext} from "../../test-utils";
import CartItem from "../CartItem";
import userEvent from "@testing-library/user-event";

const mockItem = {
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

describe("CartItem", () => {
  describe("render", () => {
    it("should render", () => {
      renderWithContext(<CartItem product={mockItem} />);
      expect(screen.getByRole("cart__item")).toBeInTheDocument();
    });
    it("should render item", () => {
      renderWithContext(<CartItem product={mockItem} />);
      expect(screen.getByText("Ранч пицца")).toBeInTheDocument();
    });
  });
  it("should remove item from cart",()=>{
    const state=getStateWithItems({cart:[mockItem]})
    const {store} =renderWithContext(<CartItem product={mockItem} />,state);
    const button = screen.getByRole("remove");
    userEvent.click(button);
    expect(store.getState().cart.cart).toEqual([]);
  })
  it("should increment quantity",()=>{
    const state=getStateWithItems({cart:[mockItem]})
    const {store} =renderWithContext(<CartItem product={mockItem} />,state);
    const button = screen.getByRole("increment");
    userEvent.click(button);
    expect(store.getState().cart.cart[0].quantity).toBe(3);
  })
  it("should decrement quantity",()=>{
    const state=getStateWithItems({cart:[mockItem]})
    const {store} =renderWithContext(<CartItem product={mockItem} />,state);
    const button = screen.getByRole("decrement");
    userEvent.click(button);
    expect(store.getState().cart.cart[0].quantity).toBe(1);
  })
});
