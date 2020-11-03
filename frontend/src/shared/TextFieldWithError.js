import React from "react";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    marginBottom8: {
        marginBottom: 8
    }
});

function TextFieldWithError({errorMessage, ...other}) {
    const classes = useStyles();
    return (<React.Fragment>
        <TextField {...other}/>
        {other.error ? <FormHelperText className={classes.marginBottom8} error>{errorMessage}</FormHelperText> : null}
    </React.Fragment>)
}

TextFieldWithError.propTypes = {
    ...TextField.propTypes,
    errorMessage: PropTypes.string
};

export default TextFieldWithError;