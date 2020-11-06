import React, {useState, useEffect, useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import AvailabilityForm from "./components/AvailiabilityForm";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hotels from "../Hotels";
import axios from "axios";
import AvailabilityContextProvider from "../../context-providers/AvailabilityContextProvider";
import AvailableHotels from "./components/AvailableHotels";
import AvailableRoomTypes from "./components/AvailableRoomTypes";
import AvailabilityContext from "../../contexts/availabilityContext";

const useStyles = makeStyles((theme) => ({
    marginBottom: {
        marginBottom: '10px',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    root1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    bg: {
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`,
    },
}));

export default function AvailabilityPage(){
    return <AvailabilityContextProvider>
        <AvailabilityContent/>
    </AvailabilityContextProvider>
}

function AvailabilityContent() {
    const classes = useStyles();
    const {state} = useContext(AvailabilityContext);
    return (
        <div>
            <div className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" className={classes.marginBottom}>
                        Booking
                    </Typography>
                    <AvailabilityForm />
                </Paper>
            </div>
            {state.roomTypes ? <AvailableRoomTypes /> :  <AvailableHotels />}
        </div>
    );
}