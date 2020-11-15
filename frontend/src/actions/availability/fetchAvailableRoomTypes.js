import axios from "axios";
import {AVAILABILITY_SET_ROOM_TYPES} from "../../store/availability/availabilityActionTypes";

const fetchAvailableRoomTypes = async (dispatch, values) => {
    try {
        const response = await axios.get("/api/roomTypes/availableRoomTypes", {params: values});
        const roomTypes = response.data;
        for(let roomType of roomTypes) {
            const priceResponse = await axios.get("/api/roomTypes/calculatePrice", {params: {
                checkInDate: values.checkInDate, checkOutDate: values.checkOutDate,
                hotelId: roomType.hotelId, roomTypeName: roomType.name}});
            roomType['totalPrice'] = priceResponse.data?.totalPrice;
        }
        dispatch({type: AVAILABILITY_SET_ROOM_TYPES, payload: roomTypes});
    } catch(error) {
        throw error;
    }
};

export default fetchAvailableRoomTypes;