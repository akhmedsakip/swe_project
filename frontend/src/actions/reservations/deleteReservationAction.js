import axios from "axios";

async function deleteReservationAction(orderId) {
    try {
        await axios.delete('/api/reservations', {data: {orderId}});
    } catch (error) {
        throw error;
    }
}

export default deleteReservationAction;