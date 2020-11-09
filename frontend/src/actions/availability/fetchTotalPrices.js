import axios from "axios";
import {AVAILABILITY_SET_TOTAL_PRICES} from "../../store/availability/availabilityActionTypes";

const fetchTotalPrices = async (dispatch, values) => {
    try {
        const response = await axios.get("/api/roomTypes/calculatePrice", {params: values});
        dispatch({type: AVAILABILITY_SET_TOTAL_PRICES, payload: response.data});
    } catch(error) {
        throw error;
    }
};

export default fetchTotalPrices;