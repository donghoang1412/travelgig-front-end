import React, { useEffect } from "react"
import SliderView from "./SliderView"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFilterPrice } from "../../State/Price/PriceActions";
import "./Slider.css"
export default function SliderContainer() {

    const [value, setValue] = useState(500);
    useEffect(() =>{

    },[value])

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    console.log("my price "+ value)
    const addPrice = useDispatch()
    addPrice(addFilterPrice(value))

    return (
        <div >
            <SliderView className="sliderView"
                handleChange={handleChange}
                value ={value}
            />
        </div>
    )
}