import axios from "axios";
import {AVAILABILITY_SET_PARAMS, AVAILABILITY_SET_ROOM_TYPE} from "../../../store/availability/availabilityActionTypes";

const reserveRoom = async (dispatch, values) => {
    try {
        await axios.post("/api/reserve", {reservationRequest: {
                hotelId: values.hotelId, roomTypeName: values.roomTypeName, checkInDate: values.checkInDate,
                checkOutDate: values.checkOutDate
            }, guest: {firstName: values.firstName, lastName: values.lastName, gender: values.gender,
            phoneNumber: values.phoneNumber}});
    } catch(error) {
        throw error;
    }
};

export default reserveRoom;