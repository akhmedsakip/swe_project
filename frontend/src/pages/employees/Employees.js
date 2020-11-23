import React, {useContext, useEffect, useRef, useState} from 'react'
import * as yup from "yup";
import { useHistory } from 'react-router-dom';
import InteractiveTable from '../../components/interactive-table/InteractiveTable';
import editEmployeeAction from '../../actions/employees/editEmployeeAction';
import AppContext from '../../store/AppContext';
import {
    INTERACTIVE_TABLE_SET_LOADING,
    INTERACTIVE_TABLE_UNSET_LOADING
} from "../../store/interactive-table/interactiveTableActionTypes";
import fetchEmployeesAction from '../../actions/employees/fetchEmployeesAction';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import {READ_ALL_SCHEDULES, WRITE_ALL_EMPLOYEES} from "../../store/user/userPrivelegesTypes";

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

const mappingInput = {
    "baseSalaryPerHour": "text"
}

const schema = yup.object().shape({
    baseSalaryPerHour: yup.string().required("Base Salary Per Hour is empty")
        .test('num', 'Base Salary should be number', (val) => !isNaN(parseInt(val))),
});

const Employees = () => {

    const timeout = useRef(0);
    const { state, dispatch } = useContext(AppContext);
    const history = useHistory();
    const [employees, setEmployees] = useState([])
    const {employees: rawEmployees} = state.employees;
    const {userInfo} = state.user;
    const classes = useStyles();

    useEffect(() => {
        fetchEmployees();
        return () => clearTimeout(timeout.current);
    }, []);

    useEffect(() => {
        setEmployees(rawEmployees.map(({person, ...other}) => ({...person, ...other})));
    }, [rawEmployees])

    const fetchEmployees = async () => {
        dispatch({ type: INTERACTIVE_TABLE_SET_LOADING });
        await fetchEmployeesAction(dispatch);
        timeout.current = setTimeout(() => dispatch({ type: INTERACTIVE_TABLE_UNSET_LOADING }), 500);
    }

    const onEditSubmit = async (values, row) => {
        await editEmployeeAction(
            {
                employeeId: row.employeeId,
                baseSalaryPerHour: parseInt(values.baseSalaryPerHour)
            },
            dispatch);
    }

    return (
        <Box className={classes.root} display={'flex'} flexDirection={'column'} alignItems='center'>
            <InteractiveTable editableColumns={editableColumns}
                              showableColumns={Object.keys(mapping)}
                              mapping={mapping}
                              mappingInput={mappingInput}
                              tableName={'Employees'}
                              isEditable={true}
                              onEditSubmit={onEditSubmit}
                              onEditSuccess={fetchEmployees}
                              onRowClick={userInfo?.privileges?.includes(READ_ALL_SCHEDULES)?(({employeeId}) =>
                                  history.push(`/employees-working-days/${employeeId}`)) : null}
                              hasWritePrivilege={userInfo?.privileges?.includes(WRITE_ALL_EMPLOYEES)}
                              editValidationSchema={schema}
                              searchableColumns={Object.keys(mapping)}
                              objects={employees}
                              isAddable={false}
                              isDeletable={false}
            />
        </Box>
    )
}

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        padding: 16,
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`
    },
})

export default Employees
