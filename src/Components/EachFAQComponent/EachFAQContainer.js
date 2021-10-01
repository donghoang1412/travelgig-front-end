import React from "react"
import EachFAQView from "./EachFAQView"
export default function EachFAQContainer (props) {
    const {
        faq
    } = props
    console.log("in eachfaq container "+faq.question)
    return (
        <div>
            <EachFAQView 
                faq ={faq}
            />
        </div>
    )
}