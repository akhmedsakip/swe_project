import axios from "axios";
import fetchEmployeesAction from "./fetchEmployeesAction";

async function editEmployeeAction(values, dispatch) {
    try {
        await axios.patch('/api/employees/salary', values);
        fetchEmployeesAction(dispatch);
    } catch (error) {
      throw error;
    }
}

export default editEmployeeAction;