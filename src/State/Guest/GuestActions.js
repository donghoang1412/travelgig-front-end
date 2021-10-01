import * as ActionTypes from "../ActionTypes";

export const addGuestToStore = (guestObject)=>({
    type: ActionTypes.ADD_GUEST,
    payload: {guestObject}
})

export const removeGuestFromStore = (firstName) =>({
    type: ActionTypes.REMOVE_GUEST,
    payload: {firstName}
})