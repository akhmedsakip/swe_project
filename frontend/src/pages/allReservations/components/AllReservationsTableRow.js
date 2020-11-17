import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

const AllReservationsTableRow = ({ row }) => {

  return <TableRow>
    <TableCell align="center">{row.Email}</TableCell>
    <TableCell align="center">{row.FirstName}</TableCell>
    <TableCell align="center">{row.LastName}</TableCell>
    <TableCell align="center">{row.hotel}</TableCell>
    <TableCell align="center">{row.HotelId}</TableCell>
    <TableCell align="center">{row.roomType}</TableCell>
    <TableCell align="center" >{row.checkInDate}</TableCell>
    <TableCell align="center">{row.checkOutDate}</TableCell>
    <TableCell align="center">{row.orderDateTime}</TableCell>
    <TableCell align="center">{row.status}</TableCell>

    <TableCell align="center">
      <IconButton >
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
}

export default AllReservationsTableRow;

// DesktopTableRow.propTypes = {
//     row: PropTypes.shape({
//         orderId: PropTypes.number.isRequired,
//         hotel: PropTypes.string.isRequired,
//         roomType: PropTypes.string.isRequired,
//         checkInDate: PropTypes.string.isRequired,
//         checkOutDate: PropTypes.string.isRequired,
//         orderDateTime: PropTypes.string.isRequired,
//         status: PropTypes.string.isRequired,
//     })
// }

