import React from 'react';
import AppContext from "./AppContext";
import {useReducer} from "react";
import userReducer, {initialUserState} from "./user/userReducer";
import authReducer, {initialAuthState} from "./auth/authReducer";
import availabilityReducer, {initialRoomTypeState} from "./availability/availavilityReducer";
import orderReducer, {initialOrderState} from "./order/orderReducer";

const initialState = {
    user: initialUserState,
    auth: initialAuthState,
    availability: initialRoomTypeState,
    order: initialOrderState,
};

const combineReducers = (slices) => (state, action) =>
    Object.keys(slices).reduce((accumulator, prop) => ({
            ...accumulator,
            [prop]: slices[prop](accumulator[prop], action),
        }),
        state
    );

const reducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    availability: availabilityReducer,
    order: orderReducer,
});

const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState, undefined);
    return <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
};

export default StoreProvider;