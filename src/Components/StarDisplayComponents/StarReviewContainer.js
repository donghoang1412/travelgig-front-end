import React from "react"
import StarReviewView from "./StarReviewView";
import "./StarReview.css"
export default function StarReviewContainer (props) {
    const  {
        rating
    } = props;
    return(
        <StarReviewView rating={rating}/>
    )
}