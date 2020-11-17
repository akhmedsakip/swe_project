import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { useContext } from 'react';
import withTableContent from '../../../components/hocs/withTableContent';
import Spinner from "../../../components/Spinner";
import AppContext from "../../../store/AppContext";
import DesktopTableRow from "./DesktopTableRow";

const tableName = 'My Orders';
const columnNames = ['Order ID', 'Hotel', 'Room Type', 'Check In', 'Check Out', 'Reservation Date', 'Status', 'Action']

const DesktopTable = () => {

  const { state } = useContext(AppContext)
  const { reservations, loading } = state.reservations;

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
        reservations.length && !loading ? reservations.map((row, i) => (
          <DesktopTableRow row={row} key={row.orderId} />
        )) : null
      }
      {
        !reservations.length && !loading ? <TableRow>
          <TableCell colSpan={8} align={'center'}>
            No reservations made yet
      </TableCell>
        </TableRow> : null
      }
    </TableBody>

  );
}

export default withTableContent(DesktopTable, tableName, columnNames);