import React from "react"
import ChipModalView from "./ChipModalView"
import "./ChipModal.css"
export default function ChipModalContainer (props) {
    const {
        amenity
    } = props
    return (
        <div className = "chip">
            <ChipModalView 
                amenity={amenity}
            />
        </div>
    )
}