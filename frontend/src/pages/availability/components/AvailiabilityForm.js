import { makeStyles } from '@material-ui/core/styles';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextFieldWithError from "../../../shared/TextFieldWithError";
import {useFormik} from "formik";
import {searchSchema} from "../../../utils/validationSchemas";
import FormHelperText from "@material-ui/core/FormHelperText";
import fetchAvailableHotelsAction from "../../../actions/availability/fetchAvailableHotelsAction";
import { useHistory } from 'react-router-dom';
import fetchCitiesAction from "../../../actions/availability/fetchCitiesAction";
import AppContext from "../../../store/AppContext";
import useSubmit from "../../../hooks/useSubmit";
import LoadingButton from "../../../components/LoadingButton";
import Spinner from "../../../components/Spinner";
import {
    AVAILABILITY_SET_LOADING,
    AVAILABILITY_UNSET_LOADING
} from "../../../store/availability/availabilityActionTypes";
import TextField from "@material-ui/core/TextField";


function AvailiabilityForm() {
    const classes = useStyles();
    const timeout = useRef(setTimeout(() => {}));
    const {state, dispatch} = useContext(AppContext);
    const {cities} = state.availability;
    const [citiesLoading, setCitiesLoading] = useState(true);
    const history = useHistory();
    const initialValues = useRef({
        numberOfPeople: 0,
        checkInDate: "",
        checkOutDate: "",
        city: "",
    });

    const action = async () => {
        dispatch({type: AVAILABILITY_SET_LOADING})
        await fetchAvailableHotelsAction(dispatch, values);
    }
    const onSuccess = () => {
        history.push('/availability/hotels');
        dispatch({type: AVAILABILITY_UNSET_LOADING});
    }
    const onErrorArray = (serverErrors) => {
        serverErrors.forEach(error => setFieldError(error.field || "numberOfPeople", error.message))
    };
    const onError = (serverError) => {
        setFieldError("numberOfPeople", serverError.message || "Server error");
    };
    const {loading, onSubmit} = useSubmit(action, onSuccess, onErrorArray, onError);

    useEffect(() => {
        fetchCitiesAction(dispatch).catch((error) => alert(error));
    }, []);

    useEffect(() => {
        if(cities.length) {
            timeout.current = setTimeout(() => setCitiesLoading(false), 500);
        }
        return () => clearTimeout(timeout.current);
    }, [cities]);

    const {handleBlur, handleChange, values, handleSubmit, errors, touched, isValid, setFieldError} = useFormik({
        onSubmit,
        initialValues,
        initialErrors: initialValues,
        validationSchema: searchSchema,
    });
    if(citiesLoading) {
        return <div className={classes.spinnerContainer}>
            <Spinner size={'big'} />
        </div>
    }

    console.log(errors)
    console.log(errors.numberOfPeople)

    return (
        <form onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit} className={classes.root}>
            <div className={`${classes.row} ${classes.marginBottom12}`}>
                <TextFieldWithError name="numberOfPeople" label="Number of people"
                                    helperText={!!errors.numberOfPeople ? errors.numberOfPeople : null}
                                    // errorMessage={errors.numberOfPeople}
                                    fullWidth
                                    error={!!errors.numberOfPeople}
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
                <TextField
                    label="From"
                    type="date"
                    name="checkInDate"
                    fullWidth
                    className={classes.marginRight16}
                    InputLabelProps={{shrink: true}}
                    helperText={!!errors.checkInDate ? errors.checkInDate : null}
                    // errorMessage={errors.checkInDate}
                    error={!!errors.checkInDate}
                />
                <TextField
                    label="To"
                    type="date"
                    name="checkOutDate"
                    fullWidth
                    className={classes.marginRight16}
                    InputLabelProps={{shrink: true}}
                    helperText={!!errors.checkOutDate ? errors.checkOutDate : null}
                    // errorMessage={errors.checkOutDate}
                    error={!!errors.checkOutDate}
                />
            </div>
            <LoadingButton loading={loading} disabled={!isValid} variant="contained"
                           color="primary" type={'submit'} className={classes.button}>
                Search
            </LoadingButton>
        </form>
    );
}


export default AvailiabilityForm;

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

    spinnerContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
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
