import React, {useRef, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Toolbar, Typography } from '@material-ui/core';
import DesktopTableRow from "./DesktopTableRow";
import AppContext from "../../../store/AppContext";
import {Box} from "@material-ui/core";
import Spinner from "../../../components/Spinner";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    flex: '1 1 100%',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  topBar: {
    borderBottom: '1px solid black'
  }
});



const DesktopTable = () => {

  const {state, dispatch} = useContext(AppContext)
  const {reservations, loading} = state.reservations;

  const classes = useStyles();
  return (
       
    <TableContainer component={Paper} variant="outlined">
      
      <Toolbar className={classes.topBar}>
        <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
          My Orders
        </Typography>
      </Toolbar>

      <Table className={classes.table} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell align="center">Order ID</TableCell>
            <TableCell align="center">Hotel</TableCell>
            <TableCell align="center">Room Type</TableCell>
            <TableCell align="center">Check In</TableCell>
            <TableCell align="center">Check Out</TableCell>
            <TableCell align="center">Reservation Date</TableCell>
            <TableCell align="center">Order Price</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            loading ? <TableRow>
              <TableCell colSpan={9} align={'center'}>
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
              <TableCell colSpan={9} align={'center'}>
                No reservations made yet
              </TableCell>
            </TableRow> : null
          }


        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DesktopTable;