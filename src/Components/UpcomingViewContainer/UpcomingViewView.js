import React, { useEffect, useState } from "react"
import EachBookingViewContainer from "../EachUpcomingBookingViewComponent/EachBookingViewContainer"
import "./UpcomingView.css"
export default function UpcomingViewView(props) {
    const {
        customerMobile
    } = props
    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        console.log("upcoming view rerendered")
        getBookingDetails()
    },[rerender])
    
    const [myMap, setMyMap] = useState([]);

    const map = new Map();
    const getBookingDetails = async () => {
        const api = `http://localhost:8383/getBooking`
        const jwt = localStorage.getItem('jwt')
        const obj = {
            'customerMobile': customerMobile,
            'status' : 'Upcoming'
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
        // setBookings(response)
        //now we got the hotelId of each booking, we have
        //to call the backend to get the hotels from each hotelId

        for (let i = 0; i < response.length; i++) {
            const hotel = await getHotels(response[i])

            await getGuests(response[i], hotel)
        }

        map.forEach((value, key) => {
            console.log("Key: ", key);

            for (let obj of value) {
                console.log(obj.firstName);
            }
        })
        setMyMap(map);

    }

    const getHotels = async (bookingObj) => {
        const hotelId = bookingObj.hotelId;
        const api = `http://localhost:8383/getHotels?hotelId=` + hotelId
        const jwt = localStorage.getItem('jwt')

        const response = await fetch(api, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": jwt
            },
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)
        // console.log("hotelName " + response.hotelName)
        // setHotels(hotels => [...hotels, response.hotelName])                
        // map.set(bookingObj, []);
        return response
    }

    const getGuests = async (bookingObject, hotel) => {
        const bookingId = bookingObject.bookingId;
        const api = `http://localhost:8383/getGuest?bookingId=` + bookingId
        const jwt = localStorage.getItem('jwt')

        const response = await fetch(api, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": jwt
            },
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)

        console.log("bookingObject: ", bookingObject);
        console.log("response: ", response);
        bookingObject.hotelName = hotel.hotelName;
        bookingObject.starRating = hotel.starRating;
        bookingObject.city = hotel.city;
        map.set(bookingObject, response);
        // console.log("map: ", map);

    }


    return (
        <div>
            {[...myMap.entries()].map((entry, i) => {
                return (
                    <EachBookingViewContainer
                        booking={entry[0]}
                        guests={entry[1]}
                        rerender={rerender}
                        setRerender={setRerender}
                    />
                )
            })}
        </div>
    )
}

