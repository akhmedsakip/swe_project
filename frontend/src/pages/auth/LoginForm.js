import {FormHelperText} from "@material-ui/core";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useFormik} from "formik";
import TextFieldWithError from "../../shared/TextFieldWithError";
import {makeStyles} from "@material-ui/core/styles";
import {loginSchema} from "../../utils/validationSchemas";
import loginAction from "../../actions/auth/loginAction";
import AppContext from "../../store/AppContext";
import LoadingButton from "../../components/LoadingButton";
import useSubmit from "../../hooks/useSubmit";
import {AUTH_CLOSE_DIALOG, AUTH_SET_LOGIN_MESSAGE} from "../../store/auth/authActionTypes";
import fetchUserAction from "../../actions/user/fetchUserAction";
import {USER_SET_LOADING, USER_UNSET_LOADING} from "../../store/user/userActionsTypes";


function LoginForm() {
    const {dispatch, state} = useContext(AppContext);
    const {loginMessage} = state.auth;
    const initialValues = useRef({
        email: "",
        password: "",
    });
    const action =  async () => await loginAction(dispatch, values);
    const onSuccess = async () => {
        dispatch({type: AUTH_CLOSE_DIALOG});
        dispatch({type: USER_SET_LOADING});
        await fetchUserAction(dispatch);
        dispatch({type: USER_UNSET_LOADING});
    };
    const onErrorArray = (serverErrors) => {
        const message = { message: "Email or password is incorrect", error: true };
        dispatch({type: AUTH_SET_LOGIN_MESSAGE, payload: message});
    }
    const onError = (serverError) => {
        const message = { message: serverError.message || "Server error", error: true };
        dispatch({type: AUTH_SET_LOGIN_MESSAGE, payload: message});
    }
    const {loading, onSubmit} = useSubmit(action, onSuccess, onErrorArray, onError);

    const classes = useStyles();
    const {handleBlur, handleChange, values, handleSubmit, errors, touched, isValid} = useFormik({
        onSubmit,
        initialValues,
        initialErrors: initialValues,
        validationSchema: loginSchema,
    });
    return (<>
            {
                loginMessage ?
                    <FormHelperText className={classes.success} error={loginMessage.error}>{loginMessage.message}</FormHelperText>
                    : null
            }
            <form onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit}>
                <TextFieldWithError margin="dense" id="email" label="Email Address"
                    type="email" fullWidth error={touched.email && !!errors.email}
                    errorMessage={errors.email}
                />
                <TextFieldWithError margin="dense" id="password" label="Password"
                    type="password" fullWidth error={touched.password && !!errors.password}
                    errorMessage={errors.email} autoComplete={"on"}
                />
                <LoadingButton loading={loading} disabled={!isValid} className={classes.marginTop16} type={'submit'}
                        variant={'outlined'} color={'primary'}>
                    Submit
                </LoadingButton>
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