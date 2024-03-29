import axios from 'axios'
import logoutAction from "../auth/logoutAction";
import {AUTH_OPEN_DIALOG, AUTH_SET_LOGIN_MESSAGE} from "../../store/auth/authActionTypes";

const changePasswordAction = async (data, dispatch) => {
    try {
        await axios.put('/api/user/changePassword', data);
        await logoutAction(dispatch);
        dispatch({type: AUTH_OPEN_DIALOG});
        const message = {
            message: 'Password successfully changed',
            error: false,
        };
        dispatch({type: AUTH_SET_LOGIN_MESSAGE, payload: message});
    } catch(error) {
        throw error;
    }
};

export default changePasswordAction;