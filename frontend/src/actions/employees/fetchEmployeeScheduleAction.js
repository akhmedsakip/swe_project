import axios from "axios";
import {
  EMPLOYEES_SET_SCHEDULE
} from "../../store/employees/employeesActionTypes";

export default async function fetchEmployeeScheduleAction(employeeId, dispatch) {
  try {
    const res = await axios.get('/api/schedules/' + employeeId);
    dispatch({type: EMPLOYEES_SET_SCHEDULE, payload: res.data});
    console.log(res.data);
  } catch(error) {
    throw error;
  }
}