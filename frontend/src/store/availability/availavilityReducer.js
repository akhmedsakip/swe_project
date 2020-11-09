import {
    AVAILABILITY_SET_CITIES,
    AVAILABILITY_SET_HOTELS, AVAILABILITY_SET_LOADING,
    AVAILABILITY_SET_PARAMS,
    AVAILABILITY_SET_ROOM_TYPE,
    AVAILABILITY_SET_ROOM_TYPES, AVAILABILITY_UNSET_LOADING,
    AVAILABILITY_UNSET_ROOM_TYPE,
    AVAILABILITY_SET_TOTAL_PRICES
} from "./availabilityActionTypes";

export const initialRoomTypeState = {
    hotels: [],
    roomTypes: [],
    totalPrices: [],
    roomType: null,
    params: null,
    cities: [],
    loading: false,
};

function availabilityReducer(state, action) {
    switch (action.type) {
        case AVAILABILITY_SET_HOTELS:
            return {...state, hotels: action.payload};
        case AVAILABILITY_SET_ROOM_TYPES:
            return {...state, roomTypes: action.payload};
        case AVAILABILITY_SET_TOTAL_PRICES:
            return {...state, totalPrices: action.payload};
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

export default availabilityReducer;