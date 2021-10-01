import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import HotelReducer from "./Hotels/HotelReducer"
import StarReducer from "./Star/StarReducer"
import PriceReducer from "./Price/PriceReducer"
import GuestReducer from "./Guest/GuestReducer"
let logger = () => (next) => (action) => {
    //currying in javasript where we pass function as input and recieve function as output
    console.log("Logged Action : Store File ", action); 
    next(action); //move to the actual execution
};
export default createStore(
    combineReducers({
        HotelReducer,
        StarReducer,
        PriceReducer,
        GuestReducer
    }),
    {}, //intial state for store states
    applyMiddleware(logger, thunk, promise) //middle wares tp used at various places like action.js
)