
async function fetchEmployeeScheduleAction(dispatch, values) {
  try {
    // const { data } = (await axios.get('/api/schedules?employeeId=1&dayOfWeek=Monday'));
    // dispatch({ type: EMPLOYEES_SET_SCHEDULE, payload: data });
  } catch (error) {
    throw error;
  }
}

export default fetchEmployeeScheduleAction
