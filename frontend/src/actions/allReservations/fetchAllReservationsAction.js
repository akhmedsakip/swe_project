import axios from "axios";
import {ALL_RESERVATIONS_SET_RESERVATIONS} from "../../store/manager/allReservations/allReservationsActionTypes";

async function fetchAllReservationsAction(dispatch) {
    try {
        const {data} = (await axios.get('/api/reservations/all'));
        // console.log(data);
        dispatch({type: ALL_RESERVATIONS_SET_RESERVATIONS, payload: data});
    } catch (error) {
      throw error;
    }
}

export default fetchAllReservationsAction;