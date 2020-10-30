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
        axios.get("http://localhost:8080/api/hotels/")
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
                <Grid item xs >
                    <HotelCard hotelName={"rixos"} hotelDescription={"dsflksdnflksdnflnsdlfn"}
                               hotelMainPhoto={"dasdasd"} />
                </Grid>
                {
                    hotels.map(hotel => {
                        return (
                            <Grid item xs >
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
