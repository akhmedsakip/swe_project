import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {useFormik} from "formik";
import {editEmployeeFormSchema} from "../utils/validationSchemas";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TextFieldWithError from '../shared/TextFieldWithError';
import {makeStyles} from "@material-ui/core/styles";

const EditEmployeeForm = () => {

    let userInfo = { From: '', To: '', Salary: '' }
    const formik = useFormik({
        initialValues: {
            userInfo            
        },
        initialErrors: Object.fromEntries(Object.entries({userInfo}).map(([key]) => [key, ""])),
        onSubmit: values => {
            console.log("Form info", values);
        },
        validationSchema: editEmployeeFormSchema
      });

    return (
            <form onSubmit={formik.handleSubmit}>
                <TextField label="Work from"
                        name="From"
                        id="From"
                        type="time"
                        onChange={formik.handleChange} 
                        value={formik.values.From}
                        error={!!formik.errors.From}
                        InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                        fullWidth/>
                <TextField label="Works till"
                        name="To"
                        id="To"
                        type="time"
                        onChange={formik.handleChange} 
                        value={formik.values.To}
                        error={!!formik.errors.To}
                        InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                        fullWidth/>
                <TextField label="Salary per hour"
                        name="Salary"
                        id="Salary"
                        onChange={formik.handleChange} 
                        value={formik.values.Salary}
                        error={!!formik.errors.Salary}
                        fullWidth/>

                {/* <Button color="primary" type={'submit'}>
                    Submit
                </Button> */}
            </form>  
        
    );
};

export default EditEmployeeForm;