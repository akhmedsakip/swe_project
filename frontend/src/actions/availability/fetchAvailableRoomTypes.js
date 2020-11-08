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

export default fetchAvailableRoomTypes;