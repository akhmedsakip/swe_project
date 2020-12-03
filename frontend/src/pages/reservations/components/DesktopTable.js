import React, {useContext, useEffect, useRef} from 'react';
import AppContext from "../../../store/AppContext";
import InteractiveTable from "../../../components/interactive-table/InteractiveTable";
import fetchReservationsAction from "../../../actions/reservations/fetchReservationsAction";
import {INTERACTIVE_TABLE_SET_LOADING, INTERACTIVE_TABLE_UNSET_LOADING} from "../../../store/interactive-table/interactiveTableActionTypes";
import deleteReservationAction from "../../../actions/reservations/deleteReservationAction";

const mapping = {
  'orderId': 'Order ID',
  'hotel': 'Hotel',
  'roomType': 'Room Type',
  'checkInDate': 'Check In Date',
  'checkOutDate': 'Check Out Date',
  'orderDateTime': 'Order Date Time',
  'orderPrice': 'Order Price',
  'status': 'Status'
}

const DesktopTable = () => {
  const timeout = useRef(0)
  const { state, dispatch } = useContext(AppContext)
  const { reservations } = state.reservations;

  useEffect(() => {
    fetchReservations();
    return () => clearTimeout(timeout.current);
  }, []);

  const fetchReservations = async () => {
    dispatch({type: INTERACTIVE_TABLE_SET_LOADING});
    await fetchReservationsAction(dispatch)
    timeout.current = setTimeout(() => dispatch({type: INTERACTIVE_TABLE_UNSET_LOADING}), 300);
  }

  const deleteReservations = async ({orderId}) => {
    await deleteReservationAction(orderId);
  }
  return (
    <InteractiveTable objects={reservations} showableColumns={Object.keys(mapping)}
                      searchableColumns={Object.keys(mapping)}
                      editableColumns={[]} mapping={mapping} mappingInput={{}}
                      isDeletable={true}
                      onDelete={deleteReservations}
                      onDeleteSuccess={fetchReservations}
                      isEditable={false}
                      isAddable={false}
                      hasWritePrivilege={true}
                      tableName={'My Orders'} />
  );
}

export default DesktopTable;