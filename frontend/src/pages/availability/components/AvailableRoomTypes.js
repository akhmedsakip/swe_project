import React, {useContext, useEffect} from 'react';
import AvailabilityContext from "../../../contexts/availabilityContext";
import {Grid} from "@material-ui/core";
import RoomTypeCard from "../../../components/RoomTypeCard";

const AvailableRoomTypes = () => {
    const {state} = useContext(AvailabilityContext);
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
                state.roomTypes?.map(roomType => {
                    return (
                        <Grid key={roomType.hotelId} >
                            <RoomTypeCard roomTypeName={roomType.name} roomTypeDescription={roomType.description} roomTypeCapacity={roomType.capacity} roomTypeMainPhoto={roomType.photo} />
                        </Grid>
                    );
                })
            }
        </Grid>
    )
};

export default AvailableRoomTypes;