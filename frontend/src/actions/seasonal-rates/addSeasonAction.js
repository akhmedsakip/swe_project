import axios from "axios";

export default async function addSeasonAction({name, startDate, endDate, advisory}) {
    try {
        await axios.post('/api/seasons', {name, startDate, endDate, advisory});
    } catch(error) {
        throw error;
    }
}

