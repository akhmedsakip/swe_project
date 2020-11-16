<<<<<<< HEAD
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


function AvailiabilityForm() {
    const classes = useStyles();
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

    const action = async () => fetchAvailableHotelsAction(dispatch, values);
    const onSuccess = () => history.push('/availability/hotels');
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
            setTimeout(() => setCitiesLoading(false), 500);
        }
    }, [cities]);

    useEffect(() => {
        if(loading) {
            dispatch({type: AVAILABILITY_SET_LOADING})
        } else {
            dispatch({type: AVAILABILITY_UNSET_LOADING});
        }
    }, [loading, dispatch]);

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
=======
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


function AvailiabilityForm() {
    const classes = useStyles();
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
            setTimeout(() => setCitiesLoading(false), 500);
        }
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
>>>>>>> f9ff2b1c20937275384526ff481c6774c5a2fc29
