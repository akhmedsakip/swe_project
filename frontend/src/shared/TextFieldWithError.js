import React from "react";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";


function TextFieldWithError({errorMessage, ...other}) {
    return (<React.Fragment>
        <TextField {...other}/>
        {other.error ? <FormHelperText error>{errorMessage}</FormHelperText> : null}
    </React.Fragment>)
}

TextFieldWithError.propTypes = {
    ...TextField.propTypes,
    errorMessage: PropTypes.string
};

export default TextFieldWithError;