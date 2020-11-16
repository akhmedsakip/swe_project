import axios from 'axios';

const fetchOrdersAction = async (user, dispatch) => {
    try {
        const {data} = await axios.get('/api/my-orders', user);
        if(data['orders']) {
            return dispatch({});
        }
    } catch(error) {
        throw error;
    }
};

export default fetchOrdersAction;