import axios from "axios";

export default async function editSeasonAction({seasonId, name, startDate, endDate, advisory}) {
    try {
        await axios.put('/api/seasons', {seasonId, name, startDate, endDate, advisory});
    } catch(error) {
        throw error;
    }
}