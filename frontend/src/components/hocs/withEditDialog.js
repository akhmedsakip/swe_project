import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import EditForm from "../EditForm";

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

const withEditDialog = (EditDialog) => {

    const NewEditDialog = (props) => {
        const classes = useStyles();

        return (
            <>
                <EditDialog {...props}/>
                <Dialog classes={{paper: classes.root}} open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{props.name}</DialogTitle>
                    <DialogContent>
                        <EditForm closeDialog={props.onClose} labels={props.labels} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
    return NewEditDialog
}

export default withEditDialog;