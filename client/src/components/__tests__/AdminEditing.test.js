import { screen } from "@testing-library/react";
import { renderWithContext} from "../../test-utils";
import AdminEditing from "../AdminEditing";

describe("AdminEditing",()=>{
    it("should render",()=>{
        renderWithContext(<AdminEditing/>)
        expect(screen.getByRole("admin__editing")).toBeInTheDocument()
    })
})