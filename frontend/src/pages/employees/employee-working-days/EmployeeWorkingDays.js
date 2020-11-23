import InteractiveTable from "../../../components/interactive-table/InteractiveTable";
import {employeeWeekdayValidationSchema} from "../../../utils/validationSchemas";
import Box from "@material-ui/core/Box";
import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import AppContext from "../../../store/AppContext";
import {INTERACTIVE_TABLE_SET_LOADING, INTERACTIVE_TABLE_UNSET_LOADING} from "../../../store/interactive-table/interactiveTableActionTypes";
import { useParams } from 'react-router-dom';
import {WRITE_ALL_ORDERS, WRITE_ALL_SCHEDULES} from "../../../store/user/userPrivelegesTypes";
import fetchEmployeeScheduleAction from "../../../actions/employees/fetchEmployeeScheduleAction";
import editEmployeeScheduleAction from "../../../actions/employees/editEmployeeScheduleAction";
import deleteEmployeeScheduleAction from "../../../actions/employees/deleteEmployeeScheduleAction";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const showableColumns = ['dayOfWeek', 'startTime', 'endTime'];

const mapping = {
    dayOfWeek: 'Day of week',
    startTime: 'Start Time',
    endTime: 'End Time'
};

const mappingInputs = {
    startTime: 'time',
    endTime: 'time'
}

const editableColumns = ['startTime', 'endTime'];

function fillAllDays(weekdays) {
    return days.map((day) => weekdays.find((weekday) =>
            weekday.dayOfWeek === day)
        || {dayOfWeek: day, startTime: null, endTime: null})
}

const EmployeeWorkingDays = () => {
    const classes = useStyles();
    let { id } = useParams();
    // const timeout = useRef(0);
    const {state, dispatch} = useContext(AppContext);
    const { weekdays } = state.employees;
    const {userInfo} = state.user;
    const [employeeWeekDays, setEmployeeWeekDays] = useState([])

    useEffect(() => {
        fetchEmployeeWeekDays();
    }, []);

    useEffect(() => {
        setEmployeeWeekDays(fillAllDays(weekdays));
    }, [weekdays])

    const fetchEmployeeWeekDays = async () => {
        dispatch({type: INTERACTIVE_TABLE_SET_LOADING})
        await fetchEmployeeScheduleAction(id, dispatch);
        setTimeout(() => {
            dispatch({type: INTERACTIVE_TABLE_UNSET_LOADING})
        }, 500);
    }

    const onEditSubmit = async({startTime, endTime}, {dayOfWeek}) => {
        await editEmployeeScheduleAction({employeeId: id,
            startTime: startTime.split(":")[0] + ":" + startTime.split(":")[1],
            endTime: endTime.split(":")[0] + ":" + endTime.split(":")[1], dayOfWeek});
    }

    const onDelete = async({dayOfWeek}) => {
        await deleteEmployeeScheduleAction({employeeId: id, dayOfWeek})
    }

    return <Box className={classes.root} display={'flex'} flexDirection={'column'} alignItems='center'>
        <InteractiveTable objects={employeeWeekDays}
                          showableColumns={showableColumns} searchableColumns={showableColumns}
                          editableColumns={editableColumns}
                          mapping={mapping}
                          mappingInput={mappingInputs}
                          onEditSubmit={onEditSubmit}
                          onEditSuccess={fetchEmployeeWeekDays}
                          isDeletable={true}
                          isEditable={true}
                          onDelete={onDelete}
                          onDeleteSuccess={fetchEmployeeWeekDays}
                          isAddable={false}
                          hasWritePrivilege={userInfo?.privileges?.includes(WRITE_ALL_SCHEDULES)}
                          showBackButton={true}
                          editValidationSchema={employeeWeekdayValidationSchema}
                          tableName={'Employee schedule'} />
    </Box>
}

export default EmployeeWorkingDays;

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        padding: 16,
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`
    },
});