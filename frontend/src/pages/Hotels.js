import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HotelCard from '../components/HotelCard';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    alignItems: 'center'
  },
});

function Hotels() {
    const classes = useStyles();

    const [hotels, setHotels] = useState([]);

    const axios = require('axios');

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        axios.get("http://localhost:8080/api/hotels/")
            .then(response => {
                setHotels(response.data);
            })
            .catch(error => {
                console.log(error);
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
                {/*<Grid item xs >*/}
                {/*    <HotelCard hotelName={"Rixos Almaty"} hotelDescription={"Lorem ipsum"} hotelMainPhoto={"https://cf.bstatic.com/images/hotel/max1280x900/426/42696320.jpg"} />*/}
                {/*</Grid>*/}
                {/*<Grid item xs >*/}
                {/*    <HotelCard hotelName={"Rixos Almaty"} hotelDescription={"Lorem ipsum"} hotelMainPhoto={"https://cf.bstatic.com/images/hotel/max1280x900/426/42696320.jpg"} />*/}
                {/*</Grid>*/}
                {/*<Grid item xs >*/}
                {/*    <HotelCard hotelName={"Rixos Almaty"} hotelDescription={"Lorem ipsum"} hotelMainPhoto={"https://cf.bstatic.com/images/hotel/max1280x900/426/42696320.jpg"} />*/}
                {/*</Grid>*/}
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
