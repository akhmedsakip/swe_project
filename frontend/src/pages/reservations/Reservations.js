import React, { useContext, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ReservationsTable from './components/ReservationsTable';
import AppContext from "../../store/AppContext";
import fetchReservationsAction from "../../actions/reservations/fetchReservationsAction";
import { RESERVATIONS_SET_LOADING, RESERVATIONS_UNSET_LOADING } from "../../store/reservations/reservationActionTypes";

const Reservations = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        (async function () {
            dispatch({ type: RESERVATIONS_SET_LOADING });
            await fetchReservationsAction(dispatch);
            setTimeout(() => dispatch({ type: RESERVATIONS_UNSET_LOADING }), 300);
        })()
    }, []);

    return <div className={classes.root}>
        <ReservationsTable />
    </div>
};

export default Reservations;

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`
    },
});