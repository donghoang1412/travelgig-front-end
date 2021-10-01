import React from "react"
import StarRatingView from "./StarRatingView"
import "./StarRating.css"
import { useState } from "react"
import { useDispatch } from "react-redux";
import {addFilterStar} from "../../State/Star/StarAction"

export default function StarRatingContainer(props) {
    
    const [star, setStar] = useState(0);

    React.useEffect(() => {

    },[star]);

    const handleCallback = (childData) =>{
        setStar(childData)
        
    }
    console.log("my star: " + star);
    
    const addStar = useDispatch();
    addStar(addFilterStar(star))

    return (
        <div >
            <StarRatingView 
                callBack = {handleCallback}
            />
        </div>
    )
}