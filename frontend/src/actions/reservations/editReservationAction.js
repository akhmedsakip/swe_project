import axios from 'axios';
import fetchAllReservationsAction from "../allReservations/fetchAllReservationsAction";

const editReservationAction = async (values, dispatch) => {
    console.log('values')
    // console.log(values)
    try {
        await axios.put('/api/persons/edit', {
            "orderId": values.orderId,
            "person": {
                "firstName": values.firstName,
                "lastName": values.lastName,
                "phoneNumber": values.phoneNumber,
                "gender": values.gender
            }
        });
        await fetchAllReservationsAction(dispatch);
    } catch(error) {
        throw error;
    }
};

export default editReservationAction;