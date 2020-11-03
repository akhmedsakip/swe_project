import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HotelCard from '../components/HotelCard';
import { Grid } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    alignItems: 'center'
  },
});

function Hotels() {
    const classes = useStyles();

    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        axios.get("/api/hotels")
            .then(response => {
                setHotels(response.data);
            })
            .catch(error => {
                alert("Error fetching hotels!");
            });
    }

    return (
        <div>
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
                                <HotelCard hotelName={hotel.name} hotelDescription={hotel.description} hotelMainPhoto={hotel.mainHotelPicture} />
                            </Grid>
                        );
                    })
                }
            </Grid>
            {

            }
        </div>
    )
    }

export default Hotels;
