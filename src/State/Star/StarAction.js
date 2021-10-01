import * as ActionTypes from "../ActionTypes";

export const addFilterStar = (star)=>({
    type: ActionTypes.FILTER_STAR,
    payload: {star}
})