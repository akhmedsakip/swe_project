import axios from "axios";
export default async function deleteSeasonAction() {
    try {
        await axios.delete('/api/seasons');
    } catch(error) {
        throw error;
    }
}