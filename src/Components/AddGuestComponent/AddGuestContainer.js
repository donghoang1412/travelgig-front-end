import React from "react"
import AddGuestView from "./AddGuestView"
import "./AddGuest.css"
export default function AddGuestContainer(props) {
    const {
        addGuest,
        setAddGuest
    } = props
    return (
        <div >
            <AddGuestView
                addGuest={addGuest}
                setAddGuest={setAddGuest}
            />
        </div>
    )
}