import {useRef, useState} from "react";

const useSubmit = (action, onSuccess, onErrorArray, onError) => {
    const [loading, setLoading] = useState(false);
    async function onSubmit(values) {
        let serverErrors;
        try {
            setLoading(true);
            await action(values);
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