import * as ActionTypes from "../ActionTypes";

let INITIAL_STATE = {
    price : 500,
}

export default function PriceReducer(state=INITIAL_STATE, action)
{
    switch (action.type) {        

        case ActionTypes.FILTER_PRICE:            
        return {...state, price:action.payload.price};
        
        default:
            return state;
    }
}