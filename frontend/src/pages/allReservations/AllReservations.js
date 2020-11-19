import { makeStyles } from '@material-ui/core';
import React, {useState} from 'react';
import AllReservationsTable from './components/AllReservationsTable';
import DeleteDialog from "../../components/DeleteDialog";
import AllReservationsContext from "../../contexts/AllReservationsContext";
import EditDialog from "../../components/EditDialog";

function AllReservations() {

  const classes = useStyles();
  const [deletion, setDeletion] = useState(false);
  const [changeReservation, setChangeReservation] = useState(false);
  const [addReservation, setAddReservation] = useState(false);
  // useEffect(() => {
  //     (async function () {
  //         dispatch({ type: RESERVATIONS_SET_LOADING });
  //         await fetchReservationsAction(dispatch);
  //         setTimeout(() => dispatch({ type: RESERVATIONS_UNSET_LOADING }), 300);
  //     })()
  // }, []);

  return <AllReservationsContext.Provider style={{ width: '100%' }} value={{ deletion, setDeletion, changeReservation, setChangeReservation, addReservation, setAddReservation }}>
    <div className={classes.root}>
      <AllReservationsTable />
      <DeleteDialog onClose={() => setDeletion(false)} open={deletion} questionText={'Do you confirm cancellation of this order? It cannot be restored.'}/>
      <EditDialog onClose={() => setChangeReservation(false)} open={changeReservation} name={'Edit Reservation'} labels={['First Name', 'Last Name', 'Phone Number']}/>
      <EditDialog onClose={() => setAddReservation(false)} open={addReservation} name={'Add a Reservation'} labels={['Email', 'First Name', 'Last Name', 'Hotel', 'Room Type', 'Check In', 'Check Out', 'Reservation Date', 'Status']}/>
    </div>
  </AllReservationsContext.Provider>
}

export default AllReservations;

const useStyles = makeStyles({
  root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 16,
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`
  },
});

