import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import StarReviewContainer from "../StarDisplayComponents/StarReviewContainer"
import DateUntilBookingContainer from "../DateUntilBookingComponent/DateUntilBookingContainer"
import CheckInOutDisplayContainer from "../CheckInOutDisplayComponent/CheckInOutDisplayContainer"
import ReviewFormContainer from "../ReviewFormComponent/ReviewFormContainer"
import "./EachCompleteView.css"
import "react-datepicker/dist/react-datepicker.css";

export default function EachCompleteViewView(props) {
    const {
        booking,
        guests,
        rerender,
        setRerender
    } = props

    const [dateIn, setDateIn] = useState("")
    const [dateOut, setDateOut] = useState("")
    const [dateEligibleForCancel, setDateEligibleForCancel] = useState('')
    const [numberOfDayBooked, setNumberOfDayBooked] = useState('')
    const [review, setReview] = useState(false)

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
    


    const handleReview = () =>{
        setReview(true)
    }
   

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

                        Completed
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
                    <div className="review">
                        <h6>Do you want to leave a review?</h6>
                        <Button variant="contained"  onClick={() => handleReview()}> Review</Button>
                    </div>
                    {review ?
                        <ReviewFormContainer 
                            hotelId = {booking.hotelId}
                            hotelName={booking.hotelName}
                            review={review}
                            setReview={setReview}
                        />
                    :"" }

                </div>


            </div>

        </div>
    )
}