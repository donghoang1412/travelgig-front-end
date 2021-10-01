import React from "react"
import CompleteViewView from "./CompleteViewView"
export default function CompleteViewContainer(props) {
    const {
        customerMobile
    } = props
    return (
        <div>
            <CompleteViewView
                customerMobile={customerMobile}
            />
        </div>
    )
}
