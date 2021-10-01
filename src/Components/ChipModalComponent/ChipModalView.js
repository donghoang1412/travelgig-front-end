import React, { } from "react"

export default function ChipModalView (props) {
    const {
        amenity
    } = props
  
    return (
        <div className="check">
           <h6><i class="fa fa-thumbs-up"></i>{amenity}</h6>  
        </div>
    )
}