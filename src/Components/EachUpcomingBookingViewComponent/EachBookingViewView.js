import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import StarReviewContainer from "../StarDisplayComponents/StarReviewContainer"
import DateUntilBookingContainer from "../DateUntilBookingComponent/DateUntilBookingContainer"
import CheckInOutDisplayContainer from "../CheckInOutDisplayComponent/CheckInOutDisplayContainer"
import DatePicker from "react-datepicker";
import "./EachBookingView.css"
import "react-datepicker/dist/react-datepicker.css";

export default function EachBookingViewView(props) {
    const {
        booking,
        guests,
        rerender,
        setRerender
    } = props

    // const [bookings, setBookings] = useState([])
    // const [hotels, setHotels] = useState([])

    const [displayChangeStay, setDisplayChangeStay] = useState(false)
    const [displayCancelMessage, setDisplayCancelMessage] = useState(false)
    const [dateIn, setDateIn] = useState("")
    const [dateOut, setDateOut] = useState("")
    const [dateEligibleForCancel, setDateEligibleForCancel] = useState('')
    const [numberOfDayBooked, setNumberOfDayBooked] = useState('')

    useEffect(() => {
        convertDate(booking.checkInDate, booking.checkOutDate);        
    }, [])

    const convertDate = (checkInDate, checkOutDate) => {
        setDateIn(new Date(parseInt(checkInDate)).toDateString())
        setDateOut(new Date(parseInt(checkOutDate)).toDateString())
        const date = new Date(parseInt(checkInDate))
        console.log("in checkinoutdisplay " + date.toDateString())
        date.setDate(date.getDate() - 1)
        setDateEligibleForCancel(date.toDateString())
        numberOfDayBookFunction(checkInDate, checkOutDate);
    }

    const numberOfDayBookFunction = (checkInDate, checkOutDate) => {

        const dateIn = new Date(parseInt(checkInDate)).getTime()
        const dateOut = new Date(parseInt(checkOutDate)).getTime()
        const numberOfDay = (dateOut - dateIn) / (1000 * 60 * 60 * 24)
        setNumberOfDayBooked(numberOfDay)
    }
    


    const cancelBooking = async (bookingId) => {
        console.log("my bookingid " + bookingId)
        const api = `http://localhost:8383/cancelBooking`
        const jwt = localStorage.getItem('jwt')
        const obj = {
            'bookingId': bookingId
        }
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": jwt
            },
            body: JSON.stringify(obj)
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)
        console.log(response)
        setDisplayCancelMessage(false)

        setRerender(!rerender)
    }

    const changeStay = async () => {
        const checkIn = new Date(checkInDate).getTime()
        const checkOut = new Date(checkOutDate).getTime()

        const jwt = localStorage.getItem('jwt')
        const obj = {
            'bookingId' : booking.bookingId,
            'checkInDate' : checkIn,
            'checkOutDate' : checkOut
        }
        const api = `http://localhost:8383/changeStay`
        const response = await fetch(api , {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : jwt
            },
            body: JSON.stringify(obj)
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)

        console.log(response);

        convertDate(checkIn, checkOut);
    }

    const handleChangeStay = () => {
        setDisplayChangeStay(!displayChangeStay)
    }

    const handleSubmit = () => {
        setDisplayChangeStay(false)
        changeStay()
    }

    const handleCancelBooking = () => {
        setDisplayCancelMessage(!displayCancelMessage)
    }

    const noCancelBooking = () => {
        setDisplayCancelMessage(false)
    }

    // TEST DATE PICKER
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    // define handler change function on check-in date
    const handleCheckInDate = (date) => {
        console.log("in handle CheckinDatepicker")
        setCheckInDate(date);
        setCheckOutDate(null);
    };

    // define handler change function on check-out date
    const handleCheckOutDate = (date) => {
        setCheckOutDate(date);
    };

    return (
        <div>
            <div className="upcoming-booking-details">
                <div className="hotelName-button">
                    <div className="hotelName">
                        <h4><i class="fa fa-building"></i>{booking.hotelName}</h4>
                    </div>
                    <div className="button">
                        <h5>View & Manage booking</h5>
                    </div>
                </div>

                <div className="review-city">
                    <div className="review">
                        <StarReviewContainer
                            rating={booking.starRating}
                        />
                    </div>
                    <div className="city">
                        <p>Hotel in {booking.city}</p>

                    </div>
                    <div className="date-until-booking">
                        <DateUntilBookingContainer
                            checkInDate={booking.checkInDate}
                        />
                    </div>
                </div>
                <div className="checkin-checkout-cancel-changeStay">
                    <div className="checkin-out">
                        <CheckInOutDisplayContainer
                            checkInDate={dateIn}
                            checkOutDate={dateOut}
                            guests = {guests}
                            booking={booking}
                            dateEligibleForCancel={dateEligibleForCancel}
                            numberOfDayBooked ={numberOfDayBooked}
                        />
                    </div>
                    <div className="cancel-stay">
                        <div className="two-button">
                            <Button onClick={() => handleCancelBooking()}><i class="fa fa-ban"></i>  Cancel Booking</Button>
                            <Button onClick={() => handleChangeStay()}><i class="fa fa-window-restore"></i>  Change Stays</Button>
                        </div>

                        <div className="changeStay-popup">

                            {displayChangeStay ?
                                <div className="input-container">
                                    <div className="checkin-checkout-boxes">
                                        <div className="checkinBox">
                                            <label>Check-in</label>
                                            <DatePicker
                                                selected={checkInDate}
                                                minDate={new Date()}
                                                onChange={handleCheckInDate}
                                            />
                                        </div>
                                        <div className="checkOutBox">
                                            <label>Check-out</label>
                                            <DatePicker
                                                selected={checkOutDate}
                                                minDate={checkInDate}
                                                onChange={handleCheckOutDate}
                                            />
                                        </div>
                                    </div>
                                    <div className="submitButton">
                                        <Button onClick={() => handleSubmit()}> Submit</Button>
                                    </div>

                                </div>
                                : ""}
                            {displayCancelMessage ?
                                <div>
                                    <p> Are you sure to cancel this booking?</p>
                                    <Button onClick={() => cancelBooking(booking.bookingId)}> Yes </Button>
                                    <Button onClick={() => noCancelBooking()}> No </Button>
                                </div>
                                : ""
                            }
                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}