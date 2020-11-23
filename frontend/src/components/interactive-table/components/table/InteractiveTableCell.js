import {TableCell} from "@material-ui/core";
import React, {useContext} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import AppContext from "../../../../store/AppContext";

const InteractiveTableCell = ({value, column}) => {
    const {state} = useContext(AppContext);
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

export default InteractiveTableCell;

const useStyles = makeStyles(() => ({
    found: {
        color: "red",
    },
    cell: {
        width: '100%',
        maxHeight: 80,
        overflowY: 'auto',
        maxWidth: 400,
    }
}))


InteractiveTableCell.propTypes = {
    value: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
}