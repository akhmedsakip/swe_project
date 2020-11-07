import React, {useEffect, useContext} from 'react';
import {useLocation} from "react-router-dom";
import fetchUserAction from "../actions/userContextActions/fetchUserAction";
import AppContext from "../store/AppContext";

const Root = ({children}) => {
    const {dispatch} = useContext(AppContext);
    const location = useLocation();
    useEffect(() => {
        fetchUserAction(dispatch);
    }, [location, dispatch]);

    return <>{children}</>
};

export default Root;