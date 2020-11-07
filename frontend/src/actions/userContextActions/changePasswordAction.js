import axios from 'axios'
import logoutAction from "./logoutAction";
import {AUTH_SET_LOGIN_MESSAGE} from "../../store/auth/authActionTypes";

const changePasswordAction = async (data, dispatch) => {
    try {
        await axios.put('/api/user/changePassword', data);
        await logoutAction(dispatch);
        dispatch({type: AUTH_SET_LOGIN_MESSAGE, payload: 'Password successfully changed'});
    } catch(error) {
        return error.response.data;
    }
};

export default changePasswordAction;