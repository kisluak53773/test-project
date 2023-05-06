import { screen, waitFor } from "@testing-library/react";
import ProductList from "../ProductList";
import * as api from "../../http/productAPI";
import { renderWithContext, getStateWithItems } from "../../test-utils";

const mockData = [
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
  },
];

const getProductsSpy = jest.spyOn(api, "getProducts");

describe("ProductList", () => {
  describe("render", () => {
    it("should render", async () => {
      getProductsSpy.mockResolvedValue(mockData);
      renderWithContext(<ProductList />);
      await waitFor(() => {
        expect(screen.getByRole("product__list")).toBeInTheDocument();
      });
    });
    it("should call async thunk to fetch products", async () => {
      getProductsSpy.mockResolvedValue(mockData);
      renderWithContext(<ProductList />);
      await waitFor(() => expect(getProductsSpy).toHaveBeenCalledTimes(1));
      await waitFor(() =>
        expect(screen.getByText("Ранч пицца")).toBeInTheDocument()
      );
    });
    it("should render productItem component", async () => {
      getProductsSpy.mockResolvedValue(mockData);
      renderWithContext(<ProductList />);
      await waitFor(() => {
        expect(screen.getByText("Ранч пицца")).toBeInTheDocument();
      });
    });
  });
});
