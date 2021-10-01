import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFormContainer from "./CheckoutFormComponent/CheckoutFormContainer";
const stripePromise = loadStripe("pk_test_51IzF9OLMycJd47MxwQ2Cgk4NbCbZsx37Z2pPciZsfBSvd5oK9g1INab3Aql7wZNA9oRr7433ZFl2uXImdOsKPpY5009dxt8LiH")
const Stripe = (props) => {
    const {
        amount,
        handleBook,
        handleClose
    } = props
    return (
        <Elements stripe={stripePromise}>
            <CheckoutFormContainer 
                amount ={amount}
                handleBook={handleBook}
                handleClose={handleClose}
            />
        </Elements>
    );
};

export default Stripe;