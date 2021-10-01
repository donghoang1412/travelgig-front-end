import React from "react"
import ReviewFormView from "./ReviewFormView"
export default function ReviewFormContainer(props) {
    const {
        hotelName,
        review,
        setReview,
        hotelId
    } = props
    return (
        <div>
            <ReviewFormView
                hotelId={hotelId}
                hotelName={hotelName}
                review={review}
                setReview={setReview}
            />
        </div>
    )
}