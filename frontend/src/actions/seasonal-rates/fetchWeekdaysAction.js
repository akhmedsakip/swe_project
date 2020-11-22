import axios from "axios";
import {
    SEASONAL_RATES_SET_WEEKDAYS
} from "../../store/seasonal-rates/seasonalRatesActionTypes";

export default async function fetchSeasonsAction(seasonId, dispatch) {
    try {
        const res = await axios.get('/api/seasons/weekdays', {params: {seasonId}});
        dispatch({type: SEASONAL_RATES_SET_WEEKDAYS, payload: res.data});
    } catch(error) {
        throw error;
    }
}