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
import { withStyles } from "@material-ui/core/styles";

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
        },
        paddingRight: "1rem"
    },

    capacity: {
        color: "#FF6655",
    },
    price: {
        color: "#195C9F"
    },
    marginBottom16: {
        marginBottom: 16,
    }
});


function RoomTypeCard({ roomTypeName, roomTypeDescription, roomTypeMainPhoto, roomTypeTotalPrice, roomTypeCapacity, onClick }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} onClick={onClick}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={roomTypeMainPhoto}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {roomTypeName}
                    </Typography>
                    <Typography className={`${classes.description} ${classes.marginBottom16}`} variant="body2" component="p">
                        {roomTypeDescription}
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.capacity}>
                        Capacity: {roomTypeCapacity} people
                    </Typography>
                    {
                        roomTypeTotalPrice != null ?
                            <Typography variant="body2" component="p" className={classes.price}>
                                Total Price: {roomTypeTotalPrice}
                            </Typography>
                            : null
                    }
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={onClick}>
                    Reserve
                </Button>
            </CardActions>
        </Card>
    );
}

RoomTypeCard.propTypes = {
    roomTypeName: PropTypes.string.isRequired,
    roomTypeDescription: PropTypes.string.isRequired,
    roomTypeMainPhoto: PropTypes.string.isRequired,
    roomTypeCapacity:  PropTypes.string.isRequired,
    roomTypeTotalPrice: PropTypes.number
}

export default RoomTypeCard;