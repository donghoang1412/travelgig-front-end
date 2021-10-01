import React, { useState } from "react"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button, } from "@material-ui/core"
import { TextField } from "@material-ui/core"
import "./CheckoutForm.css"
export default function CheckoutFormView(props) {
    const { amount, handleBook, handleClose } = props
    const stripe = useStripe()
    const elements = useElements()

    const [paymentInProgress, setPaymentInProgress] = React.useState(false);

    //useState for billing details
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [zipcode, setZipcode] = useState();
    const [states, setStates] = useState();

    const sendEmailConfirm = async () => {
        const api =  `http://localhost:8383/api/payment/sendMail`
        
        const emailObj = {
            'to' : "javasession77@gmail.com",
            'subject' : "Confirm Booking"
        }
        const response = await fetch (api, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : localStorage.getItem('jwt')
            },
            body: JSON.stringify(emailObj)
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)
        
        console.log("response from sendMail: " , response)

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                'name': name,
                'email': email,
                'address': {
                    'line1': address,
                    'city': city,
                    'state': states,
                    'postal_code': zipcode
                }

            }
        });

        if (result.error) {
            return;
        } else {
            const paymentMethod = result.paymentMethod;
            console.log(paymentMethod)
            const jwt = localStorage.getItem('jwt')
            const api = `http://localhost:8383/api/payment/charge`
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jwt,
                    "token": paymentMethod.id,
                    "amount": parseInt(amount * 100).toFixed(0) 
                },
            }).then(res => res.json())
                .then(resJson => resJson)
                .catch(err => err)
            console.log(response)

            if (response !== undefined) {
                setPaymentInProgress(true)
                console.log("true")
            }
            else {
                console.log("false")
                setPaymentInProgress(false)
            }

        }
        handleBook()
        handleClose()
        sendEmailConfirm()
        setTimeout(() => {
            alert("You have booked succesfully! ")

        }, 1000);
    }

    return (
        <div className="payment">
            <div className="payment_title">Billing and Shipping Information</div>
            <div className="payment_row">
                <div className="payment_row_firstRow">   Name  </div>
                <TextField className="payment_row_secondRow" variant="outlined"
                    onChange={event => {
                        const value = event.target.value;
                        setName(value)
                    }}
                />
            </div>
            <div className="payment_row">
                <div className="payment_row_firstRow">   Email  </div>
                <TextField className="payment_row_secondRow" variant="outlined"
                    onChange={event => {
                        const value = event.target.value;
                        setEmail(value)
                    }}
                />
            </div>
            <div className="payment_row">
                <div className="payment_row_firstRow">   Address  </div>
                <TextField className="payment_row_secondRow" variant="outlined"
                    onChange={event => {
                        const value = event.target.value;
                        setAddress(value)
                    }}
                />
            </div>
            <div className="payment_row">
                <div className="payment_row_firstRow">   City  </div>
                <TextField className="payment_row_secondRow" variant="outlined"
                    onChange={event => {
                        const value = event.target.value;
                        setCity(value)
                    }}
                />
            </div>
            <div className="payment_row">
                <div className="payment_row_firstRow">   State  </div>
                <TextField className="payment_row_secondRow" variant="outlined"
                    onChange={event => {
                        const value = event.target.value;
                        setStates(value)
                    }}
                />
            </div>
            <div className="payment_row">
                <div className="payment_row_firstRow">   Zip Code  </div>
                <TextField className="payment_row_secondRow" variant="outlined" type="number"
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 5)
                    }}
                    onChange={event => {
                        const value = event.target.value;
                        setZipcode(value)
                    }}
                />
            </div>
            <div className="payment_title"> Card Information</div>

            <form
                onSubmit={handleSubmit}
            >
                <CardElement
                    className="card-form"
                />
                <Button variant="contained" color="primary" type="submit" disabled={!stripe} className={paymentInProgress ? "CheckoutFormView__disablePayment" : ""}>
                    <i class="fa fa-apple"></i>Pay
                </Button>
            </form>

        </div>
    )
}