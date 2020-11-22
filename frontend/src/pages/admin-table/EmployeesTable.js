import React, { useContext, useEffect, useState } from 'react'
import AdminTable from "./AdminTable";
import * as yup from "yup";
import useFetch from '../../hooks/useFetch';
import { EMPLOYEES_SET_LOADING, EMPLOYEES_UNSET_LOADING } from '../../store/manager/employees/employeesActionTypes';
import fetchEmployeesAction from '../../actions/employees/fetchEmployeesAction';
import AppContext from '../../store/AppContext';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import editEmployeeAction from '../../actions/employees/editEmployeeAction';

const mapping = {
    "employeeId": "Employee ID",
    "firstName": "First Name",
    "lastName": "Last Name",
    "phoneNumber": "Phone Number",
    "gender": "Gender",
    "userEmail": "Email",
    "employmentDate": "Employment Date",
    "dismissalDate": "Dismissal Date",
    "position": "Position",
    "baseSalaryPerHour": "Base Salary/Hour"
}

const editableColumns = [
    "baseSalaryPerHour"
];

const addableColumns = [];

const mappingInput = {}

const schema = yup.object().shape({
    baseSalaryPerHour: yup.string().required("Base Salary Per Hour is empty"),
});

const AdminEmployeesTable = () => {

    // const {loading, onSubmit, result, error} = useFetch();
    const { state, dispatch } = useContext(AppContext);
    const [objects, setObjects] = useState([]);
    const history = useHistory();

    useEffect(() => {
        (async function () {
            dispatch({ type: EMPLOYEES_SET_LOADING });
            await fetchEmployeesAction(dispatch);
            setTimeout(() => dispatch({ type: EMPLOYEES_UNSET_LOADING }), 300);
        })()
    }, []);

    const employees = state.employees.employees.map((employee) => {
        return {
            employeeId: employee.employeeId,
            firstName: employee.person.firstName,
            lastName: employee.person.lastName,
            phoneNumber: employee.person.phoneNumber,
            gender: employee.person.gender,
            userEmail: employee.userEmail,
            employmentDate: employee.employmentDate,
            dismissalDate: employee.dismissalDate ? employee.dismissalDate : "",
            position: employee.position,
            baseSalaryPerHour: employee.baseSalaryPerHour
        }
    });

    const onEditSubmit = async (values) => {
        await editEmployeeAction(values, dispatch);
        console.log(values);
    }

    return (
        <AdminTable editableColumns={editableColumns}
            showableColumns={Object.keys(mapping)}
            mapping={mapping}
            mappingInput={mappingInput}
            tableName={'Employees'}
            onEditSubmit={(values) => onEditSubmit(values)}
            onEditSuccess={() => console.log('success edit')}
            onDelete={(values) => console.log('delete', values)}
            onDeleteSuccess={() => console.log('delete')}
            onRowClick={(employeeId) => console.log(employeeId)}
            hasWritePrivilege={true}
            editValidationSchema={schema}
            searchableColumns={Object.keys(mapping)}
            objects={employees}
            isAddable={false}
            isDeletable={false}
        />
    )
}

export default AdminEmployeesTable
