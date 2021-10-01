import React, { useEffect, useState } from "react"
import FAQView from "./FAQView"
export default function FAQContainer (props) {
    const {
        faqClick,
        setFaqClick
    } = props

    const [faqList , setFaqList] = useState([])
    useEffect(() =>{
        getFAQs()
    },[])
    const getFAQs = async() => {
        const api = `http://localhost:8383/getFAQs`
        const response = await fetch(api, {
            method : 'GET',
            headers :{
                "Content-Type" : "application/json",
                "Authorization" : localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)
        setFaqList(response)
    }
    
    return (
        <div>
            <FAQView
               faqClick={faqClick} 
               setFaqClick={setFaqClick}
               faqList ={faqList}
            />
        </div>
    )
}