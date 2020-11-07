import axios from 'axios';
import {AUTH_SET_LOGIN, AUTH_SET_LOGIN_MESSAGE} from "../../store/auth/authActionTypes";

const registrationAction = async (dispatch, values) => {
    try {
        await axios.post("/api/register", values);
        dispatch({type: AUTH_SET_LOGIN_MESSAGE, payload: 'Successfully registered'});
        dispatch({type: AUTH_SET_LOGIN});
    } catch(error) {
        throw error;
    }
};

export default registrationAction;