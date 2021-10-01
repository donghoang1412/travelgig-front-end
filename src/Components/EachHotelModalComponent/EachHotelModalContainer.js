import React from "react"
import EachHotelModalView from "./EachHotelModalView"
import "./EachHotelModal.css"
export default function EachHotelModalContainer(props) {
    const {
        trigger,
        setTrigger,
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
    } = props;
    console.log("star Rating " + starRating)
    
    return (
        <EachHotelModalView className="modal"
            trigger={trigger}
            setTrigger={setTrigger}
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
    );
}