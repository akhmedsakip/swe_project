import {DialogContent, FormHelperText} from "@material-ui/core";
import React, {useContext, useEffect, useState} from "react";
import {useFormik} from "formik";
import TextFieldWithError from "../shared/TextFieldWithError";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {loginSchema} from "../utils/validationSchemas";
import loginAction from "../actions/userContextActions/loginAction";
import AppContext from "../store/AppContext";

const useStyles = makeStyles({
    marginTop16: {
        marginTop: 16,
    },
    success: {
        color: "green"
    }
});

function LoginForm() {
    const {dispatch, state} = useContext(AppContext);
    const [failedLogin, setFailedLogin] = useState(false);
    const {loginMessage} = state.auth;

    const classes = useStyles();
    const {handleBlur, handleChange, values, handleSubmit, errors, touched, isValid} = useFormik({
        onSubmit: async () => {
            const error = await loginAction(dispatch, values.email, values.password);
            if(error) {
                setFailedLogin(true);
            }
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
    return (<>
            {
                failedLogin ? <FormHelperText error>Email or password is incorrect</FormHelperText> : null
            }
            {
                loginMessage ? <FormHelperText className={classes.success}>{loginMessage}</FormHelperText> : null
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
        </>
    );
}


export default LoginForm;