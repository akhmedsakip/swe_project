import axios from "axios";

const fetchAvailableRoomTypes = async (dispatch, values) => {
    try {
        const response = await axios.get("/api/roomTypes/availableRoomTypes", {params: values});
        dispatch({type: 'setRoomTypes', payload: response.data});
    } catch(error) {
        return error.response.data;
    }
};

export default fetchAvailableRoomTypes;