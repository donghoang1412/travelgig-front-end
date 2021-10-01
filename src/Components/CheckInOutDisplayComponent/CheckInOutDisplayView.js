import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import "./CheckInOutDisplay.css"
export default function CheckInOutDisplayView(props) {
    const {
        checkInDate,
        checkOutDate,
        guests,
        booking,
        dateEligibleForCancel,
        numberOfDayBooked
    } = props

    useEffect(() => {
        // numberOfDayBookFunction()
        handleStatus()
    }, [])


    const [showRoomDetails, setShowRoomDetails] = useState(false)
    const [cancelledStatus, setCancelledStatus] = useState(false)
    const [completeStatus, setCompleteStatus] = useState(false)

    const handleStatus = () => {
        if (booking.status === 'Cancelled')
            setCancelledStatus(true)
        if (booking.status === 'Completed')
            setCompleteStatus(true)
    }



    const handleShowRoomDetails = () => {
        setShowRoomDetails(!showRoomDetails)
    }

    return (
        <div>
            <div className="dateIn-dateOut">
                <div className="checkIn">
                    <h6>CHECK-IN</h6>
                    {checkInDate}
                    <p>Check In from 12 pm</p>

                </div>
                <div className="checkOut">
                    <h6>CHECK-OUT</h6>
                    {checkOutDate}
                    <p>Check Out till 12pm</p>

                </div>

                <div className="guest">
                    <div>
                        <i class="fa fa-home"></i>{booking.noRooms} Room(s), {numberOfDayBooked}  Night(s)
                        <span>{" "}</span><span className="arrowDownButton" onClick={() => handleShowRoomDetails()}><i class="fa fa-arrow-down" ></i></span>
                        {showRoomDetails ?
                            <div>
                                <div><i class="fa fa-arrow-right"></i>Room Type:  {booking.roomType}. </div>
                                <div><i class="fa fa-arrow-right"></i>No. of room(s) booked:  {booking.noRooms} room(s)</div>
                            </div>
                            : ""}
                    </div>
                    <div>
                        <i class="fa fa-users"></i>{localStorage.getItem('userName')} + {guests.length} guests
                    </div>
                </div>

            </div>
            
            {completeStatus ?
                <div className="date-can-cancel">
                    <i class="fa fa-check"></i><span>You have completed this booking! </span>
                </div>
                : cancelledStatus ?
                    <div className="date-can-cancel">
                        <i class="fa fa-trash"></i><span>You have cancelled this booking! </span>
                    </div>
                    :
                    <div className="date-can-cancel">
                        <p><i class="fa fa-check"></i>Free Cancellation till <span>{dateEligibleForCancel}</span></p>
                    </div>
            }

        </div>

    )
}