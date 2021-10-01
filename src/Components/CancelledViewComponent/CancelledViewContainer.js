import React from "react"
import CancelledViewView from "./CancelledViewView"
export default function CancelledViewContainer(props) {
    const {
        customerMobile
    } = props
    return (
        <div>
            <CancelledViewView 
                customerMobile ={customerMobile}
            />
        </div>
    )
}