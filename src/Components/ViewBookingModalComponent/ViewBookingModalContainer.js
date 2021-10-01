import React from "react"
import ViewBookingView from "./ViewBookingModalView"
export default function ViewBookingContainer(props) {
    const {
        viewBookingClick,
        setViewBookingClick
    } = props
    return (
        <div>
            <ViewBookingView
                viewBookingClick={viewBookingClick}
                setViewBookingClick={setViewBookingClick}
            />
        </div>
    )
}