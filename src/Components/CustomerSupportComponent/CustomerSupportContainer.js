import React from "react"
import CustomerSupportView from "./CustomerSupportView"
export default function CustomerSupportContainer (props) {
    const {
        customerSupport,
        setCustomerSupport
    } = props

    return (
        <div>
            <CustomerSupportView 
                customerSupport={customerSupport}
                setCustomerSupport={setCustomerSupport}
            />
        </div>
    )
}