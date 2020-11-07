import React, {useContext, useEffect} from 'react';
import AvailabilityContext from "../../../contexts/availabilityContext";
import HotelCard from "../../../components/HotelCard";
import {Grid} from "@material-ui/core";
import fetchAvailableRoomTypes from "../../../actions/availabilityContextActions/fetchAvailableRoomTypes";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import AppContext from "../../../store/AppContext";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    marginBottom16: {
        marginBottom: 16,
    }
});

const AvailableHotels = () => {
    const {state, dispatch} = useContext(AppContext);
    const {hotels, params} = state.availability;
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.root}>
            {hotels?.length === 0 ? <Typography>
                No results found
            </Typography> : null}
            <Grid container direction="row"
                  justify="space-evenly" alignItems="center">
                {hotels?.map(hotel =>
                        <Grid key={hotel.hotelId} >
                            <HotelCard hotelName={hotel.name} hotelDescription={hotel.description}
                                       hotelMainPhoto={hotel.mainHotelPicture} hotelStars={hotel.starCount}
                                       onClick={() => {
                                           fetchAvailableRoomTypes(dispatch, {...params, hotelId:hotel.hotelId})
                                               .then(() => history.push('/availability/roomTypes'))
                                       }}/>
                        </Grid>
                    )}
            </Grid>
        </div>
    )
};

export default AvailableHotels;