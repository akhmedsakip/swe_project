import React, {useEffect, useContext} from 'react';
import {useLocation} from "react-router-dom";
import UserContext from "../contexts/userContext";
import fetchUserAction from "../actions/fetchUserAction";

const Root = ({children}) => {
    const {dispatch} = useContext(UserContext);
    const location = useLocation();
    useEffect(() => {
        fetchUserAction(dispatch);
    }, [location]);

    return <>{children}</>
};

export default Root;