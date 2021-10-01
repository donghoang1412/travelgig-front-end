import React from "react"
import { Slider } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";

export default function SliderView(props) {
    const {
        handleChange,
        value
    } = props



    return (
        <div>
            <h5 className="text"> Price Per Night: </h5>
            <Slider
                className = "slider"
                value={value === 1 ? 500 : value}
                min={0}
                step={2}
                max={500}
                scale={(x) => x ** 10}
                onChange={handleChange}
                aria-labelledby="non-linear-slider"
            />
            <Typography className="text" gutterBottom>
                ${value === 1? 500 : value}
            </Typography>

        </div>
    );
}