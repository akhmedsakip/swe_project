import React, {useContext, useEffect} from 'react';
import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import ReservationForm from "./ReservationForm";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {AVAILABILITY_UNSET_ROOM_TYPE} from "../../../store/availability/availabilityActionTypes";
import AppContext from "../../../store/AppContext";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles({
    root: {
        width: 500
    }
})

const ReservationDialog = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(AppContext);
    const {roomType} = state.availability;
    const { loggedIn } = state.user;

    function onClose() {
        dispatch({type: AVAILABILITY_UNSET_ROOM_TYPE});
    }

    return <Dialog classes={{paper: classes.root}}
                   onClose={onClose}
                   open={!!roomType} aria-labelledby="form-dialog-title">
        <DialogTitle>Reserve a room</DialogTitle>
        <DialogContent>
            {
                loggedIn ? <ReservationForm/> : <FormHelperText error>{"Please, log in to make a reservation"}</FormHelperText>
            }
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
};

export default ReservationDialog;