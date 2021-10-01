import React, { useState } from "react"
import "./EachFAQ.css"
export default function EachFAQView(props) {
    const { faq } = props
    const [answerClick, setAnswerClick] = useState(false)
    const handleAnswerClick =() =>{
        setAnswerClick(!answerClick)
    }
    return (
        <div>
            <div className="each-faq-question" onClick={handleAnswerClick}>
                <i class="fa fa-caret-down" ></i> {faq.question}
            </div>
            <div className="each-fag-answer">
                {answerClick ? 
                    <div>{faq.answer} </div>
                : ""}
            </div>
        </div>
    )
}