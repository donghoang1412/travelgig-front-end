import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EachFAQContainer from "../EachFAQComponent/EachFAQContainer";
import "./FAQ.css"
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
        height:'80%',
        'overflow-y':'auto'
    },

}));
export default function FAQView(props) {
    const classes = useStyles()
    const {
        faqClick,
        setFaqClick,
        faqList
    } = props
    
    const handleClose =() =>{
        setFaqClick(false)
    }   


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={faqClick}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={faqClick}>
                    <div className={classes.paper}>
                        <p className="faq-title">Frequently Ask Questions</p>
                        {faqList.map((faq) =>{
                            return (
                                <EachFAQContainer 
                                    faq = {faq}
                                />
                            )
                        })}
                    </div>

                </Fade>
            </Modal>
        </div>
    )
}