import React from "react"
import EachBookingViewView from "./EachBookingViewView"
export default function EachBookingViewContainer(props) {
    const {
        booking,
        guests,
        rerender,
        setRerender
    } = props
    return (
        <div>
            <EachBookingViewView 
                booking = {booking}
                guests = {guests}
                rerender={rerender}
                setRerender={setRerender}
            />
        </div>
    )
}