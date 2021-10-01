import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import "./DisplayReview.css"
import StarReviewContainer from "../StarDisplayComponents/StarReviewContainer";
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
        height: '80%',
        'overflow-y': 'auto'
    },

}));
export default function DisplayReviewView(props) {
    const classes = useStyles()
    const { review, clickRating, setClickRating } = props

    const handleClose = () => {
        setClickRating(false)
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={clickRating}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={clickRating}>
                    <div className={classes.paper}>
                        {review.map((eachReview) => {
                            return (
                                <div className="list_of_reviews">
                                    <div className="list_of_reviews_userName">
                                        <i class="fa fa-user"></i>{eachReview.userName}
                                    </div>
                                    <div className="list_of_reviews_star">
                                        <StarReviewContainer 
                                            rating = {eachReview.starRating}
                                        />
                                    </div>
                                    <div className="list_of_reviews_review">
                                        {eachReview.review}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </Fade>
            </Modal>
        </div>
    )
}