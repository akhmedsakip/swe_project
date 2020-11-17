import {
    RESERVATIONS_SET_LOADING,
    RESERVATIONS_SET_RESERVATIONS,
    RESERVATIONS_UNSET_LOADING
} from "./reservationActionTypes";

export const initialReservationsState = {
    reservations: [],
    loading: false
};

function reservationReducer(state, action) {
    switch (action.type) {
        case RESERVATIONS_SET_RESERVATIONS:
            return {...state, reservations: action.payload};
        case RESERVATIONS_SET_LOADING:
            return {...state, loading: true};
        case RESERVATIONS_UNSET_LOADING:
            return {...state, loading: false};
        default:
            return state;
    }
}

export default reservationReducer;