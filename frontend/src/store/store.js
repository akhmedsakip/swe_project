import React from 'react';
import StoreContext from "./StoreContext";
import {useReducer} from "react";
import userReducer from "./user/userReducer";

const initialState = {
    user: {logged_in: false}
};

const combineReducers = (slices) => (state, action) =>
    Object.keys(slices).reduce( // use for..in loop, if you prefer it
        (accumulator, prop) => ({
            ...accumulator,
            [prop]: slices[prop](accumulator[prop], action),
        }),
        state
    );

const reducers = combineReducers({
    user: userReducer,
});

const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(combineReducers(), initialState, undefined);
    return <StoreContext.Provider value={{state, dispatch}}>
        {children}
    </StoreContext.Provider>
};

export default StoreProvider;