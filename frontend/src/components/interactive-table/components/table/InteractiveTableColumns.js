import {TableCell, TableRow} from "@material-ui/core";
import React, {useContext} from "react";
import AdminTableContext from "../../../../contexts/AdminTableContext";
import {makeStyles} from "@material-ui/core/styles";

const InteractiveTableColumns = () => {
    const {mapping, showableColumns, hasWritePrivilege, isEditable, isDeletable} = useContext(AdminTableContext);
    const classes = useStyles();
    const showIconCell = hasWritePrivilege && (isEditable || isDeletable);
    return <TableRow>
        {showableColumns.map((column) => {
            return <TableCell align="center" key={column} className={classes.rowName}>
                {mapping[column]}
            </TableCell>
        })}
        {
            showIconCell ? <TableCell align="center" className={classes.rowName}>
                Actions
            </TableCell> : null
        }

    </TableRow>
}

const useStyles = makeStyles(() => ({
    rowName: {
        minWidth: 150,
        fontWeight: 700,
    },
}))

export default InteractiveTableColumns;