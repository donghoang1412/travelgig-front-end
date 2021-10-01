import React, { useEffect, useState } from "react"
import StarReviewContainer from "../StarDisplayComponents/StarReviewContainer"
import EachHotelModalContainer from "../EachHotelModalComponent/EachHotelModalContainer"
import { Button } from "@material-ui/core"
import {useHistory} from "react-router-dom"
export default function  DisplayEachHotelView (props) {

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

    useEffect(() =>{
        calculateStarRating()
    },[])
    const [rating, setRating] = useState(0)
    const calculateStarRating = () =>{
        let rating = 0
        for(let i = 0; i<review.length; i++) {
            rating = rating + review[i].starRating
        }
        rating = rating/review.length
        setRating(rating)
    }

    const history = useHistory()

    const [trigger, setTrigger] = useState(false)

    const clickViewDetails = () => {
        console.log(hotelId);
        console.log(history);
        history.push(`?hotelId=${hotelId}`);
        setTrigger(!trigger)
    }
    return (
        <div className="each-hotel-view">
            <div className="image">
                <img src={imageURL} alt="" />
            </div>
            <div className="HotelNameAddressDescription">
                <div className="hotelName">
                    {hotelName}
                </div>
                <div className="address">
                    {address}
                </div>
                <div className="mobile">
                    {mobile}
                </div>
                <div className="starRating">
                    <StarReviewContainer rating={rating} />
                </div>
                <div className="description">
                    {description}
                </div>
                <p><Button variant="contained" className="buttonViewDetails" onClick={clickViewDetails}> View Details</Button></p>
            </div>
            <div className="averagePrice">
                <div>
                    <span>{averagePrice}$USD</span>
                    <p>  INCLUDED IN THIS PRICE</p>
                    <p> Free Cancellation</p>
                </div>
            </div>
            <div className="popup-hotel-details">
                {trigger ? <EachHotelModalContainer
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
                /> : ""}
            </div>

        </div>
    )
}

