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

  const rows = [
    {
      Email: 'watson@gmail.com',
      FirstName: 'Emma',
      LastName: 'Watson',
      hotel: "Rixos Almaty",
      roomType: "Standard",
      checkInDate: "21-10-2020",
      checkOutDate: "30-10-2020",
      orderDateTime: "20-10-2020",
      status: 'Good',
      orderId: 1
    },
    {
      Email: 'watson1@gmail.com',
      FirstName: 'Emma1',
      LastName: 'Watson1',
      hotel: "Rixos Borovoe",
      roomType: "Luxe",
      checkInDate: "21-10-2020",
      checkOutDate: "30-10-2020",
      orderDateTime: "20-10-2020",
      status: 'bad idk',
      orderId: 2
    }
  ];

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
        rows.length && !loading ? rows.map((row, i) => (
          <DesktopTableRow row={row} key={row.orderId} />
        )) : null
      }
      {
        !rows.length && !loading ? <TableRow>
          <TableCell colSpan={8} align={'center'}>
            No reservations made yet
      </TableCell>
        </TableRow> : null
      }
    </TableBody>

  );
}

export default withTableContent(DesktopTable, tableName, columnNames);