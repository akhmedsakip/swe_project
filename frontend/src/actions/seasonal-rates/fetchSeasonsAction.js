import axios from 'axios';
import {SEASONAL_RATES_SET_SEASONS} from "../../store/seasonal-rates/seasonalRatesActionTypes";

export default async function fetchSeasonsAction(dispatch) {
    try {
        const res = await axios.get('/api/seasons');
        dispatch({type: SEASONAL_RATES_SET_SEASONS, payload: res.data});
    } catch(error) {
        throw error;
    }
}

