import React from "react"
import DisplayReviewView from "./DisplayReviewView"
export default function DisplayReviewContainer(props) {
    const { review, clickRating, setClickRating } = props
    return (
        <div>
            <DisplayReviewView
                review={review}
                clickRating={clickRating}
                setClickRating={setClickRating}
            />
        </div>
    )
}