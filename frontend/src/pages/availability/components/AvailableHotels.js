import React, {useContext, useEffect} from 'react';
import AvailabilityContext from "../../../contexts/availabilityContext";
import HotelCard from "../../../components/HotelCard";
import {Grid} from "@material-ui/core";

const AvailableHotels = () => {
    const {state} = useContext(AvailabilityContext);
    useEffect(() => {
        console.log(state.hotels)
    }, [state]);
    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
        >
            {
                state.hotels?.map(hotel => {
                    return (
                        <Grid key={hotel.hotelId} >
                            <HotelCard hotelName={hotel.name} hotelDescription={hotel.description} hotelMainPhoto={hotel.mainHotelPicture} hotelStars={hotel.starCount}/>
                        </Grid>
                    );
                })
            }
        </Grid>
    )
};

export default AvailableHotels;