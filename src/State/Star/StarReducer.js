import * as ActionTypes from "../ActionTypes";

let INITIAL_STATE = {
    star : 0
}

export default function StarReducer(state=INITIAL_STATE, action)
{
    switch (action.type) {        

        case ActionTypes.FILTER_STAR:            
        return {...state, star:action.payload.star};
        
        default:
            return state;
    }
}