import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextFieldWithError from "../../../shared/TextFieldWithError";

const useStyles = makeStyles({
    room: {
        display: 'flex',
        flexDirection: 'column'
    },
});

const ReservationForm = () => {
    const classes = useStyles();
    return <form className={classes.room}>
        <TextFieldWithError
        type={'error'}
        />
    </form>
}