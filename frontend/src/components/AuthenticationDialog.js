import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

function AuthenticationDialog({ onClose, open }) {
    const [isRegistration, setIsRegistration] = useState(false);
    useEffect(() => {
        if(open === true) {
            setIsRegistration(false);
        }
    }, [open]);
    const classes = useStyles();

    return (
        <Dialog classes={{paper: classes.root}} open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            {isRegistration ? <RegistrationForm /> : <LoginForm/>}
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                {
                    isRegistration ?
                        <Button onClick={() => setIsRegistration(false)} color="secondary">
                            Login
                        </Button>
                        :
                        <Button onClick={() => setIsRegistration(true)} color="secondary">
                            Register
                        </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

AuthenticationDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default AuthenticationDialog;