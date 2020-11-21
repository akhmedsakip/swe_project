import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { useContext } from 'react';
import withTableContent from '../../../components/hocs/withTableContent';
import Spinner from "../../../components/Spinner";
import AppContext from '../../../store/AppContext';
import AllReservationsTableRow from './AllReservationsTableRow';

const tableName = 'Manager: All reservations';
const columnNames = ['Order ID', 'Email', 'First Name', 'Last Name', 'Hotel', 'Room Type', 'Check In', 'Check Out', 'Reservation Date', 'Status', 'Action']

const AllDataTable = ({ searchTerm }) => {

  searchTerm = searchTerm.toLocaleLowerCase();

  const { state } = useContext(AppContext)
  const { allReservations, loading } = state.allReservations;

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
        allReservations.length && !loading ? allReservations.map((row, i) => (
          row.FirstName.toLocaleLowerCase().includes(searchTerm)
            || row.LastName.toLocaleLowerCase().includes(searchTerm)
            || row.Email.toLocaleLowerCase().includes(searchTerm) ?
            <AllReservationsTableRow row={row} key={row.orderId} />
            : null
        )) : null
      }
      {
        !allReservations.length && !loading ? <TableRow>
          <TableCell colSpan={8} align={'center'}>
            No data made yet
      </TableCell>
        </TableRow> : null
      }
    </TableBody>
  );
}

export default withTableContent(AllDataTable, tableName, columnNames);