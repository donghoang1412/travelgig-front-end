import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import LoginContainer from "../LoginComponent/LoginContainer"
import ViewBookingContainer from "../../Components/ViewBookingModalComponent/ViewBookingModalContainer"
import FAQContainer from "../../Components/FAQComponent/FAQContainer"
import CustomerSupportContainer from "../../Components/CustomerSupportComponent/CustomerSupportContainer"
import AdminPageContainer from "../../Components/AdminPageComponent/AdminPageContainer"
import "./Header.css"
export default function HeaderView() {
    const [jwt, setJwt] = useState('')
    const userName = localStorage.getItem('userName')

    useEffect(() => {
        setJwt(localStorage.getItem('jwt'))
        if (jwt !== 'undefined' && jwt !== null) {
            setLoggedIn(true)
            setViewBooking(true)
        }
        else
            setLoggedIn(false)
    })

    const [loggedIn, setLoggedIn] = useState(false)
    const [loginPopup, setLoginPopup] = useState(false)
    const [clickedLogin, setClickedLogin] = useState(false)
    const [viewBooking, setViewBooking] = useState(false)
    const [viewBookingClick, setViewBookingClick] = useState(false)
    const [faqClick, setFaqClick] = useState(false)
    const [customerSupport, setCustomerSupport] = useState(false)
    const [adminPage, setAdminPage] = useState(false)

    const handleViewBookingCLick = () =>{
        setViewBookingClick(true)
    }
    const handleFaqClick =() =>{
        setFaqClick(true)
    }
    const handleCustomerSupportClick = () =>{
        setCustomerSupport(true)
    }
    const handleAdminPage =() =>{
        if(localStorage.getItem('roles') === "ROLE_ADMIN")
            setAdminPage(true)
        else 
            alert("You are not admin! ")
    }

    const loginFunction = () => {
        setJwt(localStorage.getItem('jwt'))

        setLoginPopup(true)
        setClickedLogin(true)
    }

    const logoutFunction = () => {
        setJwt('')
        localStorage.removeItem('jwt')
        localStorage.removeItem('userName')
    }

    return (
        <div className="header">
            {loggedIn ?
                <div>
                    <h5> Hi, {userName}</h5>
                    <Button variant="contained" color="primary" onClick={() => logoutFunction()}>Log Out </Button>
                    <Button variant="contained" color="primary" onClick={() => handleViewBookingCLick()}>View Booking</Button>
                    <Button variant="contained" color="primary" onClick={() => handleFaqClick()}>FAQs</Button>
                    <Button variant="contained" color="primary" onClick={() => handleCustomerSupportClick()}>Customer Support</Button>
                    <Button variant="contained" color="primary" onClick={() => handleAdminPage()}>Manage </Button>
                </div>
                :
                <Button variant="contained" color="primary" onClick={() => loginFunction()}>Log In</Button>
            }
            {loginPopup ?
                <LoginContainer
                    clickedLogin={clickedLogin}
                    setClickedLogin={setClickedLogin}
                />
                :
                ""
            }
            {viewBooking ? 
                <ViewBookingContainer 
                    viewBookingClick ={viewBookingClick}
                    setViewBookingClick={setViewBookingClick}
                />
            : ""}
            {faqClick ? 
                <FAQContainer 
                    faqClick = {faqClick}
                    setFaqClick = {setFaqClick}
                />
            : ""}
            {customerSupport ? 
              <CustomerSupportContainer 
                  customerSupport ={customerSupport}
                  setCustomerSupport = {setCustomerSupport}
              />  
            : ""}
            {adminPage ? 
                <AdminPageContainer 
                    adminPage={adminPage}
                    setAdminPage={setAdminPage}
                />
            :""}


        </div>
    )
}