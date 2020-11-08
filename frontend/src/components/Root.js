import React, {useEffect, useContext, useState} from 'react';
import {useLocation} from "react-router-dom";
import fetchUserAction from "../actions/user/fetchUserAction";
import AppContext from "../store/AppContext";
import {USER_SET_LOADING, USER_UNSET_LOADING} from "../store/user/userActionsTypes";

const Root = ({children}) => {
    const {dispatch} = useContext(AppContext);
    const [loadedFirstTime, setLoadedFirstTime] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if(!loadedFirstTime) {
            dispatch({type: USER_SET_LOADING});
        }
        fetchUserAction(dispatch).catch((err) => console.log(err))
            .finally(() => {
                if(!loadedFirstTime) {
                    setLoadedFirstTime(true);
                }
                setTimeout(() => dispatch({type: USER_UNSET_LOADING}), 700);
            });
    }, [location, dispatch]);

    return <>{children}</>
};

export default Root;