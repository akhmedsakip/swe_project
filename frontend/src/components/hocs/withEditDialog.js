import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import EditReservationForm from "../EditReservationForm";
import EditSeasonFrom from "../EditSeasonForm";
import EditEmployeeFrom from "../EditEmployeeForm";

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
                    {
                        {
                            'Edit Reservation': <EditReservationForm />,
                            'Add a Reservation': <EditReservationForm />,
                            'Edit Employee': <EditEmployeeFrom />,
                            'Edit Seasonal Rates': <EditSeasonFrom />,
                            'Add a Seasonal Rate': <EditSeasonFrom />
                        }[props.name]
                    }
                        
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" type={'submit'}
                            variant={'outlined'} className={classes.marginTop10} onClick={props.open}>
                            Submit
                        </Button>
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