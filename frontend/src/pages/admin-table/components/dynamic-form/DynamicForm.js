import useFetch from "../../../../hooks/useFetch";
import {useFormik} from "formik";
import Box from "@material-ui/core/Box";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextFieldWithError from "../../../../shared/TextFieldWithError";
import LoadingButton from "../../../../components/LoadingButton";
import React, {useContext, useEffect, useState} from "react";
import AdminTableContext from "../../../../contexts/AdminTableContext";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";

const DynamicForm = ({row, onSubmitAction, onSuccess, columns, initialValues, initialErrors, validationSchema}) => {
    const {mapping, mappingInput} = useContext(AdminTableContext);
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState('');
    const classes = useStyles();

    const {loading, onSubmit, result, error} = useFetch(onSubmitAction);

    const {touched, values, errors, handleChange, handleBlur, handleSubmit, setFieldError, isValid } = useFormik({
        initialValues,
        initialErrors,
        validationSchema: validationSchema,
        onSubmit: (values) => onSubmit(values, row)
    });

    useEffect(() => {
        if(result === null) {
            return;
        }
        setServerError('');
        Promise.resolve(onSuccess()).then(() => setSuccess('Success'))
    }, [result])

    useEffect(() => {
        if(error === null) {
            return;
        }
        setSuccess('')
        if(error.length) {
            setServerError(error[0].message || 'Server error');
        } else {
            setServerError(error || 'Server error');
        }
    }, [error])

    return <form onSubmit={handleSubmit} onBlur={handleBlur}>
        {success ? <Box mb={'10px'}>
            <FormHelperText className={classes.success}>
                {success}
            </FormHelperText>
        </Box> : null}
        {serverError ? <Box mb={'10px'}>
            <FormHelperText error>
                {serverError}
            </FormHelperText>
        </Box> : null}
        {columns.map((column) => {
            return <FormControl key={column} fullWidth error={touched[column] && !!errors[column]}>
                <TextFieldWithError error={touched[column] && !!errors[column]}
                                    label={mapping[column]}
                                    errorMessage={errors[column]} margin="dense" name={column}
                                    type={mappingInput[column]}
                                    multiline={mappingInput[column] === 'multiline'}
                                    value={values[column]}
                                    onChange={handleChange(column)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth>
                </TextFieldWithError>
            </FormControl>
        })}
        <Box mt={'12px'}>
            <LoadingButton loading={loading}
                           disabled={!isValid}
                           type={'submit'} variant={'outlined'} color={'primary'}>
                Submit
            </LoadingButton>
        </Box>

    </form>
}

const useStyles = makeStyles(() => ({
    success: {
        color: 'green'
    }
}));

DynamicForm.propTypes = {
    row: PropTypes.object,
    onSubmitAction: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    initialValues: PropTypes.object.isRequired,
    initialErrors: PropTypes.object.isRequired,
    validationSchema: PropTypes.object
}

export default DynamicForm;