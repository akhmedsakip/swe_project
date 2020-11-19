import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {useContext} from "react";
import EmployeeScheduleContext from "../../../contexts/EmployeeScheduleContext";
import EditIcon from "@material-ui/icons/Edit";

const EmployeeScheduleRow = ({ row }) => {
    const {setDeletion, setChangeEmployee} = useContext(EmployeeScheduleContext);

    return <TableRow>
        {Object.keys(row).map((cell)=>
            <TableCell align="center">{row[cell]}</TableCell>
        )}
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
