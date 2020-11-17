import React from 'react';
import { Dialog, DialogActions, DialogContentText, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types'
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

const DeleteReservationDialog = ({ onClose, open }) => {
    const classes = useStyles();
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
            <Button onClick={onClose} color="secondary" autoFocus>
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