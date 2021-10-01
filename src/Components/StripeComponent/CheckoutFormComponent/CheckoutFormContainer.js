import React from "react"
import CheckoutFormView from "./CheckoutFormView"

export default function CheckoutFormContainer (props) {
    const {amount,handleBook, handleClose} = props
    return (
        <CheckoutFormView 
            amount = {amount}
            handleBook ={handleBook}
            handleClose ={handleClose}
        />
    )
}