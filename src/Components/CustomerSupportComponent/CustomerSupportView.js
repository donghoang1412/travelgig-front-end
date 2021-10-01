import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import "./CustomerSupport.css"
import { Button, TextField } from "@material-ui/core";

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
        // height: '80%',
        'overflow-y': 'auto'
    },

}));
export default function CustomerSupportView(props) {
    const classes = useStyles()
    const {
        customerSupport,
        setCustomerSupport
    } = props

    const handleClose = () => {
        setCustomerSupport(false)
    }
    const [question, setQuestion] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()


    const saveHSQuestion = async() => {
        const obj = {
            "question" : question,
            "email" : email,
            "phoneNumber" : phone
        }
        const api = `http://localhost:8383/saveHelpSupportQuestions`
        const response = await fetch(api, {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : localStorage.getItem('jwt')
            },
            body: JSON.stringify(obj)
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)
        console.log(response)
        setCustomerSupport(false)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={customerSupport}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={customerSupport}>
                    <div className={classes.paper}>
                        <div className="customer_support">
                            <h5 > Help Support</h5>
                            <form>
                                <div className="customer_support_row">
                                    <div className="customer_support_title">
                                        Question:
                                    </div>
                                    <TextField
                                        className="customer_support_text"
                                        variant="outlined"
                                        multiline
                                        maxRows={3}
                                        onChange={event => {
                                            const value = event.target.value;
                                            setQuestion(value)
                                        }}
                                    />
                                </div>
                                <div className="customer_support_row">
                                    <div className="customer_support_title">
                                        Email:
                                    </div>
                                    <TextField
                                        className="customer_support_text"
                                        variant="outlined"
                                        onChange={event => {
                                            const value = event.target.value;
                                            setEmail(value)
                                        }}
                                    />
                                </div>
                                <div className="customer_support_row">
                                    <div className="customer_support_title">
                                        Phone Number:
                                    </div>
                                    <TextField
                                        className="customer_support_text"
                                        variant="outlined"
                                        onChange={event => {
                                            const value = event.target.value;
                                            setPhone(value)
                                        }}
                                    />
                                </div>
                                <Button variant="contained" color="primary" onClick={() => saveHSQuestion() }> Submit</Button>
                            </form>

                        </div>
                    </div>

                </Fade>
            </Modal>
        </div>
    )
}