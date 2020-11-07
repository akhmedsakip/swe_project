import {FormHelperText} from "@material-ui/core";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useFormik} from "formik";
import TextFieldWithError from "../../shared/TextFieldWithError";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {loginSchema} from "../../utils/validationSchemas";
import loginAction from "../../actions/userContextActions/loginAction";
import AppContext from "../../store/AppContext";


function LoginForm() {
    const {dispatch, state} = useContext(AppContext);
    const [failMessage, setFailMessage] = useState("");
    const {loginMessage} = state.auth;
    const initialValues = useRef({
        email: "",
        password: "",
    });

    async function onSubmit() {
        try {
            await loginAction(dispatch, values.email, values.password);
        } catch(error) {
            const serverErrors = error.response.data;
            if(serverErrors.length) {
                setFailMessage("Email or password is incorrect");
            } else if(serverErrors) {
                setFailMessage("Server error");
            }
        }

    }

    const classes = useStyles();
    const {handleBlur, handleChange, values, handleSubmit, errors, touched, isValid} = useFormik({
        onSubmit,
        initialValues,
        initialErrors: initialValues,
        validationSchema: loginSchema,
    });
    return (<>
            {
                failMessage ? <FormHelperText error>{failMessage}</FormHelperText> : null
            }
            {
                loginMessage ? <FormHelperText className={classes.success}>{loginMessage}</FormHelperText> : null
            }
            <form onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit}>
                <TextFieldWithError margin="dense" id="email" label="Email Address"
                    type="email" fullWidth error={touched.email && !!errors.email}
                    errorMessage={errors.email}
                />
                <TextFieldWithError margin="dense" id="password" label="Password"
                    type="password" fullWidth error={touched.password && !!errors.password}
                    errorMessage={errors.email} autocomplete={"on"}
                />
                <Button disabled={!isValid} className={classes.marginTop16} type={'submit'}
                        variant={'outlined'} color={'primary'}>
                    Login
                </Button>
            </form>
        </>
    );
}

export default LoginForm;

const useStyles = makeStyles({
    marginTop16: {
        marginTop: 16,
    },
    success: {
        color: "green"
    }
});