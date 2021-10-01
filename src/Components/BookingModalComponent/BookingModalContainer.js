import React, { useEffect, useState } from "react"
import BookingModalView from "./BookingModalView"
import "./BookingModal.css"
export default function BookingModalContainer(props) {
    const {
        clickedBooking,
        setClickedBooking,
        description,
        noRooms,
        policies,
        price,
        type,
        hotelName,
        hotelId,
        hotelRoomId,
        discount
    } = props

    return (
        <div>
            <BookingModalView
                clickedBooking={clickedBooking}
                setClickedBooking={setClickedBooking}
                maxGuest={type.maxGuest}
                description={description}
                noRooms={noRooms}
                policies={policies}
                price={price}
                type={type}
                hotelName={hotelName}
                hotelId={hotelId}
                hotelRoomId={hotelRoomId}
                discount={discount}
            />
        </div>
    )
}