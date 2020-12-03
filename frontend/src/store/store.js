import React from 'react';
import AppContext from "./AppContext";
import {useReducer} from "react";
import userReducer, {initialUserState} from "./user/userReducer";
import authReducer, {initialAuthState} from "./auth/authReducer";
import availabilityReducer, {initialRoomTypeState} from "./availability/availavilityReducer";
import reservationReducer, {initialReservationsState} from "./reservations/reservationReducer";
import adminReservationsReducer, {initialAdminReservationsState} from "./adminReservations/adminReservationsReducer";
import employeesReducer, {initialEmployeesState} from './employees/employeesReducer';
import interactiveTableReducer, {initialInteractiveTableState} from "./interactive-table/interactiveTableReducer";
import seasonalRatesReducer, {initialSeasonalRatesState} from "./seasonal-rates/seasonalRatesReducer";


const initialState = {
    user: initialUserState,
    auth: initialAuthState,
    availability: initialRoomTypeState,
    reservations: initialReservationsState,
    adminReservations: initialAdminReservationsState,
    employees: initialEmployeesState,
    adminTable: initialInteractiveTableState,
    seasonalRates: initialSeasonalRatesState,
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
    adminReservations: adminReservationsReducer,
    employees: employeesReducer,
    adminTable: interactiveTableReducer,
    seasonalRates: seasonalRatesReducer,
});

const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState, undefined);
    return <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
};

export default StoreProvider;