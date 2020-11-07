import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, {useContext} from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {makeStyles} from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import AppContext from "../../store/AppContext";
import {
    AUTH_CLOSE_DIALOG,
    AUTH_OPEN_DIALOG,
    AUTH_SET_LOGIN,
    AUTH_SET_REGISTRATION
} from "../../store/auth/authActionTypes";

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

function AuthenticationDialog() {
    const {state, dispatch} = useContext(AppContext);
    const {isRegistration, isOpened} = state.auth;
    const classes = useStyles();

    return (
        <Dialog classes={{paper: classes.root}} open={isOpened} onClose={() => dispatch({type: AUTH_CLOSE_DIALOG})} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
                {isRegistration ? <RegistrationForm /> : <LoginForm />}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch({type: AUTH_CLOSE_DIALOG})} color="primary">
                    Cancel
                </Button>
                {
                    isRegistration ?
                        <Button onClick={() => dispatch({type: AUTH_SET_LOGIN})} color="secondary">
                            Login
                        </Button>
                        :
                        <Button onClick={() => dispatch({type: AUTH_SET_REGISTRATION})} color="secondary">
                            Register
                        </Button>
                }
            </DialogActions>
        </Dialog>
    );
}


export default AuthenticationDialog;