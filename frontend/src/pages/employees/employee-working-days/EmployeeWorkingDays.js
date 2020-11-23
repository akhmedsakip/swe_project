import InteractiveTable from "../../../components/interactive-table/InteractiveTable";
import {employeeWeekdayValidationSchema} from "../../../utils/validationSchemas";
import Box from "@material-ui/core/Box";
import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import AppContext from "../../../store/AppContext";
import {INTERACTIVE_TABLE_SET_LOADING, INTERACTIVE_TABLE_UNSET_LOADING} from "../../../store/interactive-table/interactiveTableActionTypes";
import { useParams } from 'react-router-dom';
import {WRITE_ALL_SCHEDULES} from "../../../store/user/userPrivelegesTypes";
import fetchEmployeeScheduleAction from "../../../actions/employees/fetchEmployeeScheduleAction";
import editEmployeeScheduleAction from "../../../actions/employees/editEmployeeScheduleAction";
import deleteEmployeeScheduleAction from "../../../actions/employees/deleteEmployeeScheduleAction";

// const objects = [
//     {"dayOfWeek":"Monday","startTime":"11:00:00","endTime":"12:00:00"},
//     {"dayOfWeek":"Sunday","startTime":"11:00:00","endTime":"20:00:00"},
//     {"dayOfWeek":"Tuesday","startTime":"11:00:00","endTime":"12:00:00"}
// ];

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

// import InteractiveTable from "../../../components/interactive-table/InteractiveTable";
// import React from "react";
// import * as yup from "yup";
// import Box from "@material-ui/core/Box";
// import {makeStyles} from "@material-ui/core/styles";
//
// const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//
// const showableColumns = ['dayOfWeek', 'startTime', 'endTime'];
//
// const objects = [
//     {
//         "employeeID": "1",
//         "dayOfWeek": 'Monday',
//         "startTime": "07:30",
//         "endTime": "13:30"
//     },
//     {
//         "employeeID": "2",
//         "dayOfWeek": 'Tuesday',
//         "startTime": "08:00",
//         "endTime": "11:30"
//     },
//     {
//         "employeeID": "3",
//         "dayOfWeek": 'Wednesday',
//         "startTime": "09:00",
//         "endTime": "13:00"
//     },
//     {
//         "employeeID": "4",
//         "dayOfWeek": 'Thursday',
//         "startTime": "11:30",
//         "endTime": "16:30"
//     },
//     {
//         "employeeID": "5",
//         "dayOfWeek": 'Friday',
//         "startTime": "12:30",
//         "endTime": "17:30"
//     },
//     {
//         "employeeID": "6",
//         "dayOfWeek": 'Saturday',
//         "startTime": "12:00",
//         "endTime": "18:00"
//     }
// ]
//
// const mapping = {
//     "dayOfWeek": "Day Of Week",
//     "startTime": "Start Time (hh:mm)",
//     "endTime": "End Time (hh:mm)"
// }
//
// const editableColumns = [
//     "startTime", "endTime",
// ];
//
// const mappingInput = {
//     "startTime": "time",
//     "endTime": "time"
// }
//
// function fillAllDays(coefficients) {
//     return days.map((day) => coefficients.find((weekday) => weekday.dayOfWeek === day)
//         || {dayOfWeek: day, coefficient: 1})
// }
//
// const schema = yup.object().shape({
//     startTime: yup.string().required("Start Time is empty"),
//     endTime: yup.string().required("End Time is empty"),
// });
//
// const EmployeeWorkingDays = () => {
//     const classes = useStyles();
//     console.log(showableColumns.length);
//     return <Box className={classes.root} display={'flex'} flexDirection={'column'} alignItems='center'>
//         <InteractiveTable
//                        editableColumns={editableColumns}
//                        showableColumns={showableColumns}
//                        searchableColumns={showableColumns}
//                        mapping={mapping}
//                        mappingInput={mappingInput}
//                        showBackButton={true}
//                        isEditable={true}
//                        isAddable={false}
//                        isDeletable={true}
//                        tableName={'Employee Working Days'}
//                        onEditSubmit={(values) => console.log('edit', values)}
//                        onEditSuccess={() => console.log('success edit')}
//                        onAddSubmit={(values) => console.log('add', values)}
//                        onAddSuccess={() => console.log('success add')}
//                        hasWritePrivilege={true}
//                        editValidationSchema={schema}/>
//     </Box>
// }
//
// const useStyles = makeStyles({
//     root: {
//         minHeight: '100vh',
//         padding: 16,
//         backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`
//     },
// })
//
// export default EmployeeWorkingDays;