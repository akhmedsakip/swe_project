import axios from "axios";

async function deleteReservationAction(orderId) {
    try {
        await axios.delete('/api/reservations/admin', {data: {orderId}});
    } catch (error) {
        throw error;
    }
}

export default deleteReservationAction;