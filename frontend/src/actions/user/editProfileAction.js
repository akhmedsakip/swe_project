import axios from 'axios';
import fetchUserAction from "./fetchUserAction";

const editProfileAction = async (user, dispatch) => {
    try {
        await axios.put('/api/user', user);
        await fetchUserAction(dispatch);
    } catch(error) {
        throw error;
    }
};

export default editProfileAction;