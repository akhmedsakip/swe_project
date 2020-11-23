import {useState} from "react";

const useFetch = (action) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    async function onSubmit(values, row) {
        let serverErrors = null;
        let result = null;
        try {
            setLoading(true);
            result = await action(values, row);
        } catch(error) {
            if(error?.response?.data) {
                serverErrors = error.response.data;
            } else if(error.message) {
                serverErrors = error.message;
            } else {
                serverErrors = "Server error";
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
                setResult({data: result});
                setError(serverErrors);
            }, 500);
        }
    }
    return {loading, onSubmit, result, error};
};


export default useFetch;