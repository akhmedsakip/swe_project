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
import {Grid} from "@material-ui/core";
import {BrowserRouter, Route, Switch, useLocation} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
        padding: 16,
        minHeight: '100vh',
    },
    bg: {
    },
    resultContainer: {
        width: '80vw',
        padding: 16,
    }
}));

export default function AvailabilityPage(){
    return <AvailabilityContextProvider>
        <AvailabilityContent/>
    </AvailabilityContextProvider>
}

function AvailabilityContent() {
    const classes = useStyles();
    const {state} = useContext(AvailabilityContext);
    const location = useLocation();
    return (
        <div className={classes.root}>
            <Paper className={`${classes.formContainer} ${classes.marginBottom32}`}>
                <Typography variant="h5" className={classes.marginBottom10}>
                    Booking
                </Typography>
                <AvailabilityForm />
            </Paper>
            <Paper className={classes.resultContainer}>
                <Typography variant="h5" className={classes.marginBottom10}>
                    Search Results
                </Typography>
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        classNames="page"
                        unmountOnExit
                        timeout={1000}>
                        <Switch>
                            <Route path={'/availability/hotels'} component={AvailableHotels} />
                            <Route path={'/availability/roomTypes'} component={AvailableRoomTypes} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </Paper>

        </div>
    );
}