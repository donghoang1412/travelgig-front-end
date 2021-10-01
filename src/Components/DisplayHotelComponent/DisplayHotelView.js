import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import DisplayEachHotelContainer from "../DisplayEachHotelComponent/DisplayEachHotelContainer"

export default function DisplayHotelView(props) {

    useEffect(() => {

    }, [])

    const hotelsList = useSelector(state => state.HotelReducer.hotels);
    console.log(hotelsList);

    const getStar = useSelector(state => state.StarReducer.star)
    const getPrice = useSelector(state => state.PriceReducer.price)

    return (
        <div>
            {hotelsList.filter((hotel) => {
                if (getStar === 0) {
                    return hotel
                } else if (hotel.starRating >= getStar) {
                    return hotel
                }
                return false
            }).filter((hotel) => {
                if (hotel.averagePrice <= getPrice)
                    return hotel
                return false
            }).map((hotel) => {
                return (
                    <DisplayEachHotelContainer
                        hotelName={hotel.hotelName}
                        imageURL={hotel.imageURL}
                        address={hotel.address}
                        description={hotel.description}
                        starRating={hotel.starRating}
                        mobile={hotel.mobile}
                        averagePrice={hotel.averagePrice}
                        amenities={hotel.amenities}
                        hotelRooms = {hotel.hotelRooms}
                        hotelId ={hotel.hotelId}
                        review={hotel.review}
                    />
                )
            })}
        </div>
    )
}