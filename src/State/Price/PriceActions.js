import * as ActionTypes from "../ActionTypes";

export const addFilterPrice = (price)=>({
    type: ActionTypes.FILTER_PRICE,
    payload: {price}
})