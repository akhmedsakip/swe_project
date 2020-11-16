import axios from 'axios';

const registrationAction = async (dispatch, values) => {
    try {
        await axios.post("/api/register", values);
    } catch(error) {
        throw error;
    }
};

export default registrationAction;