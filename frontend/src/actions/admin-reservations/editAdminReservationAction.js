import axios from "axios";

const editAdminReservationAction = async ({orderId, firstName, lastName, phoneNumber, gender}) => {
    try {
        await axios.put('/api/persons/edit', {
            "orderId": orderId,
            "person": {
                "firstName": firstName,
                "lastName": lastName,
                "phoneNumber": phoneNumber,
                "gender": gender
            }
        });
    } catch(error) {
        throw error;
    }
};

export default editAdminReservationAction;
