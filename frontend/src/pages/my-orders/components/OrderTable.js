import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    title: {
      flex: '1 1 100%',
      fontFamily: 'Staatliches'
    }
  });
  
const OrderTable = ({ data }) => {
    const classes = useStyles();
    
    return (
    <TableContainer component={Paper} variant="outlined">
        <Table className={classes.table} aria-label="simple table" >
        <TableHead>
        <TableRow>
        <TableCell>Order №</TableCell>
        <TableCell align="right">Hotel</TableCell>
        <TableCell align="right">Room Type</TableCell>
        <TableCell align="right">Check In</TableCell>
        <TableCell align="right">Check Out</TableCell>
        <TableCell align="right">Reservation</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        <TableRow key={data.orderNo}>
        <TableCell component="th" scope="row">
            {data.orderNo}
        </TableCell>
        <TableCell align="right">{data.hotel}</TableCell>
        <TableCell align="right">{data.roomType}</TableCell>
        <TableCell align="right">{data.checkIn}</TableCell>
        <TableCell align="right">{data.checkOut}</TableCell>
        <TableCell align="right">{data.reservation}</TableCell>
        </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
        );
}

export default OrderTable;