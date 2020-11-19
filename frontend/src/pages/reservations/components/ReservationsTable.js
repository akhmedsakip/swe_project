import { useMediaQuery, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import MyOrdersContext from "../../../contexts/ReservationsContext";
import DeleteReservationDialog from '../../../components/DeleteDialog';
import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';

const ReservationsTable = () => {

  const [deletion, setDeletion] = useState(false);

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MyOrdersContext.Provider style={{ width: '100%' }} value={{ deletion, setDeletion }}>
      {isMobileScreen ? <MobileTable />
        : <DesktopTable />
      }
      <DeleteReservationDialog onClose={() => setDeletion(false)} open={deletion} questionText={'Do you confirm cancellation of your room order? It cannot be restored.'}/>
    </MyOrdersContext.Provider>
  );
}

export default ReservationsTable;