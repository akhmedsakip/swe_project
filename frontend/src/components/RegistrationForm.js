import {DialogContent, DialogContentText, TextField} from "@material-ui/core";
import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

function RegistrationForm() {
    return (
        <DialogContent>
            <DialogContentText>
                To log-in to this website, please enter your email address and password here.
                If you do not have an Amita Hotels account, please register.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email"
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
            <TextField
                autoFocus
                margin="dense"
                id="dateOfBirth"
                label="Date Of Birth"
                type="date"
                fullWidth
            />
            <FormControl>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
            </FormControl>
        </DialogContent>
    );
}

export default RegistrationForm;