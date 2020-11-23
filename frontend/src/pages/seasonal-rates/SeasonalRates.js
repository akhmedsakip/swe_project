import Box from "@material-ui/core/Box";
import React, {useContext, useEffect, useRef} from "react";
import {makeStyles} from "@material-ui/core";
import InteractiveTable from "../../components/interactive-table/InteractiveTable";
import {seasonValidationSchema} from "../../utils/validationSchemas";
import AppContext from "../../store/AppContext";
import {INTERACTIVE_TABLE_SET_LOADING, INTERACTIVE_TABLE_UNSET_LOADING} from "../../store/interactive-table/interactiveTableActionTypes";
import fetchSeasonsAction from "../../actions/seasonal-rates/fetchSeasonsAction";
import addSeasonAction from "../../actions/seasonal-rates/addSeasonAction";
import deleteSeasonAction from "../../actions/seasonal-rates/deleteSeasonAction";
import {useHistory} from 'react-router-dom';
import editSeasonAction from "../../actions/seasonal-rates/editSeasonAction";
import {WRITE_ALL_SEASONS} from "../../store/user/userPrivelegesTypes";

const showableColumns = ['seasonId', 'name', 'startDate', 'endDate', 'advisory'];
const addableColumns = ['name', 'startDate', 'endDate', 'advisory'];
const editableColumns = ['name', 'startDate', 'endDate', 'advisory'];
const mapping = {
    'seasonId': 'Season ID',
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
    const {userInfo} = state.user;
    const history = useHistory();

    const {seasons} = state.seasonalRates;

    useEffect(() => {
        if(seasons.length === 0) {
            fetchSeasons();
        } else {
            emptySpinner();
        }
    }, [seasons]);

    useEffect(() => {
        return () => clearTimeout(timeout.current);
    }, [])

    const onAddSubmit = async ({name, startDate, endDate, advisory}) => {
        await addSeasonAction({name, startDate, endDate, advisory});
    }
    const emptySpinner = async () => {
        dispatch({ type: INTERACTIVE_TABLE_SET_LOADING });
        timeout.current = setTimeout(() => {
            dispatch({type: INTERACTIVE_TABLE_UNSET_LOADING})
        }, 500);
    }
    const fetchSeasons = async () => {
        dispatch({ type: INTERACTIVE_TABLE_SET_LOADING });
        await fetchSeasonsAction(dispatch);
        timeout.current = setTimeout(() => {
            dispatch({type: INTERACTIVE_TABLE_UNSET_LOADING})
        }, 500);
    }
    const onDeleteSubmit = async ({seasonId}) => {
        await deleteSeasonAction(seasonId);
    }

    const onEditSubmit = async({name, startDate, endDate, advisory}, {seasonId}) => {
        await editSeasonAction({seasonId, name, startDate, endDate, advisory});
    }

    return <Box className={classes.root} display={'flex'} flexDirection={'column'} alignItems='center'>
        <InteractiveTable objects={seasons}
                          showableColumns={showableColumns} searchableColumns={showableColumns}
                          editableColumns={editableColumns} addableColumns={addableColumns}
                          mapping={mapping}
                          mappingInput={mappingInputs}
                          onEditSubmit={onEditSubmit}
                          onEditSuccess={fetchSeasons}
                          isDeletable={true}
                          isEditable={true}
                          onDelete={onDeleteSubmit}
                          onDeleteSuccess={fetchSeasons}
                          isAddable={true}
                          hasWritePrivilege={userInfo?.privileges?.includes(WRITE_ALL_SEASONS)}
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