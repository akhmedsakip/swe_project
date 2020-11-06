import React, {useContext, useEffect} from 'react';
import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import ReservationForm from "./ReservationForm";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import AvailabilityContext from "../../../contexts/availabilityContext";

const useStyles = makeStyles({
    root: {
        width: 500
    }
})

const ReservationDialog = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(AvailabilityContext);

    function onClose() {
        dispatch({type: 'deselectRoomType'});
    }
    useEffect(() => {
        console.log(state);
    }, [state])

    return <Dialog classes={{paper: classes.root}}
                   onClose={onClose}
                   open={!!state.roomType} aria-labelledby="form-dialog-title">
        <DialogTitle>Reserve a room</DialogTitle>
        <DialogContent>
            <ReservationForm/>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onClose()} color="primary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
};

export default ReservationDialog;