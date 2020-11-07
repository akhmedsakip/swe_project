import { makeStyles } from '@material-ui/core/styles';
import React, {useContext, useEffect, useState} from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextFieldWithError from "../../../shared/TextFieldWithError";
import Button from "@material-ui/core/Button";
import {useFormik} from "formik";
import axios from "axios";
import {searchSchema} from "../../../utils/validationSchemas";
import FormHelperText from "@material-ui/core/FormHelperText";
import AvailabilityContext from "../../../contexts/availabilityContext";
import fetchAvailableHotels from "../../../actions/availabilityContextActions/fetchAvailableHotels";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    link: {
        color: 'black',
        textDecoration: 'none',
    },
    row: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
    },

    description: {
        maxHeight: 200,
        overflowY: "auto",
        '&::-webkit-scrollbar': {
            width: '0.3em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        },
        paddingRight: "1rem"
    },
    marginBottom12: {
        marginBottom: 12,
    },
    marginRight16: {
        marginRight: 16,
    },
});


function AvailiabilityForm() {
    const classes = useStyles();
    const [cities, setCities] = useState([]);
    const {state, dispatch} = useContext(AvailabilityContext);
    const history = useHistory();

    useEffect(() => {
        axios.get("/api/hotels/cities")
            .then(response => setCities(response.data))
            .catch(error => console.log(error));
    }, [setCities]);


    const {handleBlur, handleChange, values, handleSubmit, errors, touched, isValid, setFieldError} = useFormik({
        onSubmit: async () => {
            const errors = await fetchAvailableHotels(dispatch, values);
            if(errors && errors.length) {
                errors.forEach((error) => {
                    setFieldError(error.field || "numberOfPeople", error.message);
                })
            } else {
                history.push('/availability/hotels');
            }
        },
        initialValues: {
            numberOfPeople: 0,
            checkInDate: "",
            checkOutDate: "",
            city: "",
        },
        initialErrors: {
            numberOfPeople: "",
            checkInDate: "",
            checkOutDate: "",
            city: ""
        },
        validationSchema: searchSchema,
    });
    return (
        <form onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit} className={classes.root}>
            <div className={`${classes.row} ${classes.marginBottom12}`}>
                <TextFieldWithError name="numberOfPeople" label="Number of people"
                                    errorMessage={errors.numPeople} fullWidth
                                    error={touched.numPeople && !!errors.numPeople}
                                    className={classes.marginRight16}
                />
                <FormControl fullWidth className={classes.marginRight16} error={touched.city && !!errors.city}>
                    <InputLabel>City</InputLabel>
                    <Select native inputProps={{name: 'city'}}>
                        <option aria-label="None" value="" />
                        {cities.map(city => {
                            return (
                                <option key={city} value={city}>{city}</option>
                            );
                        })}
                    </Select>
                    {touched.city && !!errors.city ?
                        <FormHelperText error>{errors.city}</FormHelperText> : null }
                </FormControl>
            </div>
            <div className={`${classes.row} ${classes.marginBottom12}`}>
                <TextFieldWithError label="From" type="date" name="checkInDate" fullWidth
                                    className={classes.marginRight16}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} errorMessage={errors.fromDate} error={touched.fromDate && !!errors.fromDate} />
                <TextFieldWithError label="To" type="date" name="checkOutDate" fullWidth
                                    className={classes.marginRight16}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} errorMessage={errors.toDate} error={touched.toDate && !!errors.toDate}/>
            </div>
            <Button disabled={!isValid} variant="contained" color="primary" type={'submit'} className={classes.button}>
                Search
            </Button>
        </form>
    );
}


export default AvailiabilityForm;