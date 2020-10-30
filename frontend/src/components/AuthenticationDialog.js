import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

function AuthenticationDialog({ toggleDialog, open }) {
    const [isRegistration, setRegistration] = useState(false);

    const handleClose = () => {
        setRegistration(false);
        toggleDialog(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <RegistrationForm />
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary" disabled={isRegistration}>
                    Login
                </Button>
                <Button onClick={() => setRegistration(true)} color="secondary">
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    );
}

AuthenticationDialog.propTypes = {
    toggleDialog: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

export default AuthenticationDialog;