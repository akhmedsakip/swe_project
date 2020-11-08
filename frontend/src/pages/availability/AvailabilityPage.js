import React, {useState, useEffect, useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import AvailabilityForm from "./components/AvailiabilityForm";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AvailableHotels from "./components/AvailableHotels";
import AvailableRoomTypes from "./components/AvailableRoomTypes";
import {BrowserRouter, Route, Switch, useLocation} from "react-router-dom";
import ReservationDialog from "./reservations/ReservationDialog";
import AppContext from "../../store/AppContext";
import Spinner from "../../components/Spinner";

export default function AvailabilityPage() {
    const classes = useStyles();
    const {state} = useContext(AppContext);
    const {loading} = state.availability;

    return (
        <div className={classes.root}>
            <Paper className={`${classes.formContainer} ${classes.marginBottom32}`}>
                <Typography variant="h5" className={classes.marginBottom10}>
                    Booking a room
                </Typography>
                <AvailabilityForm />
            </Paper>
            <Paper className={classes.resultContainer}>
                <Typography variant="h5" className={classes.marginBottom10}>
                    Search Results
                </Typography>
                {
                    loading ?
                        <div className={classes.spinnerContainer}>
                            <Spinner size={'big'} />
                        </div>
                        :
                        <Switch>
                            <Route path={'/availability/hotels'} component={AvailableHotels} />
                            <Route path={'/availability/roomTypes'} component={AvailableRoomTypes} />
                        </Switch>
                }

            </Paper>
            <ReservationDialog />
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    marginBottom10: {
        marginBottom: 10,
    },
    marginBottom32: {
        marginBottom: 32,
    },
    formContainer: {
        width: '80vw',
        padding: 16,
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 16,
        minHeight: '100vh',
    },
    bg: {
    },
    resultContainer: {
        width: '80vw',
        padding: 16,
    },
    spinnerContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    }
}));