import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactToPrint from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";
import ReceiptPrint from "./ComponentPrint";
import TableRow from "@material-ui/core/TableRow";
import React, {useContext, useRef} from "react";
import ReservationsContext from "../../../contexts/ReservationsContext";
import PropTypes from 'prop-types';

const DesktopTableRow = ({row}) => {
    const {setDeletion} = useContext(ReservationsContext);
    const componentRef = useRef([]);

    return <TableRow>
        <TableCell align="center">{row.orderId}</TableCell>
        <TableCell align="center">{row.hotel}</TableCell>
        <TableCell align="center">{row.roomType}</TableCell>
        <TableCell align="center">{row.checkInDate}</TableCell>
        <TableCell align="center">{row.checkOutDate}</TableCell>
        <TableCell align="center">{row.orderDateTime}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">
            <IconButton onClick={() => setDeletion(true)}>
                <DeleteIcon />
            </IconButton>
            <ReactToPrint
                trigger={() => <IconButton><PrintIcon /></IconButton>}
                content={() => componentRef.current[row.ID]}
            />
            <div style={{display:'none'}}>
                <ReceiptPrint orderNo={row.orderId} hotel={row.hotel} roomType={row.roomType}
                              checkIn={row.checkInDate} checkOut={row.checkOutDate} reservation={row.orderDateTime}
                              ref={el => (componentRef.current[row.ID] = el)} />
            </div>
        </TableCell>
    </TableRow>
}

export default DesktopTableRow;

DesktopTableRow.propTypes = {
    row: PropTypes.shape({
        orderId: PropTypes.number.isRequired,
        hotel: PropTypes.string.isRequired,
        roomType: PropTypes.string.isRequired,
        checkInDate: PropTypes.string.isRequired,
        checkOutDate: PropTypes.string.isRequired,
        orderDateTime: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    })
}

