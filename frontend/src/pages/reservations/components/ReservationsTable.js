import React, { useContext, useState } from 'react';
import AppContext from '../../../store/AppContext';
import MobileTable from './MobileTable';
import DesktopTable from './DesktopTable';
import { useMediaQuery, useTheme } from '@material-ui/core';
import DeleteReservationDialog from './DeleteReservationDialog';
import MyOrdersContext from "../../../contexts/ReservationsContext";

const ReservationsTable = () => {

  const [deletion, setDeletion] = useState(false);

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MyOrdersContext.Provider style={{ width: '100%' }} value={{deletion, setDeletion}}>
      {isMobileScreen ? <MobileTable />
        : <DesktopTable />
      }
      <DeleteReservationDialog onClose={() => setDeletion(false)} open={deletion} />
    </MyOrdersContext.Provider>
  );
}

export default ReservationsTable;