import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useContext } from "react";
import AllReservationsContext from "../../../contexts/AllReservationsContext";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AppContext from "../../../store/AppContext";
import { WRITE_ALL_USERS } from "../../../store/user/userPrivelegesTypes";

const AllReservationsTableRow = ({ row }) => {
  const { setDeletion, setChangeReservation, handleEdit } = useContext(AllReservationsContext);
  const { state, dispatch } = useContext(AppContext);
  const { userInfo } = state.user;

  console.log(row);

  return <TableRow>
    <TableCell align="center">{row.reservation.orderId}</TableCell>
    <TableCell align="center">{row.person.firstName}</TableCell>
    <TableCell align="center">{row.person.lastName}</TableCell>
    <TableCell align="center">{row.person.phoneNumber}</TableCell>
    <TableCell align="center">{row.person.gender}</TableCell>
    <TableCell align="center">{row.reservation.hotel}</TableCell>
    <TableCell align="center">{row.reservation.roomType}</TableCell>
    <TableCell align="center">{row.reservation.checkInDate}</TableCell>
    <TableCell align="center">{row.reservation.checkOutDate}</TableCell>
    <TableCell align="center">{row.reservation.orderDateTime}</TableCell>
    <TableCell align="center">{row.reservation.orderPrice}</TableCell>
    <TableCell align="center">{row.reservation.status}</TableCell>

    <TableCell align="center">

      {userInfo.privileges.includes(WRITE_ALL_USERS)
        && <>
          <IconButton onClick={() => {
            handleEdit(row);
          }}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => setDeletion(true)}>
            <DeleteIcon />
          </IconButton>
        </>

      }

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

