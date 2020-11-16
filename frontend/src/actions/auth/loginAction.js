import axios from 'axios';
import fetchUserAction from "../user/fetchUserAction";
import {USER_SIGN_OUT} from "../../store/user/userActionsTypes";
import {AUTH_CLOSE_DIALOG} from "../../store/auth/authActionTypes";

const loginAction = async(dispatch, values) => {
    try {
        await axios.post("/api/authenticate", values);
    } catch(error) {
        throw error;
    }
};

export default loginAction;
