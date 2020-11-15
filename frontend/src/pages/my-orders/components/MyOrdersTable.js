import React, { useContext, useState } from 'react';
import AppContext from '../../../store/AppContext';
import MobileTable from './MobileTable';
import DesktopTable from './DesktopTable';
import { useMediaQuery, useTheme } from '@material-ui/core';
import DeleteOrderDialog from './DeleteOrderDialog';
import MyOrdersContext from "../../../contexts/MyOrdersContext";

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

const MyOrdersTable = () => {

  const [deletion, setDeletion] = useState(false);

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <MyOrdersContext.Provider style={{ width: '100%' }} value={{deletion, setDeletion}}>
      {isMobileScreen ? <MobileTable data={rows} />
        : <DesktopTable data={rows} />
      }
      <DeleteOrderDialog onClose={() => setDeletion(false)} open={deletion} />
    </MyOrdersContext.Provider>
  );
}

export default MyOrdersTable;