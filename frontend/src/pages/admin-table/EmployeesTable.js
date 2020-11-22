import React, { useContext, useEffect, useState } from 'react'
import AdminTable from "./AdminTable";
import * as yup from "yup";
import useFetch from '../../hooks/useFetch';
import { EMPLOYEES_SET_LOADING, EMPLOYEES_UNSET_LOADING } from '../../store/manager/employees/employeesActionTypes';
import fetchEmployeesAction from '../../actions/employees/fetchEmployeesAction';
import AppContext from '../../store/AppContext';
import { useHistory } from 'react-router-dom';

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

            setObjects(employees);

            setTimeout(() => dispatch({ type: EMPLOYEES_UNSET_LOADING }), 300);
        })()
    }, [state.employees.employees]);

    return (
        <AdminTable editableColumns={editableColumns}
            showableColumns={Object.keys(mapping)}
            mapping={mapping}
            mappingInput={mappingInput}
            tableName={'Employees'}
            onEditSubmit={(values) => console.log('edit', values)}
            onEditSuccess={() => console.log('success edit')}
            onDelete={(values) => console.log('delete', values)}
            onDeleteSuccess={() => console.log('delete')}
            // onRowClick={(employeeId) => history.push(`/${employeeId}`)}
            hasWritePrivilege={true}
            editValidationSchema={schema}
            searchableColumns={Object.keys(mapping)}
            objects={objects}
            isAddable={false}
        />
    )
}

export default AdminEmployeesTable
