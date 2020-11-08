import {useState} from "react";

const useSubmit = (action, onSuccess, onErrorArray, onError) => {
    const [loading, setLoading] = useState(false);
    async function onSubmit() {
        let serverErrors;
        try {
            setLoading(true);
            await action();
        } catch(error) {
            serverErrors = error.response.data;
        } finally {
            setTimeout(() => {
                setLoading(false);
                if(serverErrors?.length) {
                    onErrorArray(serverErrors);
                } else if(serverErrors) {
                    onError(serverErrors);
                } else {
                    onSuccess();
                }
            }, 500);
        }
    }
    return {loading, onSubmit};
};

export default useSubmit;