import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {useContext} from "react";
import AllReservationsContext from "../../../contexts/AllReservationsContext";
import EditIcon from "@material-ui/icons/Edit";

const AllReservationsTableRow = ({ row }) => {
  const {setDeletion, setChangeReservation
    // , editing, setEditing, formik, loading
  } = useContext(AllReservationsContext);

  return <TableRow>
    {Object.keys(row).map((cell)=>
      <TableCell align="center">{row[cell]}</TableCell>
    )}
    <TableCell align="center">
      <IconButton onClick={() => {
        setChangeReservation(true);
      }}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => setDeletion(true)}>
        <DeleteIcon />
      </IconButton>
      {/*<Button variant="outlined" color="secondary" className={`${classes.button} ${classes.marginBottom12}`}*/}
      {/*        onClick={() => {*/}
      {/*          setChangePassword(true);*/}
      {/*        }}>*/}
      {/*  <EditIcon fontSize={"inherit"}/>*/}
      {/*</Button>*/}
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
