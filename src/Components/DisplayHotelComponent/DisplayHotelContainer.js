import React, { useState } from "react"
import DisplayHotelView from "./DisplayHotelView"
import "./DisplayHotel.css"
import { useDispatch } from "react-redux";
import {addHotelToStore} from "../../State/Hotels/HotelActions"
export default function DisplayHotelContainer () {

    const addHotel = useDispatch();
    React.useEffect(() => {
        fetchHotels()
    },[]);
    const fetchHotels = async () => {
        const api = `http://localhost:8282/getAllHotels`;

        // if you use body you HAVE TO INCLUDE HEADER, fuck this shit
        //took me 5 hours
        const response = await fetch(api, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)

        addHotel(addHotelToStore(response))
    }

    return(
        <div className="display-hotel">
            <DisplayHotelView
                
            />

        </div>
    )
}