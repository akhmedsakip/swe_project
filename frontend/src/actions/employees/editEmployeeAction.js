import axios from "axios";
import fetchEmployeesAction from "./fetchEmployeesAction";

async function editEmployeeAction(values, dispatch) {
    try {
        await axios.put('/api/employees', values);
        fetchEmployeesAction();
    } catch (error) {
      throw error;
    }
}

export default editEmployeeAction;