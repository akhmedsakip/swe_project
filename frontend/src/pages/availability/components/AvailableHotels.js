import React, {useContext, useEffect} from 'react';
import HotelCard from "../../../components/HotelCard";
import {Grid} from "@material-ui/core";
import fetchAvailableRoomTypes from "../../../actions/availability/fetchAvailableRoomTypes";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import AppContext from "../../../store/AppContext";
import {
    AVAILABILITY_SET_LOADING,
    AVAILABILITY_UNSET_LOADING
} from "../../../store/availability/availabilityActionTypes";

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

    async function onClick (hotel) {
        dispatch({type: AVAILABILITY_SET_LOADING});
        await fetchAvailableRoomTypes(dispatch, {...params, hotelId:hotel.hotelId})
        setTimeout(() => {
            dispatch({type: AVAILABILITY_UNSET_LOADING});
            history.push('/availability/roomTypes');
        }, 300);
    }
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
                                       onClick={() => onClick(hotel)}/>
                        </Grid>
                    )}
            </Grid>
        </div>
    )
};

export default AvailableHotels;