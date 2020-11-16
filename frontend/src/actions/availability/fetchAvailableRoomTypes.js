<<<<<<< HEAD
import axios from "axios";
import {AVAILABILITY_SET_ROOM_TYPES} from "../../store/availability/availabilityActionTypes";

const fetchAvailableRoomTypes = async (dispatch, values) => {
    try {
        const response = await axios.get("/api/roomTypes/availableRoomTypes", {params: values});
        dispatch({type: AVAILABILITY_SET_ROOM_TYPES, payload: response.data});
    } catch(error) {
        throw error;
    }
};

=======
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

>>>>>>> f9ff2b1c20937275384526ff481c6774c5a2fc29
export default fetchAvailableRoomTypes;