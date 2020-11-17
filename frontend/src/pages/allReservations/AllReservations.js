import { makeStyles } from '@material-ui/core';
import React from 'react';
import AllReservationsTable from './components/AllReservationsTable';

function AllReservations() {

  const classes = useStyles();

  // useEffect(() => {
  //     (async function () {
  //         dispatch({ type: RESERVATIONS_SET_LOADING });
  //         await fetchReservationsAction(dispatch);
  //         setTimeout(() => dispatch({ type: RESERVATIONS_UNSET_LOADING }), 300);
  //     })()
  // }, []);

  return <div className={classes.root}>
      <AllReservationsTable />
  </div>
}

export default AllReservations;

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

