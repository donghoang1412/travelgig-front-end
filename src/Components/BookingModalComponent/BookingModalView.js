import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import AddGuestContainer from "../AddGuestComponent/AddGuestContainer";
import { useSelector, useDispatch } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MuiPhoneNumber from "material-ui-phone-number";
import DatePicker from "react-datepicker";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stripe from "../StripeComponent/Stripe";
import { removeGuestFromStore } from "../../State/Guest/GuestActions";


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
        width: '70%',
        textAlign: 'left',
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '20ch',
            position: 'relative'
        },
    },
    table: {
        minWidth: 300,
    },
    root: {
        width: "100%"
    },
    button: {
        marginRight: theme.spacing(1)
    },
    backButton: {
        marginRight: theme.spacing(1)
    },
    completed: {
        display: "inline-block"
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }

}));

function getSteps() {
    return ["", ""];
}

export default function BookingModalView(props) {
    const {
        clickedBooking,
        setClickedBooking,
        maxGuest,
        description,
        noRooms,
        policies,
        price,
        type,
        hotelName,
        hotelId,
        hotelRoomId,
        discount
    } = props


    const dispatch = useDispatch()
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set());
    const steps = getSteps();
    const [customerMobile, setCustomerMobile] = useState(null)
    const [numberOfRoomBook, setNumberOfRoomBook] = useState(1)

    const handleCustomerMobile = (value) => {
        if (value) {
            setCustomerMobile(value)
        }
    }

    const handleStep = (step) => () => {
        if (step === 0) {
            clearCompletedStep();
        }
        setActiveStep(step);
    };

    const markStepAsCompleted = () => {
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);
    };

    function isStepComplete(step) {
        return completed.has(step);
    }

    const clearCompletedStep = () => {
        setCompleted(new Set());
    };


    //this is to close the booking modal
    const handleClose = () => {
        setClickedBooking(false)
    }
    //this is to display add guest modal
    const [addGuest, setAddGuest] = useState(false)
    const addGuestHandle = () => {
        setAddGuest(!addGuest)
    }
    const guests = useSelector(state => state.GuestReducer.guests)
    // console.log("my guests array: " +guests.length)

    const removeGuest = (firstName) => {
        dispatch(removeGuestFromStore(firstName))
    }

    // DATE PICKER
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [numberOfNight, setNumberOfNight] = useState(1);
    const [errMsg, setErrMsg] = useState(false)

    useEffect(() => {
        calculateNumberOfNight()
    })

    // define handler change function on check-in date
    const handleCheckInDate = (date) => {
        setCheckInDate(date);
        setCheckOutDate(null);
    };

    // define handler change function on check-out date
    const handleCheckOutDate = (date) => {
        setCheckOutDate(date);
    };

    const calculateNumberOfNight = () => {

        console.log(checkInDate)
        console.log(checkOutDate)
        const noOfNight = (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)
        console.log(noOfNight)
        if (noOfNight > 1)
            setNumberOfNight(noOfNight)
        else
            setNumberOfNight(1)
    }


    const handleBook = async () => {

        const dateCheckIn = new Date(checkInDate);
        dateCheckIn.setTime(dateCheckIn.getTime());
        const dateCheckOut = new Date(checkOutDate);
        dateCheckOut.setTime(dateCheckOut.getTime());
        const bookedOnDate = new Date();

        const bookingObj = {
            'bookedOnDate': bookedOnDate.getTime(),
            'checkInDate': dateCheckIn.getTime(),
            'checkOutDate': dateCheckOut.getTime(),
            'customerMobile': customerMobile,
            'discount': discount,
            'hotelId': hotelId,
            'hotelRoomId': hotelRoomId,
            'noRooms': numberOfRoomBook,
            'price': price,
            'roomType': type.name,
            'status': 'Upcoming',
            'guests': guests
        }

        const api = `http://localhost:8383/saveBooking`;
        const jwt = localStorage.getItem('jwt')
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": jwt
            },
            body: JSON.stringify(bookingObj),

        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)
        console.log(response)
        setClickedBooking(false)
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={clickedBooking}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={clickedBooking}>
                    <div className={classes.paper}>
                        <div className={classes.root}>
                            <div className="stepper-box">
                                <div className="back-button">
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            clearCompletedStep();
                                            if (activeStep > 0)
                                                setActiveStep(activeStep - 1);
                                        }}
                                    >
                                        <i class="fa fa-arrow-left"></i></Button>
                                </div>
                                <div className="stepper">
                                    <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                                        {steps.map((label, index) => {
                                            const stepProps = {};
                                            const buttonProps = {};

                                            return (
                                                <Step key={label} {...stepProps}>
                                                    <StepButton
                                                        // onClick={handleStep(index)}
                                                        completed={isStepComplete(index)}
                                                        {...buttonProps}
                                                    >
                                                        {label}
                                                    </StepButton>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                </div>
                            </div>

                            <div className="info-and-payment">

                                <div className="info-of-hotel-before-booking">
                                    <div >
                                        <h5><i class="fa fa-building"></i>{hotelName}</h5>
                                    </div>
                                    <div className="name">
                                        <i class="fa fa-hotel"></i> <span>
                                            {type.name}
                                            <span style={{ fontSize: '0.41cm', letterSpacing: '-2px' }}>({maxGuest} guests)</span></span>
                                    </div>
                                    <div className="bitcoin">
                                        <i class="fa fa-bitcoin"></i><span>${price}</span> <span> per night</span>
                                    </div>
                                    <div >
                                        <form className={classes.form}>
                                            <MuiPhoneNumber
                                                defaultCountry={"us"}
                                                label="Phone Number"
                                                value={customerMobile}
                                                onChange={handleCustomerMobile}
                                            />
                                            <TextField
                                                className="no-of-room"
                                                label="No. of Rooms"
                                                type="number"
                                                defaultValue="1"
                                                InputProps={{
                                                    inputProps: {
                                                        max: noRooms, min: 0
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    setNumberOfRoomBook(value);
                                                }}
                                            />
                                        </form>
                                        <div className="checkin-checkout-boxes">
                                            <div className="checkinBox">
                                                <label>Check-in</label>
                                                <DatePicker
                                                    placeholderText="mm/dd/yyyy"
                                                    selected={checkInDate}
                                                    minDate={new Date()}
                                                    onChange={handleCheckInDate}
                                                />
                                            </div>
                                            <div className="checkOutBox">
                                                <label>Check-out</label>
                                                <DatePicker
                                                    placeholderText="mm/dd/yyyy"
                                                    selected={checkOutDate}
                                                    minDate={checkInDate}
                                                    onChange={handleCheckOutDate}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="add-guest">
                                        <Button variant="contained" onClick={() => addGuestHandle()}><i class="fa fa-pencil"></i> Add Guest </Button>
                                    </div>
                                    {addGuest ?
                                        <AddGuestContainer
                                            addGuest={addGuest}
                                            setAddGuest={setAddGuest}
                                        />
                                        : ""
                                    }
                                    {!!guests.length && guests.length > 0 ?
                                        <TableContainer component={Paper} className="guest-table">
                                            <Table className={classes.table} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="right">Guest No.</TableCell>
                                                        <TableCell align="right">First Name</TableCell>
                                                        <TableCell align="right">Last Name</TableCell>
                                                        <TableCell align="right">Age</TableCell>
                                                        <TableCell align="right">Gender</TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {guests.map((guest, i) => (
                                                        <TableRow >
                                                            <TableCell component="th" scope="row">{i + 1}</TableCell>
                                                            <TableCell align="right">{guest.firstName}</TableCell>
                                                            <TableCell align="right">{guest.lastName}</TableCell>
                                                            <TableCell align="right">{guest.age}</TableCell>
                                                            <TableCell align="right">{guest.gender}</TableCell>
                                                            <TableCell align="right">
                                                                <Button onClick={() => removeGuest(guest.firstName)}><i class="fa fa-user-times"></i></Button>
                                                            </TableCell>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        : ""
                                    }
                                </div>
                                <div className="payment-form-and-stripe">
                                    {activeStep === 0 ?
                                        <div className="payment-form">
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                onClick={() => {
                                                    if (customerMobile === null || checkInDate === null || checkOutDate === null) {
                                                        setErrMsg(true)
                                                    } else {
                                                        markStepAsCompleted();
                                                        setActiveStep(activeStep + 1);
                                                        setErrMsg(false)
                                                    }
                                                }}
                                            >
                                                Pay now</Button>
                                            <div className="base-price-box">
                                                <div className="base-price">
                                                    Base price
                                                </div>
                                                <div className="price">
                                                    $US <span>{parseFloat(price).toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div className="price-before-tax-box">
                                                <div className="price-before-tax">
                                                    Price Before Tax
                                                </div>
                                                <div className="price-tax">
                                                    <div>$US <span>{parseFloat(price * numberOfNight * numberOfRoomBook).toFixed(2)}</span> </div>
                                                    <div className="price-before-tax-details">$US {price}.00 x {numberOfNight} Night(s) x {numberOfRoomBook} Room(s)</div>
                                                </div>
                                            </div>
                                            <div className="tax-price-box">
                                                <div className="tax-price">
                                                    <span>Taxes & Service Fees <i class="fa fa-exclamation-circle"></i></span>
                                                </div>
                                                <div className="tax">
                                                    $US <span>{parseFloat(price * numberOfNight * numberOfRoomBook * 0.125).toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div className="total-price-box">
                                                <div className="total-price">
                                                    Total Payment:
                                                </div>
                                                <div className="total">
                                                    $US <span>{parseFloat(price * numberOfNight * numberOfRoomBook + (price * numberOfNight * numberOfRoomBook * 0.125)).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        : ""}
                                    {activeStep === 1 ?
                                        <div className="book">
                                            <Stripe
                                                amount={parseFloat(price * numberOfNight * numberOfRoomBook + (price * numberOfNight * numberOfRoomBook * 0.125))}
                                                handleClose={handleClose}
                                                handleBook = {handleBook}

                                            />

                                            {/* <Button variant="contained" onClick={() => handleBook()}><i class="fa fa-pencil"></i> Book</Button> */}

                                        </div>
                                        : ""}
                                </div>
                            </div>

                        </div>
                        {errMsg ? <div style={{ color: 'red' }}> You have to fill your booking form before check out </div> : ""}


                    </div>
                </Fade>
            </Modal>
        </div>
    )
}