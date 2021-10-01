import React, { useState } from "react"
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import DatePicker from "react-datepicker"
import { useDispatch } from "react-redux"
import { addHotelToStore } from "../../State/Hotels/HotelActions"
import "~react-datepicker/dist/react-datepicker.css"
export default function SearchHotelView(props) {


    const [hotelName, setHotelName] = useState("allHotels");
    const [noRoom, setNoRoom] = useState(0)
    const [noGuest, setNoGuest] = useState(0)
    // TEST DATE PICKER
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    // define handler change function on check-in date
    const handleCheckInDate = (date) => {
        console.log("in handle CheckinDatepicker")
        setCheckInDate(date);
        setCheckOutDate(null);
    };

    // define handler change function on check-out date
    const handleCheckOutDate = (date) => {
        setCheckOutDate(date);
    };

    console.log("hotelname " + hotelName)
    console.log("no. rooms " + noRoom)
    console.log("no. guest " + noGuest)
    console.log("date check in " + checkInDate)
    console.log("date check out " + checkOutDate)
    let date = new Date(checkInDate);
    console.log(date.getTime());


    const searchHotelDispatch = useDispatch()
    const searchHotels = async () => {
        if (noRoom === "")
            setNoRoom(0)
        if (noGuest === "")
            setNoGuest(0)
        let dateCheckIn;
        let dateCheckOut;
        if (checkInDate !== null && checkOutDate !== null)
            dateCheckIn = new Date(checkInDate).getTime();
        else
            dateCheckIn = checkInDate;
        if (checkOutDate !== null)
            dateCheckOut = new Date(checkOutDate).getTime();
        else
            dateCheckOut = checkOutDate

        const obj = {
            "hotelName": hotelName,
            "noRooms": noRoom,
            "noGuests": noGuest,
            "checkInDate": dateCheckIn,
            "checkOutDate": dateCheckOut
        }
        console.log("in crateSeachObj")

        const api = `http://localhost:8282/searchHotels`;

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
            body: JSON.stringify(obj)
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)

        searchHotelDispatch(addHotelToStore(response))
    }
    return (
        <div className="searchHotels">
            <div className="title">
                <h2> Narrow Your Search</h2>
            </div>
            <div className="search-bar">
                <div className="hotel-room-guest" noValidate autoComplete="off">
                    <div className="field">
                        <TextField placeholder="Hotel Name" variant="outlined"
                            onChange={event => {
                                const value = event.target.value;
                                setHotelName(value)
                            }}
                        />
                    </div>
                    <div className="field" >
                        <TextField placeholder="No. Room" variant="outlined"
                            onChange={event => {
                                const value = event.target.value;
                                if (value === "")
                                    setNoRoom(0)
                                else
                                    setNoRoom(value)
                            }} />
                    </div>
                    <div className="field">
                        <TextField placeholder="No. Guest" variant="outlined"
                            onChange={event => {
                                const value = event.target.value;
                                if (value === "")
                                    setNoGuest(0)
                                else
                                    setNoGuest(value)
                            }} />
                    </div>
                    <div className="field">
                        <DatePicker
                            placeholderText="Check-In Date"
                            selected={checkInDate}
                            minDate={new Date()}
                            onChange={handleCheckInDate}
                        />
                    </div>
                    <div className="field">
                        <DatePicker
                            placeholderText="Check-Out Date"
                            selected={checkOutDate}
                            minDate={checkInDate}
                            onChange={handleCheckOutDate}
                        />
                    </div>
                    <div className="field">
                        <Button variant="contained" color="primary" onClick={searchHotels}> Search</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}