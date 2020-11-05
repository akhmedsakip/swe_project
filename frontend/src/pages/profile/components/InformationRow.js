import React, {useContext} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextFieldWithError from "../../../shared/TextFieldWithError";
import ProfileContext from "../../../contexts/profileContext";
import TextField from "@material-ui/core/TextField";
import useTheme from "@material-ui/core/styles/useTheme";
import {useMediaQuery} from "@material-ui/core";

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
        flexDirection: 'column',
        fontSize: ({isMobileScreen}) => isMobileScreen ? 17 : 12,
        fontFamily: theme.typography.body1.fontFamily,
        fontWeight: theme.typography.fontWeightLight,
    },
    label: {
        color: 'rgba(0, 0, 0, 0.5)',
        flex: 2,
    },
    value: {
        flex: 4,
        textAlign: 'right'
    },
    input: {
        '& .MuiInputBase-root ': {
            fontSize: ({isMobileScreen}) => isMobileScreen ? 17 : 12,
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

const InformationRow = ({label, name, children}) => {
    const theme = useTheme();
    const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles({isMobileScreen});
    const {editing, formik} = useContext(ProfileContext);
    const {handleChange, values, errors} = formik;
    return <div className={classes.root} >
        <div className={`${classes.column} ${classes.label}`}>
            {label}
        </div>
        <div className={`${classes.column} ${classes.value}`}>
            {
                <div className={classes.input}>
                    {children ? children :
                        <TextField
                            value={values[name]}
                            onChange={handleChange(name)}
                            name={name}
                            type="text"
                            error={!!errors[name]}
                            disabled={!editing}
                            InputProps={{ disableUnderline: !editing }}
                            fullWidth
                        />
                    }
                </div>

            }
        </div>
    </div>
};

InformationRow.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default InformationRow;