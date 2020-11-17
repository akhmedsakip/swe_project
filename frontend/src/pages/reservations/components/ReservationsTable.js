import React, { useContext, useState } from 'react';
import AppContext from '../../../store/AppContext';
import MobileTable from './MobileTable';
import DesktopTable from './DesktopTable';
import { useMediaQuery, useTheme } from '@material-ui/core';
import DeleteReservationDialog from './DeleteReservationDialog';
import MyOrdersContext from "../../../contexts/ReservationsContext";

const rows = [
  {
    Hotel: "Rixos Almaty",
    RoomType: "Standard",
    CheckInDate: "21-10-2020",
    CheckOutDate: "30-10-2020",
    ReservationDate: "20-10-2020",
    ID: "1"
  },
  {
    Hotel: "Rixos Borovoe",
    RoomType: "Luxe",
    CheckInDate: "21-10-2020",
    CheckOutDate: "30-10-2020",
    ReservationDate: "20-10-2020",
    ID: "2"
  }
];

const ReservationsTable = () => {

  const [deletion, setDeletion] = useState(false);

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MyOrdersContext.Provider style={{ width: '100%' }} value={{deletion, setDeletion, rows}}>
      {isMobileScreen ? <MobileTable />
        : <DesktopTable />
      }
      <DeleteReservationDialog onClose={() => setDeletion(false)} open={deletion} />
    </MyOrdersContext.Provider>
  );
}

export default ReservationsTable;