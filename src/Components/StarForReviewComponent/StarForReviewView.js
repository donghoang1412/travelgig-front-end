import React, { useState } from "react"
import { FaStar } from "react-icons/fa"
import Button from '@material-ui/core'

export default function StarForReviewView(props) {
    const {
        // rating,
        // setRating,
        hover,
        setHover,
        rate,
        setRate
    } = props


    return (

        <div>

            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1
                return (
                    <label key={i}>
                        <input
                            className="starInput"
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRate(ratingValue)}

                        />
                        <FaStar
                            size={30}
                            color={ratingValue <= (hover || rate) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                )
            })}

        </div>

    )
}