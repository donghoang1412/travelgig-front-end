import React from "react"
import DateUntilBookingView from "./DateUntilBookingView"
export default function DateUntilBookingContainer(props) {
    const {
        checkInDate
    } = props
    return (
        <div>
            <DateUntilBookingView 
                checkInDate = {checkInDate}
            />
        </div>
    )
}