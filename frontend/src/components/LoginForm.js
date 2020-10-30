import {DialogContent} from "@material-ui/core";
import React from "react";
import {useFormik} from "formik";
import TextFieldWithError from "../shared/TextFieldWithError";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {loginSchema} from "../utils/validationSchemas";

const useStyles = makeStyles({
    marginTop16: {
        marginTop: 16,
    }
});

function LoginForm() {
    const classes = useStyles();
    const {handleBlur, handleChange, handleSubmit, errors, touched, isValid} = useFormik({
        onSubmit: () => console.log("helloworld"),
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

export default LoginForm;