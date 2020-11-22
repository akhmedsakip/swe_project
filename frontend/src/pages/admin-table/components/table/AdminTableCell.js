import {TableCell} from "@material-ui/core";
import React, {useContext} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import AdminTableContext from "../../../../contexts/AdminTableContext";
import ReactToPrint from "react-to-print";
import AppContext from "../../../../store/AppContext";

const AdminTableCell = ({value, column}) => {
    const {state, dispatch} = useContext(AppContext);
    const {searchColumn, searchValue} = state.adminTable;
    const classes = useStyles();

    if(searchColumn !== 'all' && column !== searchColumn) {
        return <TableCell align="center" >
            <div className={classes.cell}>
                {value}
            </div>
        </TableCell>
    }

    const splitValues = value.split(searchValue);
    return <TableCell align="center">
        <div className={classes.cell}>
        {splitValues.map((splitValue, i) =>
            splitValues.length - 1 === i ?
                    (<React.Fragment key={i}>
                        {splitValue}
                    </React.Fragment>) :
                    <React.Fragment key={i}>
                        {splitValue}<span className={classes.found}>{searchValue}</span>
                    </React.Fragment>)}
        </div>
    </TableCell>
}

export default AdminTableCell;

const useStyles = makeStyles(() => ({
    found: {
        color: "red",
    },
    cell: {
        width: '100%',
        maxHeight: 40,
        overflowY: 'scroll',
    }
}))


AdminTableCell.propTypes = {
    value: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
}