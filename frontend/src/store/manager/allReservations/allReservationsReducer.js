import {
  ALL_RESERVATIONS_SET_LOADING,
  ALL_RESERVATIONS_SET_RESERVATIONS,
  ALL_RESERVATIONS_UNSET_LOADING,
  ALL_RESERVATIONS_SET_EDITING,
  ALL_RESERVATIONS_UNSET_EDITING,
  ALL_RESERVATIONS_SET_DELETE,
  ALL_RESERVATIONS_UNSET_DELETE,
} from "./allReservationsActionTypes";

export const initialAllReservationsState = {
  allReservations: [],
  loading: false
};

function allReservationReducer(state, action) {
  switch (action.type) {
      case ALL_RESERVATIONS_SET_RESERVATIONS:
          return {...state, allReservations: action.payload};
      case ALL_RESERVATIONS_SET_LOADING:
          return {...state, loading: true};
      case ALL_RESERVATIONS_UNSET_LOADING:
          return {...state, loading: false};
      default:
          return state;
  }
}

export default allReservationReducer;