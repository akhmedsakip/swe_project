import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {useFormik} from "formik";
import {editFormLineSchema} from "../utils/validationSchemas";
import AllReservationsContext from "../contexts/AllReservationsContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TextFieldWithError from '../shared/TextFieldWithError';


const EditForm = () => {
    let userInfo = { FirstName: '', LastName: '', PhoneNumber: '' }
    const formik = useFormik({
        initialValues: {
            userInfo            
        },
        initialErrors: Object.fromEntries(Object.entries({userInfo}).map(([key]) => [key, ""])),
        onSubmit: values => {
            console.log("Form info", values);
        },
        validationSchema: editFormLineSchema
      });

    return (
            <form onSubmit={formik.handleSubmit}>
                <TextField label="First Name"
                        name="FirstName"
                        id="FirstName"
                        onChange={formik.handleChange} 
                        value={formik.values.FirstName}
                        error={!!formik.errors.FirstName}
                        fullWidth/>
                <TextField label="Last Name"
                        name="LastName"
                        id="LastName"
                        onChange={formik.handleChange} 
                        value={formik.values.LastName}
                        error={!!formik.errors.LastName}
                        fullWidth/>
                <TextField label="Phone Number"
                        name="PhoneNumber"
                        id="PhoneNumber"
                        onChange={formik.handleChange} 
                        value={formik.values.PhoneNumber}
                        error={!!formik.errors.PhoneNumber}
                        fullWidth/>
                <Button color="primary" type={'submit'}
                            variant={'outlined'} >
                            Submit
                </Button>
            </form>  
        
    );
};

EditForm.propTypes = {
    closeDialog: PropTypes.func.isRequired,
};

export default EditForm;