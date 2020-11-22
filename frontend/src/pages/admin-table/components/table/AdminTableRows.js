import {TableCell, TableRow} from "@material-ui/core";
import React, {useContext} from "react";
import AdminTableContext from "../../../../contexts/AdminTableContext";
import AdminTableCell from "./AdminTableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const AdminTableRows = ({}) => {
    const {rows, showableColumns, searchValue, setEditRow, hasWritePrivilege} = useContext(AdminTableContext);
    return <>
        {
            rows.map((row, i) => {
                return <TableRow key={i} >
                    {
                        showableColumns.map((column, j) => {
                            return <AdminTableCell key={`${i} ${j}`} value={row[column].toString()} searchValue={searchValue} column={column}/>
                        })
                    }
                    {
                        hasWritePrivilege ? <TableCell align="center">
                            <IconButton onClick={() => {
                                setEditRow(row)
                            }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell> : null
                    }

                </TableRow>
            })
        }
        </>
}

export default AdminTableRows;