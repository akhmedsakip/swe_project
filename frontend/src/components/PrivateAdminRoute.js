import React, {useContext} from 'react';
import {Route, Redirect} from "react-router-dom";
import AppContext from "../store/AppContext";

const PrivateAdminRoute = ({...other}) => {
    const {state} = useContext(AppContext);
    if(state.user.isAdmin) {
        return <Route {...other}/>
    }
    return <Redirect to={"/admin"} />
};

export default PrivateAdminRoute;