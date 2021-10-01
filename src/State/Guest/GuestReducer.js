import * as ActionTypes from "../ActionTypes";

let INITIAL_STATE = {
    guests: [],
}

export default function GuestReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case ActionTypes.ADD_GUEST:
            const newState = state
            newState.guests.push(action.payload.guestObject)
            return newState;

        case ActionTypes.REMOVE_GUEST:         
            return {
                guests: [
                    ...state.guests.filter(guest => guest.firstName !== action.payload.firstName)
                ]
            }

        default:
            return state;
    }
}