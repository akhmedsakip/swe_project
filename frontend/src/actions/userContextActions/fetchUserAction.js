import axios from 'axios';
import {USER_LOG_IN, USER_SIGN_OUT} from "../../store/user/userActionsTypes";

const fetchUserAction = async (dispatch) => {
    try {
        const {data} = (await axios.get('/api/user'));
        if(data['email']) {
            return dispatch({type: USER_LOG_IN, payload: data});
        }
    } catch (e) {
        console.log(e);
    }
    dispatch({type: USER_SIGN_OUT});
};

export default fetchUserAction;