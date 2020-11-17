import React, {useContext} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReservationsContext from '../../../contexts/ReservationsContext';
import PropTypes from "prop-types";
import DesktopTableRow from "./DesktopTableRow";

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  font20: {
    fontSize: 20
  },
  mainInfo: {
    display: 'flex',
  },
  marginRight12: {
    marginRight: 12,
  }
});

const MobileReservationCard = ({ row }) => {

  const {setDeletion} = useContext(ReservationsContext);
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className={classes.mainInfo}>
          <Typography className={`${classes.font20} ${classes.marginRight12}`} gutterBottom color="primary">
            Order ID:
          </Typography>
          <Typography className={classes.font20}>
            {row.orderId}
          </Typography>
        </div>
        <div className={classes.mainInfo}>
          <Typography className={`${classes.font20} ${classes.marginRight12}`} gutterBottom color="primary">
            Hotel:
          </Typography>
          <Typography className={classes.font20}>
            {row.hotel}
          </Typography>
        </div>
        <div className={classes.mainInfo}>
          <Typography className={`${classes.font20} ${classes.marginRight12}`} gutterBottom color="primary">
            Room Type:
          </Typography>
          <Typography className={classes.font20}>
            {row.roomType}
          </Typography>
        </div>
        <Typography color="textSecondary">
          Check In: {row.checkInDate}
        </Typography>
        <Typography color="textSecondary">
          Check Out: {row.checkOutDate}
        </Typography>
        <Typography color="textSecondary">
          Reserved: {row.orderDateTime}
        </Typography>
      </CardContent>

      <CardActions>
        <Button color="secondary" onClick={() => setDeletion(true)}>Delete Order</Button>
      </CardActions>
    </Card>
  );
}

export default MobileReservationCard;

MobileReservationCard.propTypes = {
  row: PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    hotel: PropTypes.string.isRequired,
    roomType: PropTypes.string.isRequired,
    checkInDate: PropTypes.string.isRequired,
    checkOutDate: PropTypes.string.isRequired,
    orderDateTime: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })
}