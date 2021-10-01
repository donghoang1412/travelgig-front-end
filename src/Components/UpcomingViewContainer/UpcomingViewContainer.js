import React from "react"
import UpcomingViewView from "./UpcomingViewView"
export default function UpcomingViewContainer(props) {
    const {
        customerMobile
    } = props
    return (
        <div>
            <UpcomingViewView
                customerMobile ={customerMobile}
            />
        </div>
    )
}