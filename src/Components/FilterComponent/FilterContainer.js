import React from "react"
import FilterView from "./FilterView"
import "./Filter.css"
import { useSelector } from "react-redux"
export default function FilterContainer() {
    
    const getStar = useSelector(state => state.StarReducer.star)
    console.log("On Filter Component, star: " + getStar)
    const getPrice = useSelector(state => state.PriceReducer.price)
    console.log("On Filter Component, price: " + getPrice)
    return (
        <div className="filterView">
            <FilterView 
                
            />
        </div>
    )
}