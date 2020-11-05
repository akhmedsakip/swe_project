import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
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

function SearchFirstComponent({ setSearchSuccess, cities }) {
    const classes = useStyles();
    const [city, setCity] = React.useState('');
    const [open, setOpen] = React.useState(false);
    // const [failedSearch, setFailedSearch] = useState(false);

    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const {handleBlur, handleChange, values, handleSubmit, errors, touched, isValid} = useFormik({
        onSubmit: () => setSearchSuccess(true),
        initialValues: {
            numPeople:0,
            country: "",
            city: "",
        },
        initialErrors: {
            numPeople:0,
            country: "",
            city: "",
        },
        validationSchema: searchSchema,
    });

    return (
        <form onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextFieldWithError
                    required
                    id="numPeople"
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
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={city}
                        onChange={handleChangeCity}
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
        </form>
    );
}

SearchFirstComponent.propTypes = {
    setSearchSuccess: PropTypes.func,
    cities: PropTypes.array.isRequired,
}

export default SearchFirstComponent;