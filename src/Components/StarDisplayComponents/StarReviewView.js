import React from "react"
import { FaStar } from "react-icons/fa"

export default function StarReviewView(props) {
    const  {
        rating
    } = props;
    return (
        <div>
        
            {[...Array(5)].map((star, i ) => {
                const ratingValue = i+ 1
                return (
                    <label>
                        <input className="starInput"
                        type="radio" 
                        name="rating" 
                        value={ratingValue}
                         />
                        <FaStar color={ratingValue <= rating ? "#ffc107": "#e4e5e9"}/>
                    </label>
                )
            })}
        </div>
    )
}