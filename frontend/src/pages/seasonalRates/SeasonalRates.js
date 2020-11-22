import { makeStyles } from '@material-ui/core';
import React, {useState} from 'react';
import SeasonalRatesTable from './components/SeasonalRatesTable';
import DeleteDialog from "../../components/DeleteDialog";
import MyOrdersContext from "../../contexts/SeasonalRatesContext";
import EditDialog from "../../components/EditDialog";

function SeasonalRates() {
    const [changeSeasonalRates , setChangeSeasonalRates] = useState(false);
    const [addSeasonalRates , setAddSeasonalRates] = useState(false);
    const classes = useStyles();
    const [deletion, setDeletion] = useState(false);

    return <MyOrdersContext.Provider style={{ width: '100%' }} value={{ deletion, setDeletion, changeSeasonalRates , setChangeSeasonalRates, addSeasonalRates , setAddSeasonalRates }}>
    <div className={classes.root}>
        <SeasonalRatesTable />
        <DeleteDialog onClose={() => setDeletion(false)} open={deletion} questionText={'Do you confirm deletion of this seasonal rate? It cannot be restored.'}/>
        <EditDialog onClose={() => setChangeSeasonalRates(false)} open={changeSeasonalRates} name={'Edit Seasonal Rates'} labels={['New Coefficient']}/>
        <EditDialog onClose={() => setAddSeasonalRates(false)} open={addSeasonalRates} name={'Add a Seasonal Rate'} labels={['Name', 'Start Date', 'End Date', 'New Coefficient']}/>
    </div>
    </MyOrdersContext.Provider>
}

export default SeasonalRates;

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

