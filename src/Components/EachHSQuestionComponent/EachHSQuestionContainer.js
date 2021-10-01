import React from "react"
import EachHSQuestionView from "./EachHSQuestionView"
export default function EachHSQuestionContainer(props) {
    const {question, rerender, setRerender} = props
    return (
        <div>
            <EachHSQuestionView
                question = {question}
                setRerender={setRerender}
                rerender={rerender}
            />
        </div>
    )
}