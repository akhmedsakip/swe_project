import axios from 'axios';
import {USER_LOG_IN, USER_SIGN_OUT} from "../../store/user/userActionsTypes";
import Sha1 from 'crypto-js/sha1';
import Identicon from 'identicon.js';

const fetchUserAction = async (dispatch) => {
    try {
        const {data} = (await axios.get('/api/user'));
        if(data['email']) {
            const sha1= Sha1(data['email']).toString();
            const identicon = new Identicon(sha1, 420).toString();
            return dispatch({type: USER_LOG_IN, payload: {...data, identicon}});
        }
    } catch (error) {
        dispatch({type: USER_SIGN_OUT});
        throw error;
    }
};

export default fetchUserAction;