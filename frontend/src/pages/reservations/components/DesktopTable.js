import React, {useRef, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';
import ReservationsContext from '../../../contexts/ReservationsContext';
import { Toolbar, Typography } from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';
import ReceiptPrint from './ComponentPrint';
import ReactToPrint from "react-to-print";
import DesktopTableRow from "./DesktopTableRow";
import AppContext from "../../../store/AppContext";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    flex: '1 1 100%',
    fontWeight: 700,
    textTransform: 'uppercase',
  }
});



const DesktopTable = () => {

  const {state, dispatch} = useContext(AppContext)
  const {reservations, loading} = state.reservations;

  const classes = useStyles();
  return (
       
    <TableContainer component={Paper} variant="outlined">
      
      <Toolbar>
        <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
          My Orders
        </Typography>
      </Toolbar> 

      <Table className={classes.table} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell align="center">Hotel</TableCell>
            <TableCell align="center">Room Type</TableCell>
            <TableCell align="center">Check In</TableCell>
            <TableCell align="center">Check Out</TableCell>
            <TableCell align="center">Reservation Date</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((row, i) => (
            <DesktopTableRow row={row} key={row.orderDateTime + i} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DesktopTable;