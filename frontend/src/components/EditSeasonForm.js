import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {useFormik} from "formik";
import {editSeasonFormSchema} from "../utils/validationSchemas";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TextFieldWithError from '../shared/TextFieldWithError';
import {makeStyles} from "@material-ui/core/styles";

const EditSeasonForm = () => {

    let userInfo = { Coeff: ''}
    const formik = useFormik({
        initialValues: {
            userInfo            
        },
        initialErrors: Object.fromEntries(Object.entries({userInfo}).map(([key]) => [key, ""])),
        onSubmit: values => {
            console.log("Form info", values);
        },
        validationSchema: editSeasonFormSchema
      });

    return (
            <form onSubmit={formik.handleSubmit}>
                <TextField label="Coefficient"
                        name="Coeff"
                        id="Coeff"
                        onChange={formik.handleChange} 
                        value={formik.values.Coeff}
                        error={!!formik.errors.Coeff}
                        fullWidth/>

                {/* <Button color="primary" type={'submit'}>
                    Submit
                </Button> */}
            </form>  
        
    );
};

export default EditSeasonForm;