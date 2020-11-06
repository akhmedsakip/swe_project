import React, {useContext, useEffect} from 'react';
import AvailabilityContext from "../../../contexts/availabilityContext";
import {Grid} from "@material-ui/core";
import RoomTypeCard from "../../../components/RoomTypeCard";
import {makeStyles} from "@material-ui/core/styles";
import BackButton from "../../../components/BackButton";
import {useHistory} from 'react-router-dom';
import ReservationDialog from "../reservations/ReservationDialog";


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    marginBottom16: {
        marginBottom: 16,
    }
});

const AvailableRoomTypes = () => {
    const {state, dispatch} = useContext(AvailabilityContext);
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.root}>
            <div className={classes.marginBottom16}>
                <BackButton onClick={() => history.goBack()} />
            </div>
            <Grid container direction="row"
                  justify="space-evenly" alignItems="center">
                {state.roomTypes?.map(roomType => {
                    return (
                        <Grid key={roomType.hotelId} >
                            <RoomTypeCard roomTypeName={roomType.name} roomTypeDescription={roomType.description}
                                          roomTypeCapacity={roomType.capacity} roomTypeMainPhoto={roomType.photo}
                                          onClick={() => dispatch({type: 'selectRoomType', payload:roomType})}/>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    )
};

export default AvailableRoomTypes;