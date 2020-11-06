import axios from "axios";

const fetchAvailableHotels = async (dispatch, values) => {
    try {
        console.log(values);
        const response = await axios.get("/api/hotels/availableHotels", {params: values});
        dispatch({type: 'setParams', payload: values});
        dispatch({type: 'setHotels', payload: response.data});
    } catch(error) {
        return error.response.data;
    }
};

export default fetchAvailableHotels;