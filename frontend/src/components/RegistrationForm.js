import {DialogContent} from "@material-ui/core";
import React, {useState, useContext} from "react";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {useFormik} from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextFieldWithError from "../shared/TextFieldWithError";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {registrationSchema} from "../utils/validationSchemas";
import axios from "axios";
import AuthenticationContext from "../contexts/authenticationContext";
import AppContext from "../store/AppContext";
import {AUTH_SET_LOGIN_MESSAGE, AUTH_SET_REGISTRATION} from "../store/auth/authActionTypes";

const useStyles = makeStyles({
    marginTop16: {
        marginTop: 16,
    }
});

function RegistrationForm() {
    const classes = useStyles();
    const {dispatch} = useContext(AppContext);
    const {handleSubmit, handleBlur, handleChange, values, touched, errors, isValid, setFieldError} = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            dateOfBirth: "",
            gender: "",
        },
        initialErrors: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            dateOfBirth: "",
            gender: "",
        },
        validationSchema: registrationSchema,
        onSubmit: () => {
            axios.post("/api/register", {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                dateOfBirth: values.dateOfBirth,
                gender: values.gender
            })
            .then(() => {
                dispatch({type: AUTH_SET_LOGIN_MESSAGE, payload: 'Successfully registered'});
                dispatch({type: AUTH_SET_REGISTRATION});
            })
            .catch((err) => {
                if(err.response.data && err.response.data instanceof Array) {
                    err.response.data.forEach((error) => {
                        if(error.message) {
                            setFieldError(error.field || "email", error.message);
                        }
                    })
                } else {
                    setFieldError("email", "Server error");
                }
            })
        },
    });

    return (
        <>
            <form onSubmit={handleSubmit} onBlur={handleBlur} onChange={handleChange}>
                <TextFieldWithError
                    error={touched.firstName && !!errors.firstName}
                    errorMessage={errors.firstName}
                    margin="dense"
                    name="firstName"
                    label="First Name"
                    type="text"
                    fullWidth>
                </TextFieldWithError>
                <TextFieldWithError
                    error={touched.lastName && !!errors.lastName}
                    errorMessage={errors.lastName}
                    margin="dense"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth>
                </TextFieldWithError>
                <TextFieldWithError
                    error={touched.email && !!errors.email}
                    errorMessage={errors.email}
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth>
                </TextFieldWithError>
                <TextFieldWithError
                    error={touched.password && !!errors.password}
                    errorMessage={errors.password}
                    margin="dense"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth>
                </TextFieldWithError>
                <TextFieldWithError
                    error={touched.passwordConfirm && !!errors.passwordConfirm}
                    errorMessage={errors.passwordConfirm}
                    margin="dense"
                    name="passwordConfirm"
                    label="Password Confirmation"
                    type="password"
                    fullWidth>
                </TextFieldWithError>
                <TextFieldWithError
                    error={touched.dateOfBirth && !!errors.dateOfBirth}
                    errorMessage={errors.dateOfBirth}
                    margin="dense"
                    name="dateOfBirth"
                    label="Date Of Birth"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth>
                </TextFieldWithError>
                <FormControl fullWidth error={touched.gender && !!errors.gender}>
                    <InputLabel focused={false} shrink={!!values.gender}>Gender</InputLabel>
                    <Select native inputProps={{name: 'gender'}}>
                        <option aria-label="None" value="" />
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Select>
                    {touched.gender && !!errors.gender ?
                        <FormHelperText error>{errors.gender}</FormHelperText> : null }
                </FormControl>
                <Button disabled={!isValid} className={classes.marginTop16}
                        type={'submit'} variant={'outlined'} color={'primary'}>
                    Register
                </Button>
            </form>
        </>
    );
}

export default RegistrationForm;