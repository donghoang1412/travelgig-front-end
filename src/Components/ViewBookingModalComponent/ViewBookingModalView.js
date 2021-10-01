import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UpcomingViewContainer from "../UpcomingViewContainer/UpcomingViewContainer";
import CancelledViewContainer from "../CancelledViewComponent/CancelledViewContainer";
import CompleteViewContainer from "../CompleteViewComponent/CompleteViewContainer";
import "./ViewBookingModal.css"

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
        width: '80%',
        height:'80%',
        'overflow-y':'auto'
    },

}));
export default function ViewBookingView(props) {
    const {
        viewBookingClick,
        setViewBookingClick
    } = props

    const classes = useStyles();

    const [valueNav, setValueNav] = useState(0);
    const [upComing, setUpComing] = useState(true);
    const [cancelled, setCancelled] = useState(false);
    const [complete, setComplete] = useState(false);
    const [customerMobile, setCustomerMobile] = useState('')
    const handleNavChange = (event, newValue) => {
        setValueNav(newValue);
        console.log("newValue " + newValue)
        if (newValue === 0) {
            setUpComing(true)
            setCancelled(false)
            setComplete(false)
        }
        else if (newValue === 1) {
            setUpComing(false)
            setCancelled(true)
            setComplete(false)
        }
        else if (newValue === 2) {
            setUpComing(false)
            setCancelled(false)
            setComplete(true)
        }

    };

    console.log("complete " + complete)
    const handleClose = () => {
        setViewBookingClick(false);
    };

    useEffect(() => {
        getUserMobile()
    })

    const getUserMobile = async () => {
        const userName = localStorage.getItem('userName')
        const jwt = localStorage.getItem('jwt')

        const api = `http://localhost:8383/getLoginUser?userName=` + userName;

        const response = await fetch(api, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": jwt
            }
        }).then(res => res.json())
            .then(resJson => resJson)
            .catch(err => err)


        // console.log("My user object " + response)
        setCustomerMobile(response.customerMobile)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={viewBookingClick}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={viewBookingClick}>
                    <div className={classes.paper}>
                        <div>
                            <Paper square>
                                <Tabs
                                    value={valueNav}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={handleNavChange}

                                >
                                    <Tab label="Upcoming" icon={<i class="fa fa-calendar"></i>} />
                                    <Tab label="Cancelled" icon={<i class="fa fa-window-close"></i>} />
                                    <Tab label="Completed" icon={<i class="fa fa-check-square"></i>} />
                                </Tabs>
                            </Paper>
                        </div>
                        {upComing ? <UpcomingViewContainer
                            customerMobile={customerMobile}
                        /> : ""}
                        {cancelled ? <CancelledViewContainer
                            customerMobile={customerMobile}
                        /> : ""}
                        {complete ? <CompleteViewContainer
                            customerMobile={customerMobile}
                        /> : ""}
                    </div>

                </Fade>
            </Modal>
        </div>
    )
}