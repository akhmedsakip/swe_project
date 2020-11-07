import React, {useContext, useEffect} from 'react';
import TextFieldWithError from "../../../shared/TextFieldWithError";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useFormik} from "formik";
import {changePasswordSchema} from "../../../utils/validationSchemas";
import changePasswordAction from "../../../actions/userContextActions/changePasswordAction";
import PropTypes from 'prop-types'
import AppContext from "../../../store/AppContext";

const useStyles = makeStyles({
    marginTop10: {
        marginTop: 10,
    }
});

const ChangePasswordForm = ({closeDialog}) => {
    const {dispatch} = useContext(AppContext);
    const {handleChange, handleBlur, handleSubmit, errors, touched, isValid, values, setFieldError} = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        },
        initialErrors: {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        },
        onSubmit: async () => {
            try {
                await changePasswordAction(values, dispatch);
            } catch(error) {
                const serverErrors = error.response.data;
                serverErrors?.forEach((error) => setFieldError(error.field || "oldPassword", error.message))
            }
        },
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
        <Button color="primary" type={'submit'} variant={'outlined'} disabled={!isValid} className={classes.marginTop10}>
            Submit
        </Button>
    </form>
};

ChangePasswordForm.propTypes = {
    closeDialog: PropTypes.func.isRequired,
};

export default ChangePasswordForm;