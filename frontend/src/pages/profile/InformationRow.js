import React, {useContext} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextFieldWithError from "../../shared/TextFieldWithError";
import ProfileContext from "../../contexts/profileContext";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        height: 60,
        borderBottom: '1px solid rgba(191, 191, 191, 0.7)',
    },
    column: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
        fontSize: 12,
        fontFamily: theme.typography.body1.fontFamily,
        fontWeight: theme.typography.fontWeightLight,
    },
    label: {
        color: 'rgba(0, 0, 0, 0.5)'
    },
    value: {
        textAlign: 'right'
    },
    input: {
        '& .MuiInputBase-root ': {
            fontSize: 12,
            fontFamily: theme.typography.body1.fontFamily,
            fontWeight: theme.typography.fontWeightLight,
        },
        '& .Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.87)',
        },
        '& input': {
            textAlign: 'right',
        }
    }
}));

const InformationRow = ({label, value, name, children}) => {
    const classes = useStyles();
    const {editing, handleChange, values, errors} = useContext(ProfileContext);
    return <div className={classes.root} >
        <div className={`${classes.column} ${classes.label}`}>
            {label}
        </div>
        <div className={`${classes.column} ${classes.value}`}>
            {
                <div>
                    {children ? children :
                        <TextField
                            className={classes.input}
                            value={values[name]}
                            onChange={handleChange(name)}
                            name={name}
                            fullWidth
                            type="text"
                            errorMessage={errors[name]}
                            error={errors[name]}
                            disabled={!editing}
                            InputProps={{ disableUnderline: !editing }}
                        />
                    }
                </div>

            }
        </div>
    </div>
};

InformationRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default InformationRow;