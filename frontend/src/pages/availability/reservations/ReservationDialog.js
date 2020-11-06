import React from 'react';
import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import ReservationForm from "./ReservationForm";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: 500
    }
})

const ReservationDialog = () => {
    const classes = useStyles();
    return <Dialog classes={{paper: classes.root}} open={false} aria-labelledby="form-dialog-title">
        <DialogTitle>Reserve a room</DialogTitle>
        <DialogContent>
            <ReservationForm/>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => console.log('clicked')} color="primary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
};

export default ReservationDialog;