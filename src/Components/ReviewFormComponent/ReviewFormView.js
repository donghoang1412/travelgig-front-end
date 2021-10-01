import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import StarForReviewContainer from "../StarForReviewComponent/StarForReviewContainer";
import { Button, TextField } from "@material-ui/core";
import "./ReviewForm.css"
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        justifyContent: theme.left,
        width: '50%',
        height: '50%',
        'overflow-y': 'auto',
        'textAlign': 'center'
    },

}));
export default function ReviewFormView(props) {
    const classes = useStyles()
    const {
        hotelName,
        hotelId,
        review,
        setReview
    } = props

    const handleClose = () => {
        setReview(false)
    }
    const [rate, setRate] = useState(0)
    const [textReview, setTextReview] = useState()

    const sumbitReview = async() =>{
        const userName = localStorage.getItem('userName')
        const obj = {
            "userName" : userName,
            "hotelId" : hotelId,
            "starRating" : rate,
            "review" : textReview
        }
        const api = `http://localhost:8383/saveReview`

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
            body: JSON.stringify(obj)
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)
        console.log(response)
        handleClose()
    }
    console.log("rate " + rate)
    console.log("textReview " + textReview)
    console.log("hotelID " + hotelId)
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={review}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={review}>
                    <div className={classes.paper}>
                        <div className="hotelName_reviewForm">
                            <i class="fa fa-building"></i> {hotelName}
                        </div>
                        <div className="review_form">
                            <div className="title">
                                Give a star
                            </div>
                            <div className="star_and_text">
                                <StarForReviewContainer
                                    setRate={setRate}
                                    rate={rate}
                                />
                            </div>
                        </div>
                        <div className="review_form">
                            <div className="title">
                                Give a review
                            </div>
                            <div className="star_and_text">
                                <TextField
                                    className="review_text"
                                    variant="outlined"
                                    multiline
                                    maxRows={5}
                                    onChange={event => {
                                        const value = event.target.value;
                                        setTextReview(value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="submit_review">
                            <Button variant="contained" onClick={() => sumbitReview()}> Submit</Button>

                        </div>

                    </div>

                </Fade>
            </Modal>
        </div>
    )
}