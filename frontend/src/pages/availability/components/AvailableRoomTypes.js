import React, {useContext, useEffect} from 'react';
import {Grid} from "@material-ui/core";
import RoomTypeCard from "../../../components/RoomTypeCard";
import {makeStyles} from "@material-ui/core/styles";
import BackButton from "../../../components/BackButton";
import {useHistory} from 'react-router-dom';
import AppContext from "../../../store/AppContext";
import {AVAILABILITY_SET_ROOM_TYPE} from "../../../store/availability/availabilityActionTypes";


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
    const {state, dispatch} = useContext(AppContext);
    const {roomTypes} = state.availability;
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.root}>
            <div className={classes.marginBottom16}>
                <BackButton onClick={() => history.goBack()} />
            </div>
            <Grid container direction="row"
                  justify="space-evenly" alignItems="center">
                {roomTypes?.map(roomType =>
                    <Grid key={roomType.name} >
                            <RoomTypeCard roomTypeName={roomType.name} roomTypeDescription={roomType.description}
                                          roomTypeCapacity={roomType.capacity} roomTypeMainPhoto={roomType.photo}
                                          onClick={() => dispatch({type: AVAILABILITY_SET_ROOM_TYPE, payload:roomType})}/>
                        </Grid>)}
            </Grid>
        </div>
    )
};

export default AvailableRoomTypes;