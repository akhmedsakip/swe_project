import React from 'react';
import AppContext from "./AppContext";
import {useReducer} from "react";
import userReducer, {initialUserState} from "./user/userReducer";
import authReducer, {initialAuthState} from "./auth/authReducer";
import availabilityReducer, {initialRoomTypeState} from "./availability/availavilityReducer";
<<<<<<< HEAD
import orderReducer, {initialOrderState} from "./order/orderReducer";
=======
import reservationReducer, {initialReservationsState} from "./reservations/reservationReducer";
>>>>>>> f9ff2b1c20937275384526ff481c6774c5a2fc29

const initialState = {
    user: initialUserState,
    auth: initialAuthState,
    availability: initialRoomTypeState,
<<<<<<< HEAD
    order: initialOrderState,
=======
    reservations: initialReservationsState
>>>>>>> f9ff2b1c20937275384526ff481c6774c5a2fc29
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
<<<<<<< HEAD
    order: orderReducer,
=======
    reservations: reservationReducer,
>>>>>>> f9ff2b1c20937275384526ff481c6774c5a2fc29
});

const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState, undefined);
    return <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
};

export default StoreProvider;