import {
 EMPLOYEES_SET_LOADING,
 EMPLOYEES_SET_EMPLOYEES,
 EMPLOYEES_UNSET_LOADING,
} from "./employeesActionTypes";

export const initialEmployeesState = {
  employees: [],
  loading: false,
};

function employeesReducer(state, action) {
  switch (action.type) {
      case EMPLOYEES_SET_EMPLOYEES:
          return {...state, employees: action.payload};
      case EMPLOYEES_SET_LOADING:
          return {...state, loading: true};
      case EMPLOYEES_UNSET_LOADING:
          return {...state, loading: false};
      default:
          return state;
  }
}

export default employeesReducer;