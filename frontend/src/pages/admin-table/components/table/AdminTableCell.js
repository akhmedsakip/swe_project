import {TableCell} from "@material-ui/core";
import React, {useContext} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import AdminTableContext from "../../../../contexts/AdminTableContext";

const AdminTableCell = ({value, column}) => {
    const {searchValue, searchColumn} = useContext(AdminTableContext);
    const classes = useStyles();

    if(searchColumn !== 'all' && column !== searchColumn) {
        return <TableCell align="center" >
            {value}
        </TableCell>
    }

    const splitValues = value.split(searchValue);
    return <TableCell align="center">
        {splitValues.map((splitValue, i) =>
            splitValues.length - 1 === i ? <React.Fragment key={i}>
                    {splitValue}
                </React.Fragment> :
                <React.Fragment key={i}>
                    {splitValue}<span className={classes.found}>{searchValue}</span>
                </React.Fragment>)}
    </TableCell>
}

export default AdminTableCell;

const useStyles = makeStyles(() => ({
    found: {
        color: "red",
    }
}))


AdminTableCell.propTypes = {
    value: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
}