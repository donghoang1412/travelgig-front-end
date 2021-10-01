import * as ActionTypes from "../ActionTypes";

export const addHotelToStore = (hotelList)=>({
    type: ActionTypes.FETCH_HOTELS,
    payload: {hotelList}
})