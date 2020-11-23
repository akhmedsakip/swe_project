import InteractiveTable from "../../../components/interactive-table/InteractiveTable";
import React from "react";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";

const objects = [
    {
        "employeeID": "1",
        "dayOfWeek": 'Monday',
        "startTime": "7:30",
        "endTime": "13:30"
    },
    {
        "employeeID": "2",
        "dayOfWeek": 'Tuesday',
        "startTime": "8:00",
        "endTime": "11:30"
    },
    {
        "employeeID": "3",
        "dayOfWeek": 'Wednesday',
        "startTime": "9:00",
        "endTime": "13:00"
    },
    {
        "employeeID": "4",
        "dayOfWeek": 'Thursday',
        "startTime": "11:30",
        "endTime": "16:30"
    },
    {
        "employeeID": "5",
        "dayOfWeek": 'Friday',
        "startTime": "12:30",
        "endTime": "17:30"
    },
    {
        "employeeID": "6",
        "dayOfWeek": 'Saturday',
        "startTime": "12:00",
        "endTime": "18:00"
    }
]

const mapping = {
    "employeeID": "Employee ID",
    "dayOfWeek": "Day Of Week",
    "startTime": "Start Time",
    "endTime": "End Time"
}

const editableColumns = [
    "employeeID", "dayOfWeek", "startTime", "endTime",
];

const addableColumns = [
    "employeeID", "dayOfWeek", "startTime", "endTime",
];

const mappingInput = {
    "employeeID": "text",
    "dayOfWeek": "text",
    "startTime": "datetime-local",
    "endTime": "datetime-local"
}

const schema = yup.object().shape({
    employeeID: yup.string().required("Employee ID is empty"),
    dayOfWeek: yup.string().required("Day Of Week is empty"),
    startTime: yup.string().required("Start Time is empty"),
    endTime: yup.string().required("End Time is empty"),
});

const EmployeeWorkingDays = () => {
    const classes = useStyles();
    return <Box className={classes.root} display={'flex'} flexDirection={'column'} alignItems='center'>
        <InteractiveTable
                       editableColumns={editableColumns}
                       showableColumns={Object.keys(objects[0])}
                       mapping={mapping}
                       mappingInput={mappingInput}
                       showBackButton={true}
                       isEditable={true}
                       isAddable={false}
                       isDeletable={true}
                       tableName={'Manager: Employee Working Days'}
                       onEditSubmit={(values) => console.log('edit', values)}
                       onEditSuccess={() => console.log('success edit')}
                       addableColumns={addableColumns}
                       onAddSubmit={(values) => console.log('add', values)}
                       onAddSuccess={() => console.log('success add')}
                       hasWritePrivilege={true}
                       editValidationSchema={schema}
                       searchableColumns={Object.keys(objects[0])} objects={objects}/>
    </Box>
}

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        padding: 16,
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`
    },
})

export default EmployeeWorkingDays;