import {
    AVAILABILITY_SET_CITIES,
    AVAILABILITY_SET_HOTELS, AVAILABILITY_SET_LOADING,
    AVAILABILITY_SET_PARAMS,
    AVAILABILITY_SET_ROOM_TYPE,
    AVAILABILITY_SET_ROOM_TYPES, AVAILABILITY_UNSET_LOADING,
    AVAILABILITY_UNSET_ROOM_TYPE
} from "./orderActionTypes";

export const initialOrderState = {
    Hotel: null,
    RoomType: null,
    CheckInDate: null,
    CheckOutDate: null,
    ReservationDate: null,
    ID: null
};

function orderReducer(state, action) {
    switch (action.type) {
        case AVAILABILITY_SET_HOTELS:
            return {...state, hotels: action.payload};
        case AVAILABILITY_SET_ROOM_TYPES:
            return {...state, roomTypes: action.payload};
        case AVAILABILITY_SET_ROOM_TYPE:
            return {...state, roomType: action.payload};
        case AVAILABILITY_UNSET_ROOM_TYPE:
            return {...state, roomType: null};
        case AVAILABILITY_SET_PARAMS:
            return {...state, params: action.payload};
        case AVAILABILITY_SET_CITIES:
            return {...state, cities: action.payload};
        case AVAILABILITY_SET_LOADING:
            return {...state, loading: true};
        case AVAILABILITY_UNSET_LOADING:
            return {...state, loading: false};
        default:
            return state;
    }
}

export default orderReducer;