import axios from 'axios'
import fetchOrdersAction from './fetchOrdersAction';

const deleteOrderAction = async (data, dispatch) => {
    try {
        await axios.put('/api/my-orders/delete', data);
        await fetchOrdersAction(dispatch);
    } catch(error) {
        throw error;
    }
};

export default deleteOrderAction;