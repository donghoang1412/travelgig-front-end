import * as ActionTypes from "../ActionTypes";

let INITIAL_STATE = {
    hotels:[],
}

export default function HotelReducer(state=INITIAL_STATE, action)
{
    switch (action.type) {        

        case ActionTypes.FETCH_HOTELS:            
        return {...state, hotels:action.payload.hotelList};
        
        // case ActionTypes.FETCH_PRODUCTS_FULFILLED:            
        //     return {...state, products:action.payload};

        default:
            return state;
    }
}