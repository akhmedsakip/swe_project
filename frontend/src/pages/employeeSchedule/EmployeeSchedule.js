import { makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import fetchEmployeesAction from '../../actions/employees/fetchEmployeesAction';
import DeleteDialog from "../../components/DeleteDialog";
import EditDialog from "../../components/EditDialog";
import MyOrdersContext from "../../contexts/EmployeeScheduleContext";
import EmployeeScheduleTable from './components/EmployeeScheduleTable';
import { EMPLOYEES_SET_LOADING, EMPLOYEES_UNSET_LOADING } from '../../store/manager/employees/employeesActionTypes';
import AppContext from '../../store/AppContext';

function EmployeeSchedule() {
    const [changeEmployee, setChangeEmployee] = useState(false);
    const [deletion, setDeletion] = useState(false);
    const classes = useStyles();
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        (async function () {
          dispatch({ type: EMPLOYEES_SET_LOADING });
          await fetchEmployeesAction(dispatch);
          setTimeout(() => dispatch({ type: EMPLOYEES_UNSET_LOADING }), 300);
        })()
      }, []);

    return <MyOrdersContext.Provider style={{ width: '100%' }} value={{ deletion, setDeletion, changeEmployee, setChangeEmployee }}>
    <div className={classes.root}>
        <EmployeeScheduleTable />
        <DeleteDialog onClose={() => setDeletion(false)} open={deletion} questionText={'Do you confirm deletion of this employee from the database? It cannot be restored.'}/>
        <EditDialog onClose={() => setChangeEmployee(false)} open={changeEmployee} name={'Edit Employee'} labels={['First Name', 'Last Name', 'Phone Number', 'New Base Salary Per Hour']}/>
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

