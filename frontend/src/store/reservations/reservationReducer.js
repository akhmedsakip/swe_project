import {
    RESERVATIONS_SET_LOADING,
    RESERVATIONS_SET_RESERVATIONS,
    RESERVATIONS_UNSET_LOADING,
    RESERVATIONS_SET_DELETE
} from "./reservationActionTypes";

export const initialReservationsState = {
    reservations: [],
    loading: false,
    reservationToDelete: null
};

function reservationReducer(state, action) {
    switch (action.type) {
        case RESERVATIONS_SET_RESERVATIONS:
            return {...state, reservations: action.payload};
        case RESERVATIONS_SET_DELETE:
            return {...state, reservationToDelete: action.payload}
        case RESERVATIONS_SET_LOADING:
            return {...state, loading: true};
        case RESERVATIONS_UNSET_LOADING:
            return {...state, loading: false};
        default:
            return state;
    }
}

export default reservationReducer;