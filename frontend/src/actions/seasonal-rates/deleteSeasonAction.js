import axios from "axios";
export default async function deleteSeasonAction(seasonId) {
    try {
        await axios.delete('/api/seasons', {data: {seasonId}});
    } catch(error) {
        throw error;
    }
}