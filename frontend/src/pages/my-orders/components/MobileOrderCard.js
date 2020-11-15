import React, {useContext} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MyOrderContext from '../../../contexts/MyOrdersContext';

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
    justifyContent: 'space-between'
  }
});

const MobileOrderCard = ({ row }) => {

  const {setDeletion} = useContext(MyOrderContext);
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className={classes.mainInfo}>
          <Typography className={classes.font20} gutterBottom color="primary">
            Order №{row.ID}
          </Typography>
          <Typography className={classes.font20}>
            {row.Hotel}
          </Typography>
        </div>
        <div className={classes.mainInfo}>
          <Typography className={classes.font20} gutterBottom color="primary">
            Room Type:
          </Typography>
          <Typography className={classes.font20}>
            {row.RoomType}
          </Typography>
        </div>
        <Typography color="textSecondary">
          Check In: {row.CheckInDate}
        </Typography>
        <Typography color="textSecondary">
          Check Out: {row.CheckOutDate}
        </Typography>
        <Typography color="textSecondary">
          Reserved: {row.ReservationDate}
        </Typography>
      </CardContent>

      <CardActions>
        <Button color="secondary" onClick={() => setDeletion(true)}>Delete Order</Button>
      </CardActions>
    </Card>
  );
}

export default MobileOrderCard;