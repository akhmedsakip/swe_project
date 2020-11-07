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
    } catch(error) {
        throw error;
    }
};

export default loginAction;
