import axios from "axios";

export default async function editEmployeeScheduleAction({employeeId, startTime, endTime, dayOfWeek}) {
    try {
        await axios.put('/api/schedules', {employeeId, workingDay: {
            dayOfWeek, startTime, endTime
            }});
    } catch(error) {
        throw error;
    }
}