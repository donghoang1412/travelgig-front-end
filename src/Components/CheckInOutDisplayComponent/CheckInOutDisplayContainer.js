import React from "react"
import CheckInOutDisplayView from "./CheckInOutDisplayView"
export default function CheckInOutDisplayContainer(props) {
    const {
        checkInDate,
        checkOutDate,
        guests,
        booking,
        dateEligibleForCancel,
        numberOfDayBooked
    } = props
    return (
        <div>
            <CheckInOutDisplayView 
                checkInDate={checkInDate}
                checkOutDate ={checkOutDate}
                guests={guests}
                booking={booking}
                dateEligibleForCancel={dateEligibleForCancel}
                numberOfDayBooked={numberOfDayBooked}
            />
        </div>
    )
}