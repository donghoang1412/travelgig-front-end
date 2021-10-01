import React from "react"
import EachCancelledViewView from "./EachCancelledViewView"
export default function EachCancelledViewContainer(props) {
    const {
        booking,
        guests,
        rerender,
        setRerender
    } = props

    React.useEffect(() =>{
        convertDate(booking.checkInDate, booking.checkOutDate)
    },[])

    const [dateIn, setDateIn] = React.useState("")
    const [dateOut, setDateOut] = React.useState("")

    const convertDate = (checkInDate, checkOutDate) => {
        setDateIn(new Date(parseInt(checkInDate)).toDateString())
        setDateOut(new Date(parseInt(checkOutDate)).toDateString())      
    }
    return (
        <div>
            <EachCancelledViewView 
                booking = {booking}
                guests = {guests}
                rerender={rerender}
                setRerender={setRerender}
                dateIn={dateIn}
                dateOut={dateOut}
            />
        </div>
    )
}