import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addGuestToStore } from "../../State/Guest/GuestActions";

const genders = [
    { value: 'Male' },
    { value: 'Female' }
];

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
        width: '60%',
        textAlign: 'left'
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '95ch',
            position: 'relative'
        },

    },
    genderField: {
        'padding-left': '5px'
    }
}));
export default function AddGuestView(props) {

    const dispatchAddGuest = useDispatch();

    const {
        addGuest,
        setAddGuest
    } = props

    const classes = useStyles();

    const handleClose = () => {
        setAddGuest(false)
    }

    //this is for Gender Text Field
    const [gender, setGender] = useState("")

    const handleGenderChange = (event) => {
        setGender(event.target.value)
    }
    // set first name
    const [firstName, setFistName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")

    

    const addGuestFunction = () => {
        console.log("I got in add Guest Function")
        const guestObject = {
            'firstName': firstName,
            'lastName': lastName,
            'gender': gender,
            'age': age,
        }
        dispatchAddGuest(addGuestToStore(guestObject))
        setAddGuest(false)
    }

    const guests = useSelector(state => state.GuestReducer.guests) 
    console.log(guests)

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={addGuest}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={addGuest}>
                    <div className={classes.paper}>
                        <span style={{fontSize:'larger',fontWeight:'500'}}><i class="fa fa-pencil"></i>  Guest's Information: </span>
                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField
                                className="name"
                                placeholder="First Name"
                                variant="outlined"
                                onChange={event => {
                                    const value = event.target.value;
                                    setFistName(value)
                                }}
                            />
                            <TextField
                                className="room"
                                placeholder="Last Name"
                                variant="outlined"
                                onChange={event => {
                                    const value = event.target.value;
                                    setLastName(value)
                                }}
                            />
                            <TextField
                                className="guest"
                                placeholder="Age"
                                variant="outlined"
                                onChange={event => {
                                    const value = event.target.value;
                                    setAge(value)
                                }}
                            />
                            <TextField
                                className={classes.genderField}
                                select
                                label="Gender"
                                value={gender}
                                onChange={handleGenderChange}
                                helperText="Please select guest's gender"

                            >
                                {genders.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </form>
                       
                        <Button variant="contained" onClick={() => addGuestFunction()}> Add Guest</Button>

                    </div>
                </Fade>
            </Modal>
        </div>
    )
}