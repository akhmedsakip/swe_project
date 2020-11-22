import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { useContext } from 'react';
import withTableContent from '../../../components/hocs/withTableContent';
import Spinner from "../../../components/Spinner";
import AppContext from '../../../store/AppContext';
import EmployeeScheduleRow from './EmployeeScheduleRow';

const tableName = 'Manager: Employee Schedules';
const columnNames = ['Employee ID', 'First Name', 'Last Name', 'Phone Number', 'Email', 'Gender', 'Employment Date', 'Dissmisal Date', 'Position', 'Base Salary/Hour']

const EmployeeScheduleTable = ({ searchTerm }) => {

    searchTerm = searchTerm.toLocaleLowerCase();
    const { state } = useContext(AppContext)
    const { employees, loading } = state.employees;
    console.log(employees);

    return (
        <TableBody>
            {
                loading ? <TableRow>
                    <TableCell colSpan={8} align={'center'}>
                        <Spinner size={'big'} />
                    </TableCell>
                </TableRow> : null
            }
            {
                employees.length && !loading ? employees.map((row, i) => (
                    // row.employeeId.toLocaleLowerCase().includes(searchTerm)
                    //     || row.person.firstName.toLocaleLowerCase().includes(searchTerm)
                    //     || row.person.lastName.toLocaleLowerCase().includes(searchTerm)
                         row.userEmail.toLocaleLowerCase().includes(searchTerm) ?
                        <EmployeeScheduleRow row={row} key={row.orderId} />
                        : null
                )) : null
            }
            {
                !employees.length && !loading ? <TableRow>
                    <TableCell colSpan={8} align={'center'}>
                        No data made yet
                    </TableCell>
                </TableRow> : null
            }
        </TableBody>

    );
}

export default withTableContent(EmployeeScheduleTable, tableName, columnNames);