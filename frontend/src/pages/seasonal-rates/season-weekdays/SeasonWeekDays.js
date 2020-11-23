import InteractiveTable from "../../../components/interactive-table/InteractiveTable";
import {weekdayValidationSchema} from "../../../utils/validationSchemas";
import Box from "@material-ui/core/Box";
import React, {useContext, useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core";
import AppContext from "../../../store/AppContext";
import fetchWeekdaysAction from "../../../actions/seasonal-rates/fetchWeekdaysAction";
import {INTERACTIVE_TABLE_SET_LOADING, INTERACTIVE_TABLE_UNSET_LOADING} from "../../../store/interactive-table/interactiveTableActionTypes";
import { useParams } from 'react-router-dom';
import editWeekdayAction from "../../../actions/seasonal-rates/editWeekdayAction";
import {WRITE_ALL_SCHEDULES} from "../../../store/user/userPrivelegesTypes";

// const objects = [
//     {"dayOfWeek":"Monday","startTime":"11:00:00","endTime":"12:00:00"},
//     {"dayOfWeek":"Sunday","startTime":"11:00:00","endTime":"20:00:00"},
//     {"dayOfWeek":"Tuesday","startTime":"11:00:00","endTime":"12:00:00"}
// ];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const showableColumns = ['dayOfWeek', 'coefficient'];

const mapping = {
    dayOfWeek: 'Day of week',
    coefficient: 'Coefficient',
};

const mappingInputs = {
    startTime: 'time',
    coefficient: 'text',
}

const editableColumns = ['coefficient']

function fillAllDays(coefficients) {
    return days.map((day) => coefficients.find((weekday) => weekday.dayOfWeek === day)
        || {dayOfWeek: day, coefficient: 1})
}

const SeasonWeekDays = () => {
    const classes = useStyles();
    let { id } = useParams();
    // const timeout = useRef(0);
    const {state, dispatch} = useContext(AppContext);
    const { weekdays } = state.seasonalRates;
    const {userInfo} = state.user;
    const [seasonWeekDays, setSeasonWeekDays] = useState([])

    useEffect(() => {
        fetchWeekDays();
    }, []);

    useEffect(() => {
        console.log(fillAllDays(weekdays));
        setSeasonWeekDays(fillAllDays(weekdays));
    }, [weekdays])

    const fetchWeekDays = async () => {
        dispatch({type: INTERACTIVE_TABLE_SET_LOADING})
        await fetchWeekdaysAction(id, dispatch);
        setTimeout(() => {
            dispatch({type: INTERACTIVE_TABLE_UNSET_LOADING})
        }, 500);
    }

    const onEditSubmit = async({coefficient}, {dayOfWeek}) => {
        await editWeekdayAction({seasonId: id, coefficient, dayOfWeek});
    }

    const onDelete = async({dayOfWeek}) => {
        await editWeekdayAction({seasonId: id, coefficient: 1, dayOfWeek})
    }

    return <Box className={classes.root} display={'flex'} flexDirection={'column'} alignItems='center'>
        <InteractiveTable objects={seasonWeekDays}
                          showableColumns={showableColumns} searchableColumns={showableColumns}
                          editableColumns={editableColumns}
                          mapping={mapping}
                          mappingInput={mappingInputs}
                          onEditSubmit={onEditSubmit}
                          onEditSuccess={fetchWeekDays}
                          isDeletable={true}
                          isEditable={true}
                          onDelete={onDelete}
                          onDeleteSuccess={fetchWeekDays}
                          isAddable={false}
                          hasWritePrivilege={userInfo?.privileges?.includes(WRITE_ALL_SCHEDULES)}
                          showBackButton={true}
                          editValidationSchema={weekdayValidationSchema}
                          addValidationSchema={weekdayValidationSchema}
                          tableName={'Season weekdays'} />
    </Box>
}

export default SeasonWeekDays;

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        padding: 16,
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`
    },
});