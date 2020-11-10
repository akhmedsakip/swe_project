import axios from "axios";
import {AVAILABILITY_SET_CITIES} from "../../store/availability/availabilityActionTypes";

const fetchCitiesAction = async (dispatch) => {
    try {
        const response = await axios.get("/api/hotels/cities");
        dispatch({type: AVAILABILITY_SET_CITIES, payload: response.data})
    } catch(error) {
        throw error;
    }
};

export default fetchCitiesAction;