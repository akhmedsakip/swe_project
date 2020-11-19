import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Dialog, DialogActions, DialogContentText, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

const withDeleteDialog = (DeleteDialog) => {

    const NewDeleteDialog = (props) => {
        const classes = useStyles();

        return (
            <>
            <DeleteDialog {...props}/>
            <Dialog classes={{ paper: classes.root }} open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.questionText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={props.onClose} color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
                </>
        )
    }
    return NewDeleteDialog
}

export default withDeleteDialog;