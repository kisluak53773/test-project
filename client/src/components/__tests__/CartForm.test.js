import { screen } from "@testing-library/react";
import {getStateWithItems, renderWithContext} from "../../test-utils";
import CartForm from "../CartForm";
import userEvent from "@testing-library/user-event";

const mockItem=[
    {id:1}
]

describe("CartForm",()=>{
    it("should render",()=>{
        const state=getStateWithItems({cart:mockItem})
        renderWithContext(<CartForm/>,state)
        expect(screen.getByRole("cart__form")).toBeInTheDocument()
    })
    it("input field for full name should work",()=>{
        const state=getStateWithItems({cart:mockItem})
        renderWithContext(<CartForm/>,state)
        const input=screen.getByRole("name")
        userEvent.clear(input)
        userEvent.tab(input)
        userEvent.type(input,"data")
        expect(screen.getByRole("name").value).toBe("data")
    })
    it("input field for city should work",()=>{
        const state=getStateWithItems({cart:mockItem})
        renderWithContext(<CartForm/>,state)
        const input=screen.getByRole("city")
        userEvent.clear(input)
        userEvent.tab(input)
        userEvent.type(input,"data")
        expect(screen.getByRole("city").value).toBe("data")
    })
    it("input field for phone should work",()=>{
        const state=getStateWithItems({cart:mockItem})
        renderWithContext(<CartForm/>,state)
        const input=screen.getByRole("phone")
        userEvent.clear(input)
        userEvent.tab(input)
        userEvent.type(input,"data")
        expect(screen.getByRole("phone").value).toBe("data")
    })
    it("input field for address should work",()=>{
        const state=getStateWithItems({cart:mockItem})
        renderWithContext(<CartForm/>,state)
        const input=screen.getByRole("address")
        userEvent.clear(input)
        userEvent.tab(input)
        userEvent.type(input,"data")
        expect(screen.getByRole("address").value).toBe("data")
    })
    it("input field for comment should work",()=>{
        const state=getStateWithItems({cart:mockItem})
        renderWithContext(<CartForm/>,state)
        const input=screen.getByRole("comment")
        userEvent.clear(input)
        userEvent.tab(input)
        userEvent.type(input,"data")
        expect(screen.getByRole("comment").value).toBe("data")
    })
})