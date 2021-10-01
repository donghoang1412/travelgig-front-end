import React from "react"
import LoginView from "./LoginView"
export default function LoginContainer(props) {
    const {
        clickedLogin,
        setClickedLogin
    } = props
    return (
        <div>
            <LoginView 
                clickedLogin={clickedLogin}
                setClickedLogin={setClickedLogin}
            />
        </div>
    )
}