import React, {useContext} from 'react';
import {Route, Redirect} from "react-router-dom";
import UserContext from "../contexts/userContext";

const PrivateRoute = ({...other}) => {
    const {state} = useContext(UserContext);
    if(state.loggedIn) {
        return <Route {...other}/>
    }
    return <Redirect to={"/"} />
};

export default PrivateRoute;