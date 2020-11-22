import { makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import AllReservationsContext from "../../contexts/AllReservationsContext";
import { ALL_RESERVATIONS_SET_LOADING, ALL_RESERVATIONS_UNSET_LOADING } from '../../store/manager/allReservations/allReservationsActionTypes';
import fetchAllReservationsAction from '../../actions/allReservations/fetchAllReservationsAction';
import AppContext from '../../store/AppContext';
import AdminTable from "../admin-table/AdminTable";
import {editReservationFormSchema} from "../../utils/validationSchemas";
import editReservationAction from "../../actions/reservations/editReservationAction";

function AllReservations() {
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
    'firstName', 'lastName', 'phoneNumber', 'gender'
  ];

  const mappingInput = {
    "firstName": "text",
    "lastName": "text",
    "phoneNumber": "text",
    "gender": "text"
  }

  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {
    (async function () {
      dispatch({ type: ALL_RESERVATIONS_SET_LOADING });
      await fetchAllReservationsAction(dispatch);
      setTimeout(() => dispatch({ type: ALL_RESERVATIONS_UNSET_LOADING }), 300);
    })()
  }, []);

  const allReservations = state.allReservations.allReservations.map((reservation) => {
    return {
      orderId: reservation.reservation.orderId,
      firstName: reservation.person.firstName,
      lastName: reservation.person.lastName,
      phoneNumber: reservation.person.phoneNumber,
      gender: reservation.person.gender,
      checkInDate: reservation.reservation.checkInDate,
      checkOutDate: reservation.reservation.checkOutDate,
      hotel: reservation.reservation.hotel,
      orderDateTime: reservation.reservation.orderDateTime,
      orderPrice: reservation.reservation.orderPrice,
      roomType: reservation.reservation.roomType,
      status: reservation.reservation.status,
    }
  });

  const onEditSubmit = (values, row)=>{
    return editReservationAction(values, dispatch);
  }

  // editReservationAction(allReservations[0]).then(r => {});

  return <AdminTable
      objects={allReservations}
      showableColumns={Object.keys(mapping)}
      searchableColumns={Object.keys(mapping)}
      editableColumns={editableColumns}
      mapping={mapping}
      mappingInput={mappingInput}
      onEditSubmit={(values, row) => onEditSubmit(values, row)}
      onEditSuccess={() => console.log('success edit')}
      onDelete={(values) => console.log('delete', values)}
      onDeleteSuccess={() => console.log('delete')}
      isAddable={false}
      hasWritePrivilege={true}
      editValidationSchema={editReservationFormSchema}
      tableName={'Manager: All reservations'}
      isDeletable={true}
  />
  // <AllReservationsContext.Provider style={{ width: '100%' }} value={{ setDeletion, setChangeReservation, handleEdit }}>
    {/*<div className={classes.root}>*/}
    {/*  <AllReservationsTable />*/}
    {/*  <DeleteDialog onClose={() => setDeletion(false)} open={deletion} questionText={'Do you confirm cancellation of this order? It cannot be restored.'} />*/}
    {/*  <EditDialog onClose={() => setChangeReservation(false)} open={changeReservation} name={'Edit Reservation'} labels={['First Name', 'Last Name', 'Phone Number']} row={row} />*/}
    {/*</div>*/}
  {/*</AllReservationsContext.Provider>*/}
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

