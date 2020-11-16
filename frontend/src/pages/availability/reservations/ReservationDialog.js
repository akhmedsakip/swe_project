<<<<<<< HEAD
import React, {useContext, useEffect} from 'react';
import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import ReservationForm from "./ReservationForm";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {AVAILABILITY_UNSET_ROOM_TYPE} from "../../../store/availability/availabilityActionTypes";
import AppContext from "../../../store/AppContext";

const useStyles = makeStyles({
    root: {
        width: 500
    }
})

const ReservationDialog = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(AppContext);
    const {roomType} = state.availability;

    function onClose() {
        dispatch({type: AVAILABILITY_UNSET_ROOM_TYPE});
    }

    return <Dialog classes={{paper: classes.root}}
                   onClose={onClose}
                   open={!!roomType} aria-labelledby="form-dialog-title">
        <DialogTitle>Reserve a room</DialogTitle>
        <DialogContent>
            <ReservationForm/>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
};

=======
import React, {useContext, useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogTitle, Icon, SvgIcon, Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import ReservationForm from "./ReservationForm";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {AVAILABILITY_UNSET_ROOM_TYPE} from "../../../store/availability/availabilityActionTypes";
import AppContext from "../../../store/AppContext";
import FormHelperText from "@material-ui/core/FormHelperText";
import {CheckCircleOutline} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import ReservationSuccess from "./ReservationSuccess";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 500
    }
}))

const ReservationDialog = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(AppContext);
    const [success, setSuccess] = useState(false);
    const {roomType} = state.availability;
    const { loggedIn } = state.user;

    function onClose() {
        dispatch({type: AVAILABILITY_UNSET_ROOM_TYPE});
    }

    useEffect(() => {
        setSuccess(false);
    }, [roomType])

    return <Dialog classes={{paper: classes.root}}
                   onClose={onClose}
                   open={!!roomType} aria-labelledby="form-dialog-title">
        <DialogTitle>Reserve a room</DialogTitle>
        <DialogContent>
            { success ? <ReservationSuccess /> : null}
            {
                loggedIn && !success ? <ReservationForm setSuccess={() => setSuccess(true)}/> : null
            }
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
};

>>>>>>> f9ff2b1c20937275384526ff481c6774c5a2fc29
export default ReservationDialog;