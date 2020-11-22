import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import React, {useContext} from "react";
import AdminTableContext from "../../../../contexts/AdminTableContext";
import {makeStyles} from "@material-ui/core/styles";
import EditDialogForm from "./EditDialogForm";

const EditDialog = () => {
    const classes = useStyles();
    const {editRow, setEditRow} = useContext(AdminTableContext);
    return <Dialog classes={{paper: classes.root}} aria-labelledby="form-dialog-title" open={editRow !== null}>
        <DialogTitle id="form-dialog-title">Edit row</DialogTitle>
        <DialogContent>
            <EditDialogForm />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setEditRow(null)} color="secondary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
}

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

export default EditDialog;