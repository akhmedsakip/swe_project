import {useState} from "react";

const useFetch = (action) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    async function onSubmit(values) {
        let serverErrors = null;
        let result = null;
        try {
            setLoading(true);
            result = await action(values);
        } catch(error) {
            serverErrors = error.response.data;
        } finally {
            setTimeout(() => {
                setLoading(false);
                setResult(result);
                setError(serverErrors);
            }, 500);
        }
    }
    return {loading, onSubmit, result, error};
};


export default useFetch;