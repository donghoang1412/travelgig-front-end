import React, { } from "react"
import StarReviewContainer from "../StarDisplayComponents/StarReviewContainer";
import CheckInOutDisplayContainer from "../CheckInOutDisplayComponent/CheckInOutDisplayContainer"
import "./EachCancelledView.css"
import "react-datepicker/dist/react-datepicker.css";

export default function EachCancelledViewView(props) {
    const {
        booking,
        guests,
        dateIn,
        dateOut
    } = props
  
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
                    <div className="status">
                    <i class="fa fa-exclamation-circle"></i>Cancelled
                    </div>
                </div>
                <div className="checkin-checkout-cancel-changeStay">
                    <div className="checkin-out">
                        <CheckInOutDisplayContainer
                            checkInDate={dateIn}
                            checkOutDate={dateOut}
                            guests = {guests}
                            booking={booking}
                        />
                    </div>

                </div>


            </div>

        </div>
    )
}