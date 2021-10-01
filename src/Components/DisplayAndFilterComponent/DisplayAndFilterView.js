import React from "react"
import DisplayHotelContainer from "../DisplayHotelComponent/DisplayHotelContainer"
import FilterContainer from "../FilterComponent/FilterContainer"
export default function DisplayAndFilterView () {
    return (
        <div className="display-and-filter">
            <FilterContainer />
            <DisplayHotelContainer/>
        </div>
    )
}