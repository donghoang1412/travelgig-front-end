import React, { useEffect, useState } from "react"
import AdminPageView from "./AdminPageView"

export default function AdminPageContainer (props) {
    const {
        adminPage,
        setAdminPage
    } = props
    const [helpSupportQuestions, setHelpSupportQuestions] = useState([])
    const [rerender, setRerender] =useState(false)
    
    useEffect(() =>{
        getAllQuestionFromUsers()
    },[rerender])
    const getAllQuestionFromUsers = async() => {
        const api = `http://localhost:8383/getHelpSupportQuestions`
        const response = await fetch(api, {
            method : 'GET',
            headers :{
                "Content-Type" : "application/json",
                "Authorization" : localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)
        setHelpSupportQuestions(response)
    }

    return (
        <div>
            <AdminPageView 
                adminPage={adminPage}
                setAdminPage={setAdminPage}
                helpSupportQuestions={helpSupportQuestions}
                setRerender={setRerender}
                rerender={rerender}
            />
        </div>
    )
}