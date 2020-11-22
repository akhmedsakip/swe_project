import axios from "axios";
import {RESERVATIONS_SET_RESERVATIONS} from "../../store/reservations/reservationActionTypes";

async function deleteReservationAction(dispatch, values) {
    try {
        const {data} = (await axios.delete('/api/reservations',{data: {orderId: values.orderId}}));
    } catch (error) {
        throw error;
    }
}

export default deleteReservationAction;