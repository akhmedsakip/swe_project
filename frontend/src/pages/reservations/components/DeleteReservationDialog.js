import React, {useContext} from 'react';
import { Dialog, DialogActions, DialogContentText, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types'
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../../store/AppContext";
import deleteReservationAction from "../../../actions/reservations/deleteReservationAction";
import {RESERVATIONS_SET_LOADING, RESERVATIONS_UNSET_LOADING} from "../../../store/reservations/reservationActionTypes";
import fetchReservationsAction from "../../../actions/reservations/fetchReservationsAction";

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

const DeleteReservationDialog = ({ onClose, open }) => {
    const classes = useStyles();
    const {state, dispatch} = useContext(AppContext);
    const {reservationToDelete} = state.reservations;

    const onConfirmClick = async () => {
        await deleteReservationAction(dispatch, {orderId: reservationToDelete});
        onClose();
        await (async function () {
            dispatch({type: RESERVATIONS_SET_LOADING});
            await fetchReservationsAction(dispatch);
            setTimeout(() => dispatch({type: RESERVATIONS_UNSET_LOADING}), 300);
        })()
    }

    return <Dialog classes={{ paper: classes.root }} open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Order</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Do you confirm cancellation of your room order? It cannot be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
          </Button>
            <Button onClick={onConfirmClick} color="secondary" autoFocus>
                Confirm
          </Button>
        </DialogActions>
    </Dialog>
};

DeleteReservationDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default DeleteReservationDialog;