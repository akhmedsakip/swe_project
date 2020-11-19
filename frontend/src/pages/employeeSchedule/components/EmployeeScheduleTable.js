import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import withTableContent from '../../../components/hocs/withTableContent';
import Spinner from "../../../components/Spinner";
import EmployeeScheduleRow from './EmployeeScheduleRow';

const tableName = 'Manager: Employee Schedules';
const columnNames = ['ID', 'Email', 'First Name', 'Last Name', 'Gender', 'Birth Date', 'Phone Number', 'Country Code', 'City', 'Street', 'ZIP Code', 'Action']
const rows = [
    {
        ID: "1",
        Email: 'watson@gmail.com',
        FirstName: 'Emma',
        LastName: 'Watson',
        Gender: "Female",
        BirthDate: "21-10-1981",
        PhoneNumber: "8 777 888 99 00",
        CountryCode: "GBR",
        City: 'London',
        Street: 'Baker',
        ZIPCode: '010000',
    },
    {
        ID: "2",
        Email: 'watson2@gmail.com',
        FirstName: 'Emma2',
        LastName: 'Watson2',
        Gender: "Female",
        BirthDate: "21-10-1981",
        PhoneNumber: "8 777 888 99 02",
        CountryCode: "GBR",
        City: 'London',
        Street: 'Baker',
        ZIPCode: '010000',
    },
    {
        ID: "3",
        Email: 'watson3@gmail.com',
        FirstName: 'Emma3',
        LastName: 'Watson3',
        Gender: "Female",
        BirthDate: "21-10-1981",
        PhoneNumber: "8 777 888 99 03",
        CountryCode: "GBR",
        City: 'London',
        Street: 'Baker',
        ZIPCode: '010000',
    },
    {
        ID: "4",
        Email: 'watson4@gmail.com',
        FirstName: 'Emma4',
        LastName: 'Watson4',
        Gender: "Female",
        BirthDate: "21-10-1981",
        PhoneNumber: "8 777 888 99 04",
        CountryCode: "GBR",
        City: 'London',
        Street: 'Baker',
        ZIPCode: '010000',
    },
];

const EmployeeScheduleTable = () => {

    const data = rows;
    const loading = false;

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
                data.length && !loading ? data.map((row, i) => (
                    <EmployeeScheduleRow row={row} key={row.orderId} />
                )) : null
            }
            {
                !data.length && !loading ? <TableRow>
                    <TableCell colSpan={8} align={'center'}>
                        No data made yet
                    </TableCell>
                </TableRow> : null
            }
        </TableBody>

    );
}

export default withTableContent(EmployeeScheduleTable, tableName, columnNames);