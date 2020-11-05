import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextFieldWithError from "../../../shared/TextFieldWithError";
import Button from "@material-ui/core/Button";
import {useFormik} from "formik";
import axios from "axios";
import {searchSchema} from "../../../utils/validationSchemas";
import {Link as Scroll} from "react-scroll";
import FormHelperText from "@material-ui/core/FormHelperText";
import HotelCard from "../../../components/HotelCard";
import fetchUserAction from "../../../actions/userContextActions/fetchUserAction";
import AvailabilityContext from "../../../contexts/availabilityContext";
import fetchAvailableHotels from "../../../actions/availabilityContextActions/fetchAvailableHotels";

const useStyles = makeStyles({
    formControl: {
        minWidth: 170,
    },
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
    }
});

/**
 * @return {boolean}
 */
function AvailiabilityForm() {
    const classes = useStyles();
    const [cities, setCities] = useState([]);
    const {state, dispatch} = useContext(AvailabilityContext);

    useEffect(() => {
        async function fetchCities() {
            try {
                const response = await axios.get("/api/hotels/cities");
                setCities(response.data);
            } catch(error) {
                console.log(error);
                alert("Error fetching cities!");
            }
        }
        fetchCities().then(() => console.log("fetched"));
    }, [setCities]);


    const {handleBlur, handleChange, values, handleSubmit, errors, touched, isValid, setFieldError} = useFormik({
        onSubmit: async () => {
            const errors = await fetchAvailableHotels(dispatch, values);
            if(errors && errors.length) {
                errors.forEach((error) => {
                    setFieldError(error.field || "numberOfPeople", error.message);
                })
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
            <TextFieldWithError name="numberOfPeople" label="Number of people" fullWidth
                                errorMessage={errors.numPeople}
                                error={touched.numPeople && !!errors.numPeople}
                                className={classes.marginBottom12}
            />
            <div className={`${classes.row} ${classes.marginBottom12}`}>
                <FormControl required className={classes.formControl} error={touched.city && !!errors.city}>
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
                <TextFieldWithError label="From" type="date" name="checkInDate"
                                    InputLabelProps={{
                                        shrink: true,
                                    }} errorMessage={errors.fromDate} error={touched.fromDate && !!errors.fromDate} />
                <TextFieldWithError label="To" type="date" name={"checkOutDate"}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} errorMessage={errors.toDate} error={touched.toDate && !!errors.toDate}/>
            </div>

            <Button
                disabled={!isValid}
                variant="contained"
                color="primary"
                type={'submit'}
                className={classes.button}
            >
                Search
            </Button>
        </form>
    );
}


export default AvailiabilityForm;