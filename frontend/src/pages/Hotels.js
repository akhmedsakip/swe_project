import React, { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import { Grid } from '@material-ui/core';
import axios from 'axios';


function Hotels() {

    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        axios.get("/api/hotels")
            .then(response => {
                setHotels(response.data);
            })
            .catch(error => {
                console.log(error);
                alert("Error fetching hotels!");
            });
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
        >
            {
                hotels.map(hotel => {
                    return (
                        <Grid key={hotel.hotelId} >
                            <HotelCard hotelId={hotel.hotelId} hotelName={hotel.name} hotelDescription={hotel.description} hotelMainPhoto={hotel.mainHotelPicture} hotelStars={hotel.starCount}/>
                        </Grid>
                    );
                })
            }
        </Grid>
    )
}

export default Hotels;
