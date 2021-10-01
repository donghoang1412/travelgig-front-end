import React, { } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EachHSQuestionContainer from "../EachHSQuestionComponent/EachHSQuestionContainer";
import "./AdminPage.css"
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
export default function AdminPageView(props) {
    const classes = useStyles()
    const {
        adminPage,
        setAdminPage,
        helpSupportQuestions,
        rerender,
        setRerender
    } = props

    const handleClose = () => {
        setAdminPage(false)
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={adminPage}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={adminPage}>
                    <div className={classes.paper}>
                        {helpSupportQuestions.map((question) => {
                            return (
                                <EachHSQuestionContainer
                                    question={question}
                                    setRerender={setRerender}
                                    rerender={rerender}
                                />
                            )
                        })}
                    </div>

                </Fade>
            </Modal>
        </div>
    )
}