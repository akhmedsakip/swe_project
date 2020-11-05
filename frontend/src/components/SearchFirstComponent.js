import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextFieldWithError from "../shared/TextFieldWithError";
import Button from "@material-ui/core/Button";
import {useFormik} from "formik";
import axios from "axios";
import {searchSchema} from "../utils/validationSchemas";
import {Link as Scroll} from "react-scroll";
import FormHelperText from "@material-ui/core/FormHelperText";
import HotelCard from "./HotelCard";
import fetchUserAction from "../actions/userContextActions/fetchUserAction";

const useStyles = makeStyles({
    formControl: {
        minWidth: 170,
    },
    root: {
        maxWidth: 345,
        margin: '1vmax'
    },

    link: {
        color: 'black',
        textDecoration: 'none',
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
    }
});

/**
 * @return {boolean}
 */
function SearchFirstComponent({ setSearchSuccess, cities }) {
    const classes = useStyles();
    const [availableHotels, setAvailableHotels] = useState([]);

    const {handleBlur, handleChange, values, handleSubmit, errors, touched, isValid} = useFormik({
        onSubmit: () => {
            console.log(values);
            axios.get("/api/hotels/availableHotels")
                .then(response => {
                    setAvailableHotels(response.data);
                })
                .catch(error => {
                    console.log(error);
                    alert("Error fetching roomTypes!");
                });
        },
        initialValues: {
            numPeople: 0,
            country: "",
            fromDate: "",
            toDate: "",
            city: "",
        },
        initialErrors: {
            numPeople: "",
            country: "",
            fromDate: "",
            toDate: "",
            city: "",
        },
        validationSchema: searchSchema,
    });

    useEffect(() => {
        console.log(values, errors);
    }, [values, errors]);
    return (
        <form onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextFieldWithError
                    required
                    id="numPeople"
                    name="numPeople"
                    label="Number of people"
                    fullWidth
                    autoComplete="shipping postal-code"
                    errorMessage={errors.numPeople}
                    error={touched.numPeople && !!errors.numPeople}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextFieldWithError
                    required
                    id="country"
                    name="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    errorMessage={errors.country}
                    error={touched.country && !!errors.country}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl required className={classes.formControl} error={touched.city && !!errors.city}>
                    <InputLabel id="demo-controlled-open-select-label">City</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="city"
                        name="city"
                        // value={city}
                        // onChange={handleChangeCity}
                        native inputProps={{name: 'city'}}
                    >
                        <option aria-label="None" value="" />
                        {cities.map(city => {
                            return (
                                <option value={'city'}>{city}</option>
                            );
                        })}
                    </Select>
                    {touched.city && !!errors.city ?
                        <FormHelperText error>{errors.city}</FormHelperText> : null }
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextFieldWithError
                    required
                    id="fromDate"
                    name="fromDate"
                    label="From"
                    type="date"
                    // className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    errorMessage={errors.fromDate}
                    error={touched.fromDate && !!errors.fromDate}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextFieldWithError
                    required
                    id="toDate"
                    name="toDate"
                    label="To"
                    type="date"
                    // className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    errorMessage={errors.toDate}
                    error={touched.toDate && !!errors.toDate}
                />
            </Grid>
                <Scroll to="section-2" smooth={true}>
                    <Button
                        disabled={!isValid}
                        variant="contained"
                        color="primary"
                        type={'submit'}
                        className={classes.button}
                    >
                        {'Search'}
                    </Button>
                </Scroll>
        </Grid>
            <TextFieldWithError name="numPeople" label="Number of people" fullWidth
                errorMessage={errors.numPeople}
                error={touched.numPeople && !!errors.numPeople}
            />
            <TextFieldWithError name="country" label="Country" fullWidth
                errorMessage={errors.country}
                error={touched.country && !!errors.country}
            />
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
            <TextFieldWithError label="From" type="date" name="fromDate"
                InputLabelProps={{
                    shrink: true,
                }} errorMessage={errors.fromDate} error={touched.fromDate && !!errors.fromDate} />
            <TextFieldWithError label="To" type="date" name={"toDate"}
                InputLabelProps={{
                    shrink: true,
                }} errorMessage={errors.toDate} error={touched.toDate && !!errors.toDate}/>
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

SearchFirstComponent.propTypes = {
    setSearchSuccess: PropTypes.func,
    cities: PropTypes.array.isRequired,
}

export default SearchFirstComponent;