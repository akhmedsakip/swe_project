import axios from "axios";

export default async function editSeasonsAction({seasonId, dayOfWeek, coefficient}) {
    try {
        await axios.put('/api/seasons', {seasonId, dayOfWeek, coefficient});
    } catch(error) {
        throw error;
    }
}