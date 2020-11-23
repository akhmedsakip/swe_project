import React, {useContext} from 'react';
import {Route, Redirect} from "react-router-dom";
import AppContext from "../store/AppContext";

const PrivateRoute = ({privileges, ...other}) => {
    const {state} = useContext(AppContext);
    if(!state.user.loggedIn) {
        return <Redirect to={"/"} />
    }
    if(privileges) {
        console.log(privileges);
        console.log(state.user.userInfo.privileges);
        const hasAllPrivileges = privileges
            .reduce((accum, privilege) => accum && state?.user?.userInfo?.privileges.includes(privilege), true);
        if(!hasAllPrivileges) {
            return <Redirect to={"/"} />
        }
    }
    return <Route {...other}/>
};

export default PrivateRoute;