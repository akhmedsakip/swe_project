import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppContext from '../../../store/AppContext';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const rows = [
  {
    Hotel: "Rixos Almaty", 
    RoomType: "Standard",
    CheckInDate: "21-10-2020",
    CheckOutDate: "30-10-2020",
    ReservationDate: "20-10-2020",
    ID: "1"
  }
];

const MyOrdersTable = () => {
  const classes = useStyles();

  const { state, dispatch } = useContext(AppContext);
  const { userInfo } = state.user;

  console.log(userInfo);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hotel</TableCell>
            <TableCell align="right">Room Type</TableCell>
            <TableCell align="right">Check In</TableCell>
            <TableCell align="right">Check Out</TableCell>
            <TableCell align="right">Reservation</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.Hotel}
              </TableCell>
              <TableCell align="right">{row.RoomType}</TableCell>
              <TableCell align="right">{row.CheckInDate}</TableCell>
              <TableCell align="right">{row.CheckOutDate}</TableCell>
              <TableCell align="right">{row.ReservationDate}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => dispatch({type: 'DELETE_ORDER', payload: row.ID})}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyOrdersTable;