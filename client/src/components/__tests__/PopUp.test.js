import { screen } from "@testing-library/react";
import { renderWithContext } from "../../test-utils";
import Popup from "../Popup";

describe("PopUp", () => {
  it("should render", () => {
    renderWithContext(<Popup />);
    expect(screen.getByRole("popUp")).toBeInTheDocument();
  });
});
