import axios from 'axios';
import {USER_SIGN_OUT} from "../../store/user/userActionsTypes";

const logoutAction = async(dispatch) => {
    try {
        await axios.post('/api/logout');
        dispatch({type: USER_SIGN_OUT})
    } catch (error) {
        throw error;
    }
};

export default logoutAction;