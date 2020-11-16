import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MobileReservationCard from './MobileReservationCard';
import { Toolbar, Typography } from '@material-ui/core';
import ReservationsContext from "../../../contexts/ReservationsContext";
import AppContext from "../../../store/AppContext";
import Spinner from "../../../components/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '5px',
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  marginTop32: {
    marginTop: 32,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '5px',
    background: theme.palette.background.paper,
    padding: 32,
  },
  messageContainer: {
    justifyContent: 'flex-start',
  },
  paddingHor0: {
    paddingRight: 0,
    paddingLeft: 0,
  }
}));

const MobileTable = () => {
  const classes = useStyles();
  const {state, dispatch} = useContext(AppContext)
  const {reservations, loading} = state.reservations;

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <div className={`${classes.titleContainer}`}>
        <Typography className={classes.title} variant="h5">
          My Orders
        </Typography>
      </div>

      {
        loading ?
            <div className={`${classes.container} ${classes.marginTop32}`}>
              <Spinner size={'big'} />
            </div> : null
      }

      {!loading && reservations.length ? reservations.map((row, i) => {
        return <ListItem key={row.orderId} className={classes.paddingHor0}>
          <MobileReservationCard row={row} />
        </ListItem>
      }) : null}
      {
        !loading && !reservations.length ?
            <div className={`${classes.container} ${classes.marginTop32} ${classes.messageContainer}`}>
              No reservations made yet
            </div> : null
      }
    </List>
  );
}

export default MobileTable;