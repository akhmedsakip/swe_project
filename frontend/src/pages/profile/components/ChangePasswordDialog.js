import React from 'react';
import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types'
import DialogContent from "@material-ui/core/DialogContent";
import ChangePasswordForm from "./ChangePasswordForm";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

const ChangePasswordDialog = ({onClose, open}) => {
    const classes = useStyles();
    return <Dialog classes={{paper: classes.root}} open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
        <DialogContent>
            <ChangePasswordForm closeDialog={onClose} />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="secondary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
};

ChangePasswordDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ChangePasswordDialog;