import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {useFormik} from "formik";
import {editReservationFormSchema} from "../utils/validationSchemas";
import AllReservationsContext from "../contexts/AllReservationsContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import TextFieldWithError from '../shared/TextFieldWithError';
import {makeStyles} from "@material-ui/core/styles";

const EditReservationForm = () => {
    let userInfo = { FirstName: '', LastName: '', PhoneNumber: '', Gender: ''}
    const formik = useFormik({
        initialValues: {
            userInfo            
        },
        initialErrors: Object.fromEntries(Object.entries({userInfo}).map(([key]) => [key, ""])),
        onSubmit: values => {
            console.log("Form info", values);
        },
        validationSchema: editReservationFormSchema
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
                <Select fullWidth native onChange={formik.handleChange.Gender} value={formik.values.Gender}
                                  inputProps={{dir:'rtl'}} error={!!formik.errors.Gender}>
                    <option aria-label="None" value="" />
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Select>

                {/* <Button color="primary" type={'submit'}>
                    Submit
                </Button> */}
            </form>  
        
    );
};

export default EditReservationForm;