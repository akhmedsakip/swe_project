import axios from "axios";

export default async function deleteEmployeeScheduleAction({employeeId, dayOfWeek}) {
    try {
        await axios.delete('/api/schedules', {data: {employeeId, dayOfWeek}});
    } catch(error) {
        throw error;
    }
}