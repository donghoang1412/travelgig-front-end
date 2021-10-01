import React from "react"
import SliderContainer from "../SliderComponent/SliderContainer"
import StarRatingContainer from "../StarRatingComponent/StarRatingContainer"
import AmenityContainer from "../AmenityComponent/AmenityContainer"
// import { Button } from "@material-ui/core"
export default function FilterView(props) {

    return (
        <div>
            <StarRatingContainer />
            <SliderContainer />
            <h5 className="text"> Select Filters</h5>
            <AmenityContainer />
            {/* <Button className ="buttonFilter" variant="contained" color="primary" > Filter</Button> */}
        </div>
    )
}