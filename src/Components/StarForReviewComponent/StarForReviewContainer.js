import React from "react"
import StarForReviewView from "./StarForReviewView"


export default function StarForReviewContainer(props) {
    const {rate, setRate} = props
    // const [rating, setRating] = React.useState(null)
    const [hover, setHover] = React.useState(null)


    return (
        <div>
            <StarForReviewView
                setRate={setRate}
                rate={rate}
                // rating={rating}
                // setRating={setRating}
                hover={hover}
                setHover={setHover}
            />

        </div>
    )
}