import React, {useContext} from "react";
import AdminTableContext from "../../../../contexts/AdminTableContext";
import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import EditDialogForm from "../edit-dialog/EditDialogForm";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import AddDialogForm from "./AddDialogForm";

const AddDialog = () => {
    const classes = useStyles();
    const {isAddingRow, setIsAddingRow} = useContext(AdminTableContext);
    return <Dialog classes={{paper: classes.root}} aria-labelledby="form-dialog-title" open={!!isAddingRow}>
        <DialogTitle id="form-dialog-title">Add new row</DialogTitle>
        <DialogContent>
            <AddDialogForm />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setIsAddingRow(false)} color="secondary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
}

export default AddDialog;

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});