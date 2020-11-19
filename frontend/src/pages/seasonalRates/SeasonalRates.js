import { makeStyles } from '@material-ui/core';
import React, {useState} from 'react';
import SeasonalRatesTable from './components/SeasonalRatesTable';
import DeleteDialog from "../../components/DeleteDialog";
import MyOrdersContext from "../../contexts/SeasonalRatesContext";

function SeasonalRates() {

    const classes = useStyles();
    const [deletion, setDeletion] = useState(false);

    return <MyOrdersContext.Provider style={{ width: '100%' }} value={{ deletion, setDeletion }}>
    <div className={classes.root}>
        <SeasonalRatesTable />
        <DeleteDialog onClose={() => setDeletion(false)} open={deletion} questionText={'Do you confirm deletion of this seasonal rate? It cannot be restored.'}/>
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

