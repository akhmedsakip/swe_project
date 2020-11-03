import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '1vmax'
  },

  description: {
    maxHeight: 200,
    overflowY: "auto",
    '&::-webkit-scrollbar': {
      width: '0.3em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  }
});

function HotelCard({ hotelName, hotelDescription, hotelMainPhoto }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={hotelMainPhoto}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {hotelName}
          </Typography>
          <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
            {hotelDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Rooms
        </Button>
      </CardActions>
    </Card>
  );
}

HotelCard.propTypes = {
  hotelName: PropTypes.string.isRequired,
  hotelDescription: PropTypes.string.isRequired,
  hotelMainPhoto: PropTypes.string.isRequired
}

export default HotelCard;