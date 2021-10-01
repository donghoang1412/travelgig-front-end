import React, { useState } from "react"
import { Button, TextField } from "@material-ui/core"
import "./EachHSQuestion.css"
export default function EachHSQuestionView(props) {
    const { question, rerender, setRerender } = props

    const [answer, setAnswer] = useState()
    const email = question.email
    const subject = question.question

    const sendEmail = async () => {

        const mailObj = {
            "to": email,
            "body": answer,
            "subject": subject
        }
        const api = `http://localhost:8383/answerQuestionToMail`
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
            body: JSON.stringify(mailObj)
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)

    }
    const saveToFAQ = async () => {
        const faqObj = {
            "question": subject,
            "answer": answer
        }
        const api = `http://localhost:8383/saveFAQs`
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
            body: JSON.stringify(faqObj)
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)
        setAnswer("")

        deleteQuestion()
        sendEmail()
    }

    const deleteQuestion = async () => {
        const id = question.id
        const api = `http://localhost:8383/deleteSupportQuestion?id=${id}`
        const response = await fetch(api, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)
        setRerender(!rerender)
    }

    return (
        <div className="HSQuestion">
            <div>
                Question: <span>{question.question}</span>
            </div>
            <div>
                Email: <span>{question.email}</span>
            </div>
            <div>
                <form>
                    <div >
                        <div >
                            Answer:
                        </div>
                        <TextField
                            className="answerBox"
                            variant="outlined"
                            multiline
                            maxRows={3}
                            onChange={event => {
                                const value = event.target.value
                                setAnswer(value)
                            }}
                        />
                    </div>
                </form>
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={() => saveToFAQ()}>Submit</Button>
            </div>

        </div>
    )
}