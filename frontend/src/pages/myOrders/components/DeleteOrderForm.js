import React, {useContext, useEffect, useRef, useState} from 'react';
import TextFieldWithError from "../../../shared/TextFieldWithError";
import {makeStyles} from "@material-ui/core/styles";
import {useFormik} from "formik";
import {orderDeletionSchema} from "../../../utils/validationSchemas";
import deleteOrderAction from "../../../actions/order/deleteOrderAction";
import PropTypes from 'prop-types'
import AppContext from "../../../store/AppContext";
import LoadingButton from "../../../components/LoadingButton";
import useSubmit from "../../../hooks/useSubmit";

const useStyles = makeStyles({
    marginTop10: {
        marginTop: 10,
    }
});

const DeleteOrderForm = ({closeDialog}) => {
    const {dispatch} = useContext(AppContext);
    const initialValues = useRef({
        confirmation: false,
    });

    const action = async () => await deleteOrderAction(values, dispatch);
    const onSuccess = () => console.log("Order deleted");
    const onErrorArray = (serverErrors) => {
        serverErrors.forEach(
            (error) => setFieldError(error.field || "confirmation", error.message));
    };
    const onError = (serverError) => setFieldError('confirmation', serverError.message || "Server error");
    const {loading, onSubmit} = useSubmit(action, onSuccess, onErrorArray, onError);
    const {handleChange, handleBlur, handleSubmit, errors, touched, isValid, values, setFieldError} = useFormik({
        initialValues,
        initialErrors: initialValues,
        onSubmit,
        validationSchema: orderDeletionSchema,
    });

    const classes = useStyles();
    return <form onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit}>
        <TextFieldWithError
            label={'I confirm order deletion'}
            type={'checkbox'}
            name={'confirmation'}
            errorMessage={errors.confirmation}
            error={!!errors.confirmation && touched.confirmation}
            fullWidth
        />
        <LoadingButton  loading={loading} color="primary" type={'submit'}
                        variant={'outlined'} disabled={!isValid} className={classes.marginTop10}>
            Submit
        </LoadingButton>
    </form>
};

DeleteOrderForm.propTypes = {
    closeDialog: PropTypes.func.isRequired,
};

export default DeleteOrderForm;