import axios from 'axios';

const logoutAction = async(dispatch) => {
    try {
        await axios.post('/api/logout');
        dispatch({type: 'signOut'})
    } catch (e) {
        console.log(e);
    }
};

export default logoutAction;