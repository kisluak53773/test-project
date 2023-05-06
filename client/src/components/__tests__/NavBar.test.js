import NavBar from "../NavBar";
import { screen } from "@testing-library/react";
import { renderWithContext } from "../../test-utils";

describe("NavBar", () => {
  describe("render", () => {
    it("should render", () => {
      renderWithContext(<NavBar />);
      expect(screen.getByText(/pizzaMania/i)).toBeInTheDocument();
    });
  });
});
