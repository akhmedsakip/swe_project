import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RoomCard from '../components/HotelCard';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    alignItems: 'center'
  },
});

function Rooms() {
  const classes = useStyles();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    // const data = await fetch('localhost:8100/room-types');
    // setRooms(data);
    console.log('data fetch')
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </Grid>
    </div>
  )
}

export default Rooms;
