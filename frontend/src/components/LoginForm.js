import {DialogContent, FormHelperText} from "@material-ui/core";
import React, {useContext, useState} from "react";
import {useFormik} from "formik";
import TextFieldWithError from "../shared/TextFieldWithError";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {loginSchema} from "../utils/validationSchemas";
import axios from "axios";
import PropTypes from "prop-types";
import AuthenticationContext from "../contexts/authenticationContext";

const useStyles = makeStyles({
    marginTop16: {
        marginTop: 16,
    },
    success: {
        color: "green"
    },
    fail: {
        color: "red"
    }
});

function LoginForm({ onClose }) {
    const { isRegistered } = useContext(AuthenticationContext);
    const [failedLogin, setFailedLogin] = useState(false);

    const classes = useStyles();
    const {handleBlur, handleChange, values, handleSubmit, errors, touched, isValid} = useFormik({
        onSubmit: () => {
            axios.post("/api/authenticate", {
                email: values.email,
                password: values.password
            })
            .then(() => {
                localStorage.setItem("email", values.email);
                onClose();
            })
            .catch(() => {
                setFailedLogin(true);
            })
        },
        initialValues: {
            email: "",
            password: "",
        },
        initialErrors: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
    });
    return (
        <DialogContent>
            {
                failedLogin ? <FormHelperText className={classes.fail}>Email or password is incorrect</FormHelperText> : null
            }
            {
                isRegistered ? <FormHelperText className={classes.success}>Successfully registered</FormHelperText> : null
            }
            <form onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit}>
                <TextFieldWithError
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    error={touched.email && !!errors.email}
                    errorMessage={errors.email}
                />
                <TextFieldWithError
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="on"
                    fullWidth
                    error={touched.password && !!errors.password}
                    errorMessage={errors.email}
                />
                <Button disabled={!isValid} className={classes.marginTop16}
                        type={'submit'} variant={'outlined'} color={'primary'}>
                    Login
                </Button>
            </form>
        </DialogContent>
    );
}

LoginForm.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default LoginForm;