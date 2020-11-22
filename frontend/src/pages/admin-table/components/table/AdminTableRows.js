import {TableCell, TableRow} from "@material-ui/core";
import React, {useContext} from "react";
import AdminTableContext from "../../../../contexts/AdminTableContext";
import AdminTableCell from "./AdminTableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";

const AdminTableRows = ({}) => {
    const {rows, showableColumns, searchValue, setEditRow, hasWritePrivilege, setDeleteRow, onRowClick, isDeletable} = useContext(AdminTableContext);

    const classes = useStyles({clickable: !!onRowClick})
    return <>
        {
            rows.map((row, i) => {
                return <TableRow key={i} className={classes.row} >
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
                            {
                                isDeletable ? <IconButton onClick={() => setDeleteRow(row)} >
                                    <DeleteIcon/>
                                </IconButton> : null
                            }
                        </TableCell> : null
                    }

                </TableRow>
            })
        }
        </>
}

const useStyles = makeStyles(() => ({
    row: props => props.clickable ? {
        '&:hover': {
            backgroundColor: '#eaeaea',
        },
        cursor: 'pointer',
    } : null
}));

export default AdminTableRows;