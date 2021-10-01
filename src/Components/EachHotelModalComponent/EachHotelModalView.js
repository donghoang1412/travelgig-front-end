import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import GoogleMapContainer from "../GoogleMapComponent/GoogleMapContainer"
import StarReviewContainer from '../StarDisplayComponents/StarReviewContainer';
import ChipModalContainer from '../ChipModalComponent/ChipModalContainer';
import RoomTypeContainer from '../RoomTypeComponent/RoomTypeContainer';
import DisplayReviewContainer from '../DisplayReviewComponent/DisplayReviewContainer';
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

    },
}));

export default function EachHotelModalView(props) {
    const {
        trigger,
        setTrigger,
        hotelName,
        imageURL,
        address,
        description,
        starRating,
        mobile,
        averagePrice,
        amenities,
        hotelRooms,
        hotelId,
        review
    } = props;
    const classes = useStyles();

    const handleClose = () => {
        setTrigger(false);
    };

    useEffect(() => {
        calculateStarRating()
    }, [])
    const [rating, setRating] = useState(0)
    const [clickRating, setClickRating] = useState(false)
    const calculateStarRating = () => {
        let rating = 0
        for (let i = 0; i < review.length; i++) {
            rating = rating + review[i].starRating
        }
        rating = rating / review.length
        setRating(rating)
    }
    const handleClickRating = () => {
        setClickRating(!clickRating)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={trigger}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={trigger}>
                    <div className={classes.paper}>
                        <div className="imageInModal">
                            <img src={imageURL} alt="" width="100%" height="300px" />
                        </div>
                        <div className="roomTypeInModal">
                            {hotelRooms.map((room) => {
                                return (
                                    <RoomTypeContainer
                                        description={room.description}
                                        discount={room.discount}
                                        noRooms={room.noRooms}
                                        policies={room.policies}
                                        price={room.price}
                                        type={room.type}
                                        hotelRoomId={room.hotelRoomId}
                                        hotelName={hotelName}
                                        hotelId={hotelId}
                                    />
                                )
                            })}
                        </div>
                        <div className="informationInModal">
                            <h2>{hotelName}</h2>
                            <h4>{address}</h4>
                            <div className="review_hotel_modal">
                                <StarReviewContainer rating={rating} />
                                <span onClick={() => handleClickRating()}>{review.length} ratings</span>
                            </div>

                            <h6> <i style={{ margin: '1%' }} class="fa fa-mobile" aria-hidden="true"></i>{mobile} </h6>
                            <p> <span style={{ color: "blue", margin: '1%' }}>&#8634;</span> {description}</p>
                        </div>

                        {amenities.map((amenity) => {
                            return (
                                <ChipModalContainer className="chipmodal"
                                    amenity={amenity.name}
                                />

                            )
                        })}
                        {clickRating ?
                            <DisplayReviewContainer
                                review ={review}
                                clickRating={clickRating}
                                setClickRating={setClickRating}
                            />
                            : ""}
                    </div>

                </Fade>
            </Modal>
        </div>
    );
}
