import axios from "axios";
import {RESERVATIONS_SET_RESERVATIONS} from "../../store/reservations/reservationActionTypes";

async function fetchReservationsAction(dispatch) {
    try {
        const {data} = (await axios.get('/api/reservations'));
        dispatch({type: RESERVATIONS_SET_RESERVATIONS, payload: data});
    } catch (error) {
        throw error;
    }
}

export default fetchReservationsAction;