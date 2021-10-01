import React from "react"
import EachCompleteViewView from "./EachCompleteViewView"
export default function EachCompleteViewContainer(props) {
    const {
        booking,
        guests,
        rerender,
        setRerender
    } = props
    return (
        <div>
            <EachCompleteViewView 
                booking = {booking}
                guests = {guests}
                rerender={rerender}
                setRerender={setRerender}
            />
        </div>
    )
}