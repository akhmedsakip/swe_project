import axios from "axios";
import {ALL_RESERVATIONS_SET_RESERVATIONS} from "../../store/manager/allReservations/allReservationsActionTypes";

async function editAllReservationsAction(dispatch, values) {
    try {
        const {data} = (await axios.post('/api/reservations/panel', values));
        console.log(data);
        dispatch({type: ALL_RESERVATIONS_SET_RESERVATIONS, payload: data});
    } catch (error) {
        throw error;
    }
}

export default editAllReservationsAction;