import React, { useContext, useEffect, useState } from 'react'
import * as yup from "yup";
import { useHistory } from 'react-router-dom';
import AdminTable from '../admin-table/AdminTable';
import editEmployeeAction from '../../actions/employees/editEmployeeAction';
import AppContext from '../../store/AppContext';
import { EMPLOYEES_SET_LOADING, EMPLOYEES_UNSET_LOADING } from '../../store/manager/employees/employeesActionTypes';
import fetchEmployeesAction from '../../actions/employees/fetchEmployeesAction';

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

const Employees = () => {

    // const {loading, onSubmit, result, error} = useFetch();
    const { state, dispatch } = useContext(AppContext);
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
            employeeId: employee.employeeId ? employee.employeeId : "",
            firstName: employee.person.firstName ? employee.person.firstName : "",
            lastName: employee.person.lastName ? employee.person.lastName : "",
            phoneNumber: employee.person.phoneNumber ? employee.person.phoneNumber : "",
            gender: employee.person.gender ? employee.person.gender : "",
            userEmail: employee.userEmail ? employee.userEmail : "",
            employmentDate: employee.employmentDate ? employee.employmentDate : "",
            dismissalDate: employee.dismissalDate ? employee.dismissalDate : "",
            position: employee.position ? employee.position : "",
            baseSalaryPerHour: employee.baseSalaryPerHour ? employee.baseSalaryPerHour : ""
        }
    });

    const fetchEmployees = () => {
        fetchEmployeesAction(dispatch);
    }

    const onEditSubmit = (values, row) => {
        editEmployeeAction(
            {
                employeeId: row.employeeId,
                baseSalaryPerHour: parseInt(values.baseSalaryPerHour)
            },
            dispatch);
    }

    return (
        <AdminTable editableColumns={editableColumns}
            showableColumns={Object.keys(mapping)}
            mapping={mapping}
            mappingInput={mappingInput}
            tableName={'Employees'}
            onEditSubmit={onEditSubmit}
            onEditSuccess={fetchEmployees}
            onRowClick={(employee) => history.push(`${history.location.pathname}?employeeId=${employee.employeeId}`)}
            hasWritePrivilege={true}
            editValidationSchema={schema}
            searchableColumns={Object.keys(mapping)}
            objects={employees}
            isAddable={false}
            isDeletable={false}
        />
    )
}

export default Employees
