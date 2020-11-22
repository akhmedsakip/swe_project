import Box from "@material-ui/core/Box";
import React, {useContext, useEffect, useRef} from "react";
import {makeStyles} from "@material-ui/core";
import AdminTable from "../admin-table/AdminTable";
import {seasonValidationSchema} from "../../utils/validationSchemas";
import AppContext from "../../store/AppContext";
import {ADMIN_TABLE_SET_LOADING, ADMIN_TABLE_UNSET_LOADING} from "../../store/admin-table/adminTableActionTypes";
import fetchSeasonsAction from "../../actions/seasonal-rates/fetchSeasonsAction";
import addSeasonAction from "../../actions/seasonal-rates/addSeasonAction";
import deleteSeasonAction from "../../actions/seasonal-rates/deleteSeasonAction";
import {useHistory} from 'react-router-dom';
import editWeekdayAction from "../../actions/seasonal-rates/editWeekdayAction";


const objects = [
    {
        seasonId: 1,
        name: 'Winter',
        startDate: '2020-01-01',
        endDate: '2020-02-02',
        advisory: 'Text text text text text text text text text text text text text' +
            ' text text text text text text text text text text text text text text ' +
            'text text text text text text text text text text text text text text'
    },
    {
        seasonId: 2,
        name: 'Winter',
        startDate: '2020-03-03',
        endDate: '2020-04-04',
        advisory: 'Text text text text text text text text text text text text text' +
            ' text text text text text text text text text text text text text text ' +
            'text text text text text text text text text text text text text text'
    }
]

const showableColumns = ['seasonId', 'name', 'startDate', 'endDate', 'advisory'];
const addableColumns = ['name', 'startDate', 'endDate', 'advisory'];
const editableColumns = ['name', 'startDate', 'endDate', 'advisory'];
const mapping = {
    'name': 'Name',
    'startDate': 'Start Date',
    'endDate': 'End Date',
    'advisory': 'Advisory'
}

const mappingInputs = {
    'name': 'text',
    'startDate': 'date',
    'endDate': 'date',
    'advisory': 'multiline'
}

const SeasonalRates = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(AppContext);
    const timeout = useRef(setTimeout(() => {}));
    const history = useHistory();

    const {seasons} = state.seasonalRates;

    useEffect(() => {
        if(seasons.length === 0) {
            dispatch({type: ADMIN_TABLE_SET_LOADING});
            fetchSeasons();
        }
    }, [seasons]);

    useEffect(() => {
        return () => clearTimeout(timeout.current);
    }, [])

    const onAddSubmit = async ({name, startDate, endDate, advisory}) => {
        await addSeasonAction({name, startDate, endDate, advisory});
    }
    const fetchSeasons = async () => {
        await fetchSeasonsAction(dispatch);
        timeout.current = setTimeout(() => {
            dispatch({type: ADMIN_TABLE_UNSET_LOADING})
        }, 500);
    }
    const onDeleteSubmit = async ({seasonId}) => {
        await deleteSeasonAction(seasonId);
    }

    return <Box className={classes.root} display={'flex'} flexDirection={'column'} alignItems='center'>
        <AdminTable objects={seasons}
                    showableColumns={showableColumns} searchableColumns={showableColumns}
                    editableColumns={editableColumns} addableColumns={addableColumns}
                    mapping={mapping}
                    mappingInput={mappingInputs}
                    onEditSubmit={(values, row) => console.log('edit', values, row)}
                    onEditSuccess={() => console.log('hi edit')}
                    isDeletable={true}
                    onDelete={onDeleteSubmit}
                    onDeleteSuccess={fetchSeasons}
                    isAddable={true}
                    hasWritePrivilege={true}
                    onAddSubmit={onAddSubmit}
                    onAddSuccess={fetchSeasons}
                    onRowClick={(row) => history.push('/seasonal-rates-weekdays/' + row.seasonId)}
                    editValidationSchema={seasonValidationSchema}
                    addValidationSchema={seasonValidationSchema}
                    tableName={'Seasonal rates'} />
    </Box>
}

export default SeasonalRates;

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        padding: 16,
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`
    },
});