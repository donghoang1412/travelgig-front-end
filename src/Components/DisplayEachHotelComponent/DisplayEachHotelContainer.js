import React from "react"
import DisplayEachHotelView from "./DisplayEachHotelView"
import "./DisplayEachHotel.css"
export default function DisplayEachHotelContainer(props) {
    const {
        hotelName,
        imageURL,
        address,
        description,
        starRating,
        mobile,
        averagePrice,
        amenities,
        hotelRooms,
        hotelId,
        review
    } = props
    return (
        <div>
            <DisplayEachHotelView
                hotelName={hotelName}
                imageURL={imageURL}
                address={address}
                description={description}
                starRating={starRating}
                mobile={mobile}
                averagePrice={averagePrice}
                amenities={amenities}
                hotelRooms={hotelRooms}
                hotelId={hotelId}
                review={review}
            />
        </div>
    )
}