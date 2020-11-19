import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import withTableContent from '../../../components/hocs/withTableContent';
import Spinner from "../../../components/Spinner";
import AllReservationsTableRow from './AllReservationsTableRow';

const tableName = 'Manager: All reservations';
const columnNames = ['Order ID', 'Email', 'First Name', 'Last Name', 'Hotel', 'Room Type', 'Check In', 'Check Out', 'Reservation Date', 'Status', 'Action']
const rows = [{HotelId: "1", Email: 'watson@gmail.com', FirstName: 'Emma', LastName: 'Watson', hotel: "Rixos Almaty", roomType: "Standard", checkInDate: "21-10-2020", checkOutDate: "30-10-2020", orderDateTime: "20-10-2020", status: 'Good',}, { HotelId: "2", Email: 'watson1@gmail.com', FirstName: 'Emma1', LastName: 'Watson1', hotel: "Rixos Borovoe", roomType: "Luxe", checkInDate: "21-10-2020", checkOutDate: "30-10-2020", orderDateTime: "20-10-2020", status: 'bad idk', }];

const AllDataTable = () => {

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
          <AllReservationsTableRow row={row} key={row.orderId} />
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

export default withTableContent(AllDataTable, tableName, columnNames);