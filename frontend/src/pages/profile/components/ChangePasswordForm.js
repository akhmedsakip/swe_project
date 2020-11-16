import React, {useContext, useEffect, useRef, useState} from 'react';
import TextFieldWithError from "../../../shared/TextFieldWithError";
import {makeStyles} from "@material-ui/core/styles";
import {useFormik} from "formik";
import {changePasswordSchema} from "../../../utils/validationSchemas";
import changePasswordAction from "../../../actions/user/changePasswordAction";
import PropTypes from 'prop-types'
import AppContext from "../../../store/AppContext";
import LoadingButton from "../../../components/LoadingButton";
import useSubmit from "../../../hooks/useSubmit";

const useStyles = makeStyles({
    marginTop10: {
        marginTop: 10,
    }
});

const ChangePasswordForm = ({closeDialog}) => {
    const {dispatch} = useContext(AppContext);
    const initialValues = useRef({
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
    });

    const action = async () => await changePasswordAction(values, dispatch);
    const onSuccess = () => console.log("Password changed");
    const onErrorArray = (serverErrors) => {
        serverErrors.forEach(
            (error) => setFieldError(error.field || "oldPassword", error.message));
    };
    const onError = (serverError) => setFieldError('oldPassword', serverError.message || "Server error");
    const {loading, onSubmit} = useSubmit(action, onSuccess, onErrorArray, onError);
    const {handleChange, handleBlur, handleSubmit, errors, touched, isValid, values, setFieldError} = useFormik({
        initialValues,
        initialErrors: initialValues,
        onSubmit,
        validationSchema: changePasswordSchema,
    });

    const classes = useStyles();
    return <form onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit}>
        <TextFieldWithError
            label={'Old Password'}
            type={'password'}
            name={'oldPassword'}
            errorMessage={errors.oldPassword}
            error={!!errors.oldPassword && touched.oldPassword}
            fullWidth
        />
        <TextFieldWithError
            label={'New Password'}
            type={'password'}
            name={'newPassword'}
            errorMessage={errors.newPassword}
            error={!!errors.newPassword && touched.newPassword}
            fullWidth
        />
        <TextFieldWithError
            label={'Confirm New Password'}
            type={'password'}
            name={'newPasswordConfirm'}
            errorMessage={errors.newPasswordConfirm}
            error={!!errors.newPasswordConfirm && touched.newPasswordConfirm}
            fullWidth
        />
        <LoadingButton  loading={loading} color="primary" type={'submit'}
                        variant={'outlined'} disabled={!isValid} className={classes.marginTop10}>
            Submit
        </LoadingButton>
    </form>
};

ChangePasswordForm.propTypes = {
    closeDialog: PropTypes.func.isRequired,
};

export default ChangePasswordForm;