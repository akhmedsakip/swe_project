import axios from "axios";


const reserveRoomAction = async (dispatch, values) => {
    try {
        await axios.post("/api/reservations/reserve", {reservationRequest: {
                hotelId: values.hotelId, roomTypeName: values.roomTypeName, checkInDate: values.checkInDate,
                checkOutDate: values.checkOutDate
            }, guest: {firstName: values.firstName, lastName: values.lastName, gender: values.gender,
            phoneNumber: values.phoneNumber}});
    } catch(error) {
        throw error;
    }
};

export default reserveRoomAction;