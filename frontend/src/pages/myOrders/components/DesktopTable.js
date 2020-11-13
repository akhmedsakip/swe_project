import React, {useRef, useContext } from 'react';
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
import MyOrderContext from '../../../contexts/MyOrdersContext';
import { Toolbar, Typography } from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';
import ReceiptPrint from './ComponentPrint';
import ReactToPrint from "react-to-print";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    flex: '1 1 100%',
    fontFamily: 'Staatliches'
  }
});



const DesktopTable = ({ data }) => {

  const { setDeletion } = useContext(MyOrderContext);
  const classes = useStyles();
  const componentRef = useRef([]);
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
            <TableCell>Order №</TableCell>
            <TableCell align="right">Hotel</TableCell>
            <TableCell align="right">Room Type</TableCell>
            <TableCell align="right">Check In</TableCell>
            <TableCell align="right">Check Out</TableCell>
            <TableCell align="right">Reservation</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.ID}>
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.Hotel}</TableCell>
              <TableCell align="right">{row.RoomType}</TableCell>
              <TableCell align="right">{row.CheckInDate}</TableCell>
              <TableCell align="right">{row.CheckOutDate}</TableCell>
              <TableCell align="right">{row.ReservationDate}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => setDeletion(true)}>
                  <DeleteIcon />
                </IconButton>
                <ReactToPrint
                  trigger={() => <IconButton><PrintIcon /></IconButton>}
                  content={() => componentRef.current[row.ID]}
                />
                <div style={{display:'none'}}>
                  <ReceiptPrint orderNo={row.ID} hotel={row.Hotel} roomType={row.RoomType} checkIn={row.CheckInDate} checkOut={row.CheckOutDate} reservation={row.ReservationDate} ref={el => (componentRef.current[row.ID] = el)} />
                </div> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DesktopTable;