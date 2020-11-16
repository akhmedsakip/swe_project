import axios from "axios";
import {AVAILABILITY_SET_HOTELS, AVAILABILITY_SET_PARAMS} from "../../store/availability/availabilityActionTypes";

const fetchAvailableHotelsAction = async (dispatch, values) => {
    try {
        const response = await axios.get("/api/hotels/availableHotels", {params: values});
        dispatch({type: AVAILABILITY_SET_PARAMS, payload: values});
        dispatch({type: AVAILABILITY_SET_HOTELS, payload: response.data});
    } catch(error) {
        throw error;
    }
};

export default fetchAvailableHotelsAction;