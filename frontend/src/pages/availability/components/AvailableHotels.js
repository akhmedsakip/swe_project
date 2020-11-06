import React, {useContext, useEffect} from 'react';
import AvailabilityContext from "../../../contexts/availabilityContext";
import HotelCard from "../../../components/HotelCard";
import {Grid} from "@material-ui/core";
import fetchAvailableRoomTypes from "../../../actions/availabilityContextActions/fetchAvailableRoomTypes";

const AvailableHotels = () => {
    const {state, dispatch} = useContext(AvailabilityContext);
    useEffect(() => {
        console.log(state.params)
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
                            <HotelCard hotelName={hotel.name} hotelDescription={hotel.description} hotelMainPhoto={hotel.mainHotelPicture} hotelStars={hotel.starCount} hotelId={hotel.hotelId}
                            onClick={async () => {
                                try{
                                    await fetchAvailableRoomTypes(dispatch, {...state.params, hotelId:hotel.hotelId});
                                } catch (e){
                                    console.log(e.response.data);
                                }
                            }}
                            />
                        </Grid>
                    );
                })
            }
        </Grid>
    )
};

export default AvailableHotels;