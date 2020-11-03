import {DialogContent, DialogContentText, TextField} from "@material-ui/core";
import React, {useState, useEffect} from "react";
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
import PropTypes from "prop-types";

const useStyles = makeStyles({
    marginTop16: {
        marginTop: 16,
    }
});

function RegistrationForm({ setIsRegistration }) {
    let emailInput = React.createRef();
    const classes = useStyles();
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
            axios.post("http://localhost:8080/api/users/", {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                dateOfBirth: values.dateOfBirth,
                gender: values.gender
            })
            .then(() => {
                setIsRegistration(false);
            })
            .catch(() => {
                setFieldError("email", "Email already exists");
                console.log(emailInput.current);
            })
        },
    });
    const [dataFocused, setDataFocused] = useState(false);

    return (
        <DialogContent>
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
                    fullWidth
                    ref={emailInput}>
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
                    type={!values.dateOfBirth && !dataFocused ? "text" : "date"}
                    onFocus={() => setDataFocused(true)}
                    onBlur={() => setDataFocused(false)}
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
        </DialogContent>
    );
}

RegistrationForm.propTypes = {
    setIsRegistration: PropTypes.func.isRequired,
};

export default RegistrationForm;