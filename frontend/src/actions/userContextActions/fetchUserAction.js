import axios from 'axios';

const fetchUserAction = async (dispatch) => {
    try {
        const {data} = (await axios.get('/api/user'));
        if(data['email']) {
            return dispatch({type: 'setUser', payload: data});
        }
    } catch (e) {
        console.log(e);
    }
    dispatch({type: 'signOut'});
};

export default fetchUserAction;