import React from 'react';
import AppContext from "./AppContext";
import {useReducer} from "react";
import userReducer, {initialUserState} from "./user/userReducer";
import authReducer, {initialAuthState} from "./auth/authReducer";
import availabilityReducer, {initialRoomTypeState} from "./availability/availavilityReducer";
import reservationReducer, {initialReservationsState} from "./reservations/reservationReducer";
import allReservationReducer, {initialAllReservationsState} from "./manager/allReservations/allReservationsReducer";


const initialState = {
    user: initialUserState,
    auth: initialAuthState,
    availability: initialRoomTypeState,
    reservations: initialReservationsState,
    allReservations: initialAllReservationsState
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
    reservations: reservationReducer,
    allReservations: allReservationReducer
});

const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState, undefined);
    return <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
};

export default StoreProvider;