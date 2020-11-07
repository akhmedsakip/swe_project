import axios from 'axios';
import fetchUserAction from "./fetchUserAction";
import {USER_SIGN_OUT} from "../../store/user/userActionsTypes";
import {AUTH_CLOSE_DIALOG} from "../../store/auth/authActionTypes";

const loginAction = async(dispatch, email, password) => {
    try {
        await axios.post("/api/authenticate", {
            email: email,
            password: password
        });
        dispatch({type: AUTH_CLOSE_DIALOG});
        await fetchUserAction(dispatch);
    } catch(e) {
        dispatch({type: USER_SIGN_OUT});
        return e.response.data;
    }
};

export default loginAction;
