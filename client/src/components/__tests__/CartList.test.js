import { screen } from "@testing-library/react";
import CartList from "../CartList";
import { renderWithContext, getStateWithItems } from "../../test-utils";

jest.mock(
  "../CartItem",
  () =>
    ({ product }) =>
      `This is cart item:${product.name}`
);

const mockItems = [
  {
    id: 3,
    name: "Ранч пицца",
    price: 28,
    img: "bf256384-f734-4ace-9a57-3514a595d95d.jpg",
    compound:
        "американский соус ранч, филе цыпленка, ветчина, свежие томаты, сыр моцарелла, базилик",
    createdAt: "2023-03-31T00:58:01.931Z",
    updatedAt: "2023-03-31T00:58:01.931Z",
    typeId: 1,
    quantity: 1,
  },
];

describe("CartList", () => {
  describe("render", () => {
    it("should render", () => {
      renderWithContext(<CartList />);
      expect(screen.getByRole("cart__list")).toBeInTheDocument();
    });
    it("should render CartItem", () => {
      const state = getStateWithItems({ cart: mockItems });
      renderWithContext(<CartList />, state);
      expect(
        screen.getByText("This is cart item:Ранч пицца")
      ).toBeInTheDocument();
    });
  });
});
