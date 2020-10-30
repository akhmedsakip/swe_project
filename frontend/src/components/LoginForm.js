import {DialogContent, DialogContentText, TextField} from "@material-ui/core";
import React from "react";

function LoginForm() {
    return (
        <DialogContent>
            <DialogContentText>
                To log-in to this website, please enter your email address and password here.
                If you do not have an Amita Hotels account, please register.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
            />
        </DialogContent>
    );
}

export default LoginForm;