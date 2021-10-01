import React, { useEffect, useState } from "react"
import "./DateUntilBooking.css"
export default function DateUntilBookingView (props) {
    const {
        checkInDate
    } = props

    useEffect(() =>{
        calculateDateUntilBook(checkInDate)
    },[])

    const [date, setDate] = useState(0)
    const calculateDateUntilBook = (checkInDate) =>{
        const now = new Date().getTime();
        const dateDifference = checkInDate - now
        const dateUntilBook = dateDifference / (1000 * 60 * 60 * 24);
        console.log(dateUntilBook)
        console.log("Date until book "+ dateUntilBook)
        setDate(Math.floor(dateUntilBook))
    }

    

    return (
        <div className="date-until-book">
            {date >= 0 ? <div> {date}<span> days until booking </span></div> : <p>  InProgress</p>}
        </div>
    )
}