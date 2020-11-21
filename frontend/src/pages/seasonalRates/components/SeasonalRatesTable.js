import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import withTableContent from '../../../components/hocs/withTableContent';
import Spinner from "../../../components/Spinner";
import SeasonalRatesRow from './SeasonalRatesRow';

const tableName = 'Manager: Seasonal Rates';
const columnNames = ['ID', 'Name', 'Start Date', 'End Date', 'Coefficient', 'Action']
const rows = [
    {
        ID: "1",
        Name: 'Winter',
        StartDate: "01-12-1980",
        EndDate: "28-02-1981",
        Coefficient: '1.2',
    },
    {
        ID: "2",
        Name: 'Spring',
        StartDate: "01-03-1981",
        EndDate: "30-05-1981",
        Coefficient: '1.5',
    },
    {
        ID: "3",
        Name: 'Summer',
        StartDate: "01-06-1981",
        EndDate: "31-08-1981",
        Coefficient: '2.0',
    },
    {
        ID: "4",
        Name: 'Autumn',
        StartDate: "01-09-1981",
        EndDate: "31-11-1981",
        Coefficient: '1.3',
    },
];

const SeasonalRatesTable = ({ searchTerm }) => {

    const data = rows;
    const loading = false;

    searchTerm = searchTerm.toLocaleLowerCase();

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
                    row.Name.toLocaleLowerCase().includes(searchTerm) ?
                        <SeasonalRatesRow row={row} key={row.orderId} />
                        : null
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

export default withTableContent(SeasonalRatesTable, tableName, columnNames);