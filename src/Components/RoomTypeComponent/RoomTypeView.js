import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import BookingModalContainer from "../BookingModalComponent/BookingModalContainer"
import LoginContainer from "../../CommonComponent/LoginComponent/LoginContainer"
export default function RoomTypeView(props) {
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

    useEffect(() => {

    })

    const [clickedBooking, setClickedBooking] = useState(false)
    const [clickedLogin, setClickedLogin] = useState(false)

    const handleClick = () => {
        const myJwt = localStorage.getItem('jwt')
        console.log("my jwt in roomtype view: " + myJwt)
        console.log(myJwt === 'undefined')
        if (myJwt === 'undefined' || myJwt === null) {
            setClickedLogin(!clickedLogin)
        }
        else {
            setClickedBooking(!clickedBooking)
        }

    }

    return (
        <div className="roomType">
            <div className="roomType-info">
                <div className="roomType-header">
                    <i class="fa fa-hotel"></i><h5>Room Type: </h5>
                </div>
                <div className="roomType-name">
                    {type.name}
                </div>

            </div>
            <div className="roomType-price">
                <span>&#36;</span>{price} <span> per night</span>
            </div>
            <div className="roomType-button">
                <div className="center-button">
                    <Button variant="contained" onClick={() => handleClick()}> Book </Button>

                </div>
            </div>
            {clickedBooking ?
                <BookingModalContainer
                    clickedBooking={clickedBooking}
                    setClickedBooking={setClickedBooking}
                    description={description}
                    noRooms={noRooms}
                    policies={policies}
                    price={price}
                    type={type}
                    hotelName={hotelName}
                    hotelId={hotelId}
                    hotelRoomId={hotelRoomId}
                    discount={discount}
                /> : ""
            }
            {clickedLogin ?
                <LoginContainer
                    clickedLogin={clickedLogin}
                    setClickedLogin={setClickedLogin}

                /> : ''
            }

        </div>
    )
}