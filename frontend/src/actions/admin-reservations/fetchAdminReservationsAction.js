import axios from "axios";
import {ADMIN_RESERVATIONS_SET_RESERVATIONS} from "../../store/adminReservations/adminReservationsActionTypes";

async function fetchAdminReservationsAction(dispatch) {
    try {
        const {data} = (await axios.get('/api/reservations/all'));
        dispatch({type: ADMIN_RESERVATIONS_SET_RESERVATIONS, payload: data});
    } catch (error) {
      throw error;
    }
}

export default fetchAdminReservationsAction;