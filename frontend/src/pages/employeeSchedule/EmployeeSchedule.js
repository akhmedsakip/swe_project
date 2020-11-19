import { makeStyles } from '@material-ui/core';
import React, {useState} from 'react';
import EmployeeScheduleTable from './components/EmployeeScheduleTable';
import MyOrdersContext from "../../contexts/EmployeeScheduleContext";
import DeleteDialog from "../../components/DeleteDialog";
import EditDialog from "../../components/EditDialog";

function EmployeeSchedule() {
    const [changeEmployee, setChangeEmployee] = useState(false);
    const [deletion, setDeletion] = useState(false);
    const classes = useStyles();

    return <MyOrdersContext.Provider style={{ width: '100%' }} value={{ deletion, setDeletion, changeEmployee, setChangeEmployee }}>
    <div className={classes.root}>
        <EmployeeScheduleTable />
        <DeleteDialog onClose={() => setDeletion(false)} open={deletion} questionText={'Do you confirm deletion of this employee from the database? It cannot be restored.'}/>
        <EditDialog onClose={() => setChangeEmployee(false)} open={changeEmployee} name={'Edit Employee'} labels={['First Name', 'Last Name', 'Phone Number', 'Salary']}/>
    </div>
    </MyOrdersContext.Provider>
}

export default EmployeeSchedule;

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

