import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useContext } from "react";
import EmployeeScheduleContext from "../../../contexts/EmployeeScheduleContext";
import EditIcon from "@material-ui/icons/Edit";

const EmployeeScheduleRow = ({ row }) => {
    const { setDeletion, setChangeEmployee } = useContext(EmployeeScheduleContext);

    return <TableRow>
        <TableCell align="center">{row.employeeId}</TableCell>
        <TableCell align="center">{row.person.firstName}</TableCell>
        <TableCell align="center">{row.person.lastName}</TableCell>
        <TableCell align="center">{row.person.phoneNumber}</TableCell>
        <TableCell align="center">{row.userEmail}</TableCell>
        <TableCell align="center">{row.person.gender}</TableCell>
        <TableCell align="center">{row.employmentDate}</TableCell>
        <TableCell align="center">{row.dismissalDate}</TableCell>
        <TableCell align="center">{row.position}</TableCell>
        <TableCell align="center">{row.baseSalaryPerHour}</TableCell>


        <TableCell align="center">
            <IconButton onClick={() => {
                setChangeEmployee(true);
            }}>
                <EditIcon />
            </IconButton>
            <IconButton onClick={() => setDeletion(true)}>
                <DeleteIcon />
            </IconButton>
        </TableCell>
    </TableRow>
}

export default EmployeeScheduleRow;
