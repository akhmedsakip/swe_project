import React, { useState, useEffect } from 'react';
import RoomTypeCard from "../components/RoomTypeCard";
import { Grid } from '@material-ui/core';
import axios from 'axios';


function RoomType() {

    const [roomTypes, setRoomType] = useState([]);

    useEffect(() => {
        fetchRoomTypes();
    }, []);

    const fetchRoomTypes = async () => {
        axios.get("/api/roomTypes?hotelId=1")
            .then(response => {
                setRoomType(response.data);
            })
            .catch(error => {
                console.log(error);
                alert("Error fetching roomTypes!");
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
                    roomTypes.map(roomType => {
                        return (
                            <Grid key={roomType.hotelId} >
                                <RoomTypeCard roomTypeName={roomType.name} roomTypeDescription={roomType.description} roomTypeCapacity={roomType.capacity} roomTypeMainPhoto={roomType.photo} />
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

export default RoomType;
