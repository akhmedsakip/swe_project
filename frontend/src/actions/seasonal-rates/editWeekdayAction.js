import axios from "axios";

export default async function editWeekdayAction({seasonId, dayOfWeek, coefficient}) {
    try {
        await axios.put('/api/seasons/weekdays', {seasonId, dayOfWeek, coefficient});
    } catch(error) {
        throw error;
    }
}