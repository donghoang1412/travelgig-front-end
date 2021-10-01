import React, { useState } from "react"
import { Button, TextField } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
        justifyContent: theme.center,
        width: '30%',
        textAlign: 'center'
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
            position: 'relative'
        },

    },
    genderField: {
        'padding-left': '5px'
    }
}));

export default function LoginView(props) {
    const {
        clickedLogin,
        setClickedLogin
    } = props
    const classes = useStyles();

    const handleOnClose = () => {
        setClickedLogin(false)
    }

    const [errorMessage, setErrorMessage] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const submitUser = async () => {
        const userObj = {
            'userName': userName,
            'password': password
        }

        const api = `http://localhost:8383/authenticate`;

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj)
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)
        console.log(response)
        
        localStorage.setItem('jwt', response.jwt)
        localStorage.setItem('userName', response.userName)
        localStorage.setItem('roles', response.roles)
        if (localStorage.getItem('jwt') !== 'undefined') {
            setClickedLogin(false)
            setErrorMessage(false)
        }
        else
            setErrorMessage(true)
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={clickedLogin}
                onClose={handleOnClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={clickedLogin}>
                    <div className={classes.paper}>
                        <span style={{ fontSize: 'larger', fontWeight: '500' }}><i class="fa fa-pencil"></i>  Sign In: </span>
                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField
                                className="name"
                                placeholder="userName"
                                variant="outlined"
                                onChange={event => {
                                    const value = event.target.value;
                                    setUserName(value)
                                }}
                            />
                            <TextField
                                className="room"
                                placeholder="password"
                                variant="outlined"
                                onChange={event => {
                                    const value = event.target.value;
                                    setPassword(value)
                                }}
                            />


                        </form>

                        <Button variant="contained" onClick={() => submitUser()}> Login</Button>
                        {errorMessage ?
                            <p>Wrong credentials</p>
                            : ""}
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}