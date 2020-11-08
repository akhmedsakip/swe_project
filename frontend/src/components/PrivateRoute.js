import React, {useContext} from 'react';
import {Route, Redirect} from "react-router-dom";
import AppContext from "../store/AppContext";

const PrivateRoute = ({...other}) => {
    const {state} = useContext(AppContext);
    if(state.user.loggedIn) {
        return <Route {...other}/>
    }
    return <Redirect to={"/"} />
};

export default PrivateRoute;