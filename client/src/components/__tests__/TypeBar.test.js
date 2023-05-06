import {screen, waitFor} from "@testing-library/react";
import {getStateWithItems, renderWithContext} from "../../test-utils";
import TypeBar from "../TypeBar";
import * as api from "../../http/productAPI";

const getTypesSpy=jest.spyOn(api,"getTypes")

const mockItem=[
    {
        id:1,
        name:"Пицца",
        createdAt:"2023-03-31T00:54:11.228Z",
        updatedAt:"2023-03-31T00:54:11.228Z",
    }
]

describe("TypeBar",()=>{
    it("should render",()=>{
        getTypesSpy.mockReturnValue(mockItem)
        renderWithContext(<TypeBar/>)
        expect(screen.getByRole("typeBar")).toBeInTheDocument()
        expect(screen.getByRole('heading',{name:"Все"})).toBeInTheDocument()
    })
    it("should fetch types",async ()=>{
        getTypesSpy.mockReturnValue(mockItem)
        renderWithContext(<TypeBar/>)
        await waitFor(() =>expect(getTypesSpy).toHaveBeenCalledTimes(1));
        await waitFor(()=>expect(screen.getByRole('heading',{name:"Пицца"})).toBeInTheDocument())
    })
    it("should render types",()=>{
        getTypesSpy.mockReturnValue(mockItem)
        const state= getStateWithItems({types:mockItem})
        renderWithContext(<TypeBar/>,state)
        expect(screen.getByRole('heading',{name:"Пицца"})).toBeInTheDocument()
    })
})