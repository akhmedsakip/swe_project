import {Dialog, DialogActions, DialogContentText, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import React, {useContext, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AdminTableContext from "../../../../contexts/AdminTableContext";
import useFetch from "../../../../hooks/useFetch";
import LoadingButton from "../../../../components/LoadingButton";

const DeleteDialog = () => {
    const { deleteRow, setDeleteRow, onDelete, onDeleteSuccess } = useContext(AdminTableContext);
    const classes = useStyles();
    const {loading, result, error, onSubmit} = useFetch(onDelete);

    useEffect(() => {
        if(result !== null) {
            onDeleteSuccess();
            setDeleteRow(null);
        }
    }, [result])

    return <Dialog classes={{ paper: classes.root }} open={deleteRow !== null}
                   onClose={() => setDeleteRow(null)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {error ? <span className={classes.error}>{error}</span> : <span>Are you sure you want to delete this row?</span>}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setDeleteRow(null)} color="primary">
                Cancel
            </Button>
            <LoadingButton
                loading={loading}
                onClick={() => onSubmit(deleteRow)} color="secondary" autoFocus>
                Confirm
            </LoadingButton>
        </DialogActions>
    </Dialog>
}

export default DeleteDialog;

const useStyles = makeStyles({
    root: {
        width: 500,
    },
    error: {
        color: 'red',
    }
});