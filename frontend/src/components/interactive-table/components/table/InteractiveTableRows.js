import {TableCell, TableRow} from "@material-ui/core";
import React, {useContext} from "react";
import AdminTableContext from "../../../../contexts/AdminTableContext";
import InteractiveTableCell from "./InteractiveTableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";

const InteractiveTableRows = ({}) => {
    const {rows, showableColumns, searchValue, setEditRow, hasWritePrivilege, setDeleteRow, onRowClick, isDeletable, isEditable} = useContext(AdminTableContext);

    const showIconCell = hasWritePrivilege && (isEditable || isDeletable);

    const classes = useStyles({clickable: !!onRowClick})
    return <>
        {
            rows.map((row, i) => {
                return <TableRow key={i} className={classes.row} onClick={() => {onRowClick ? onRowClick(row) : console.log(' cannot click')}}>
                    {
                        showableColumns.map((column, j) => {
                            return <InteractiveTableCell key={`${i} ${j}`}
                                                         value={row[column] ? row[column].toString() : ''}
                                                         searchValue={searchValue}
                                                         column={column}/>
                        })
                    }
                    {
                        showIconCell ? <TableCell align="center">
                            {
                                isEditable ?
                                    <IconButton onClick={(event) => {
                                        event.stopPropagation();
                                        setEditRow(row)
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                    : null
                            }
                            {
                                hasWritePrivilege && isDeletable ? <IconButton onClick={(event) => {
                                    event.stopPropagation();
                                    setDeleteRow(row)
                                }} >
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

export default InteractiveTableRows;