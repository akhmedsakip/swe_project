import axios from 'axios'
import logoutAction from "./logoutAction";

const changePasswordAction = async (data, dispatch) => {
    try {
        await axios.put('/api/user/changePassword', data);
        await logoutAction(dispatch);
        dispatch({type: 'changedPassword'});
    } catch(error) {
        return error.response.data;
    }
};

export default changePasswordAction;