import {
  ALL_RESERVATIONS_SET_LOADING,
  ADMIN_RESERVATIONS_SET_RESERVATIONS,
  ALL_RESERVATIONS_UNSET_LOADING,
  ALL_RESERVATIONS_SET_EDITING,
  ALL_RESERVATIONS_UNSET_EDITING,
  ALL_RESERVATIONS_SET_DELETE,
  ALL_RESERVATIONS_UNSET_DELETE,
} from "./adminReservationsActionTypes";

export const initialAdminReservationsState = {
  reservations: [],
};

function adminReservationsReducer(state, action) {
  switch (action.type) {
      case ADMIN_RESERVATIONS_SET_RESERVATIONS:
          return {...state, reservations: action.payload};
      default:
          return state;
  }
}

export default adminReservationsReducer;