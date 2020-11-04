import axios from 'axios';
import fetchUserAction from "./fetchUserAction";

const loginAction = async(dispatch, email, password) => {
    try {
        await axios.post("/api/authenticate", {
            email: email,
            password: password
        });
        await fetchUserAction(dispatch);
        return true;
    } catch(e) {
        return false;
    }
};

export default loginAction;
