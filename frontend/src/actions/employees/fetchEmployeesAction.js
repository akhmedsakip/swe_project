import axios from "axios";
import { EMPLOYEES_SET_EMPLOYEES } from "../../store/manager/employees/employeesActionTypes";

async function fetchEmployeesAction(dispatch) {
    try {
        const {data} = (await axios.get('/api/employees'));
        dispatch({type: EMPLOYEES_SET_EMPLOYEES, payload: data});
    } catch (error) {
      throw error;
    }
}

export default fetchEmployeesAction;