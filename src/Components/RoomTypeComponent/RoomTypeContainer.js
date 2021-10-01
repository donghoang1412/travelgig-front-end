import React from "react"
import RoomTypeView from "./RoomTypeView"
import "./RoomType.css"
export default function RoomTypeContainer(props) {
    const {
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
            <RoomTypeView
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