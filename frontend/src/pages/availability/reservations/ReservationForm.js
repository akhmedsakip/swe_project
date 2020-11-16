import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextFieldWithError from "../../../shared/TextFieldWithError";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import {useFormik} from "formik";
import {reservationSchema} from "../../../utils/validationSchemas";

const useStyles = makeStyles({
    room: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    marginBottom10: {
        marginBottom: 10,
    }
});

const ReservationForm = () => {
    const {handleSubmit, handleBlur, handleChange, errors, touched} = useFormik({
        initialValues: {
            phoneNumber: "",
            firstName: "",
            lastName: "",
            gender: "",
        },
        initialErrors: {
            phoneNumber: "",
            firstName: "",
            lastName: "",
            gender: "",
        },
        validationSchema: reservationSchema,
        onSubmit: () => console.log("")
    });
    const classes = useStyles();
    return <form className={classes.room} onSubmit={handleSubmit} onBlur={handleBlur} onChange={handleChange}>
        <TextFieldWithError type={'text'} name={'phoneNumber'} label={'Phone Number'} fullWidth
                            errorMessage={errors.phoneNumber} error={!!errors.phoneNumber && touched.phoneNumber}/>
        <TextFieldWithError type={'text'} name={'firstName'} label={'First Name'} fullWidth
                            errorMessage={errors.firstName} error={!!errors.firstName && touched.firstName}/>
        <TextFieldWithError type={'text'} name={'lastName'} label={'Last Name'} fullWidth  errorMessage={errors.firstName}
                            error={!!errors.lastName && touched.lastName}/>
        <FormControl fullWidth className={classes.marginBottom10} error={!!errors.gender && touched.gender}>
            <InputLabel>Gender</InputLabel>
            <Select native inputProps={{name: 'gender'}}>
                <option aria-label="None" value="" />
                <option value="male">Male</option>
                <option value="female">Female</option>
            </Select>
            {!!errors.gender && touched.gender ?<FormHelperText error>{errors.gender}</FormHelperText> : null }
        </FormControl>
        <Button type={'submit'} variant={'contained'} color={'primary'}>
            Reserve
        </Button>
    </form>
};

export default ReservationForm;