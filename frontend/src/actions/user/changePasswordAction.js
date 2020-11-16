<<<<<<< HEAD
import axios from 'axios'
import logoutAction from "../auth/logoutAction";
import {AUTH_OPEN_DIALOG, AUTH_SET_LOGIN_MESSAGE} from "../../store/auth/authActionTypes";

const changePasswordAction = async (data, dispatch) => {
    try {
        await axios.put('/api/user/changePassword', data);
        await logoutAction(dispatch);
        dispatch({type: AUTH_OPEN_DIALOG});
        dispatch({type: AUTH_SET_LOGIN_MESSAGE, payload: 'Password successfully changed'});
    } catch(error) {
        throw error;
    }
};

=======
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

>>>>>>> f9ff2b1c20937275384526ff481c6774c5a2fc29
export default changePasswordAction;