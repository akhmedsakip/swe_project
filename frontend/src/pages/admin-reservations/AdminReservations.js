import InteractiveTable from "../../components/interactive-table/InteractiveTable";
import fetchAdminReservationsAction from "../../actions/admin-reservations/fetchAdminReservationsAction";
import deleteAdminReservationAction from "../../actions/admin-reservations/deleteAdminReservationAction";
import React, {useContext, useEffect, useState} from "react";
import editAdminReservationAction from "../../actions/admin-reservations/editAdminReservationAction";
import AppContext from "../../store/AppContext";
import {editReservationFormSchema} from "../../utils/validationSchemas";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import {
    INTERACTIVE_TABLE_SET_LOADING,
    INTERACTIVE_TABLE_UNSET_LOADING
} from "../../store/interactive-table/interactiveTableActionTypes";
import {WRITE_ALL_ORDERS} from "../../store/user/userPrivelegesTypes";

const mapping = {
    "orderId": "Order ID",
    "firstName":'First Name',
    "lastName":'Last Name',
    'phoneNumber':'Phone Number',
    'gender':'Gender',
    "hotel": "Hotel",
    "roomType": "Room Type",
    "checkInDate": "Check In Date",
    "checkOutDate": "Check Out Date",
    "orderDateTime": "Reservation Date",
    'orderPrice':'Price',
    "status": "Status",
}

const editableColumns = [
    'firstName', 'lastName', 'phoneNumber'
];

const mappingInput = {
    "firstName": "text",
    "lastName": "text",
    "phoneNumber": "text"
}

function AdminReservations() {
    const {state, dispatch} = useContext(AppContext);
    const [adminReservations, setAdminReservations] = useState([]);
    const {reservations} = state.adminReservations;
    const {userInfo} = state.user;

    const classes = useStyles();

    useEffect(() => {
        fetchReservation();
    }, []);

    useEffect(() => {
        setAdminReservations(reservations.map(({person, reservation}) => ({...person, ...reservation})))
    }, [reservations])

    const onEditSubmit = async ({firstName, lastName, phoneNumber}, {orderId, gender}) => {
        await editAdminReservationAction({firstName, lastName, phoneNumber, gender, orderId});
    }

    const onDeleteSubmit = async ({orderId}) => {
        await deleteAdminReservationAction(orderId);
    }

    const fetchReservation = async () => {
        dispatch({type: INTERACTIVE_TABLE_SET_LOADING});
        await fetchAdminReservationsAction(dispatch);
        setTimeout(() => dispatch({type: INTERACTIVE_TABLE_UNSET_LOADING}), 500);
    }

    return <Box className={classes.root} display={'flex'} flexDirection={'column'} alignItems='center'>
        <InteractiveTable
            objects={adminReservations}
            showableColumns={Object.keys(mapping)}
            searchableColumns={Object.keys(mapping)}
            editableColumns={editableColumns}
            mapping={mapping}
            mappingInput={mappingInput}
            onEditSubmit={onEditSubmit}
            onEditSuccess={fetchReservation}
            onDelete={onDeleteSubmit}
            onDeleteSuccess={fetchReservation}
            isAddable={false}
            isEditable={true}
            hasWritePrivilege={userInfo?.privileges?.includes(WRITE_ALL_ORDERS)}
            editValidationSchema={editReservationFormSchema}
            tableName={'All reservations'}
            isDeletable={true}
        />
    </Box>
}

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        padding: 16,
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`
    },
}))

export default AdminReservations;