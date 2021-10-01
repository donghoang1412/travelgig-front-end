import React, { useState } from "react"
import { useSelector } from "react-redux";
import { Radio, RadioGroup } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
export default function StarRatingView(props) {

    const {
        callBack
    } = props;

    const [value, setValue] = useState(0);

    const handleClick = (event) => {

        if (event.target.value === value) {
            setValue(0);
            callBack(0)

        } else {
            setValue(event.target.value);
            callBack(event.target.value);
        }
    }

    const getStar = useSelector(state => state.StarReducer.star);
    console.log(getStar)

    return (
        <div className="starRating">
            <h5>Star Rating: </h5>
            <FormControl component="fieldset" >
                <FormLabel component="legend">  </FormLabel>
                <RadioGroup aria-label="position" value={value} row>
                    <FormControlLabel
                        value="1"
                        control={<Radio color="primary" onClick={handleClick} />}
                        label="1"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="2"
                        control={<Radio color="primary" onClick={handleClick} />}
                        label="2"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="3"
                        control={<Radio color="primary" onClick={handleClick} />}
                        label="3"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="4"
                        control={<Radio color="primary" onClick={handleClick} />}
                        label="4"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="5"
                        control={<Radio color="primary" onClick={handleClick} />}
                        label="5"
                        labelPlacement="start"
                    />
                </RadioGroup>
            </FormControl>
        </div>
    );
}