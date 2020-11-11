import React, {useContext, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextFieldWithError from "../../../shared/TextFieldWithError";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import {useFormik} from "formik";
import {reservationSchema} from "../../../utils/validationSchemas";
import AppContext from "../../../store/AppContext";
import reserveRoom from "../../../actions/availability/reservations/reserveRoom";
import loginAction from "../../../actions/auth/loginAction";
import {AUTH_CLOSE_DIALOG} from "../../../store/auth/authActionTypes";
import {USER_SET_LOADING, USER_UNSET_LOADING} from "../../../store/user/userActionsTypes";
import fetchUserAction from "../../../actions/user/fetchUserAction";
import useSubmit from "../../../hooks/useSubmit";
import LoadingButton from "../../../components/LoadingButton";
import {
    AVAILABILITY_SET_CITIES,
    AVAILABILITY_SET_ROOM_TYPE,
    AVAILABILITY_UNSET_LOADING
} from "../../../store/availability/availabilityActionTypes";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    room: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    marginBottom10: {
        marginBottom: 10,
    },
    marginBottomTop10: {
        marginBottom: 10,
        marginTop: 10
    },
    success: {
        color: "green"
    }
});

const ReservationForm = () => {
    const {state, dispatch} = useContext(AppContext);
    const {roomType, params} = state.availability;
    const [failMessage, setFailMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [reservationDone, setReservationDone] = useState(false);
    const history = useHistory();

    const action =  async() => await reserveRoom(dispatch, {...params, roomTypeName: roomType.name, hotelId: roomType.hotelId,
        firstName: values.firstName, lastName: values.lastName, gender: values.gender,
        phoneNumber: values.phoneNumber});
    const onSuccess = async () => {
        setSuccessMessage("Room successfully reserved!\n You will be redirected to the Home Page in 3 seconds...");
        setReservationDone(true);
        setTimeout(() => {
            dispatch({type: AVAILABILITY_SET_ROOM_TYPE, payload: null})
            history.push('/');
        }, 3000);
    };
    const onErrorArray = (serverErrors) => setFailMessage("Unfortunately, the room you are looking for was already booked" +
        " during the booking process. Please, try to make a new search.");
    const onError = (serverError) => setFailMessage(serverError.message || "Server error");
    const {loading, onSubmit} = useSubmit(action, onSuccess, onErrorArray, onError);

    const {handleSubmit, handleBlur, handleChange, errors, touched, values, isValid} = useFormik({
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
        onSubmit
    });
    const classes = useStyles();
    return (
            <>
            {
                failMessage ? <FormHelperText error>{failMessage}</FormHelperText> : null
            }
            {
                successMessage ? <FormHelperText className={classes.success}>{successMessage}</FormHelperText> : null
            }
            <form className={classes.room} onSubmit={handleSubmit} onBlur={handleBlur} onChange={handleChange}>
                <TextFieldWithError type={'text'} name={'phoneNumber'} label={'Phone Number'} fullWidth
                                    className={classes.marginBottomTop10}
                                    errorMessage={errors.phoneNumber} error={!!errors.phoneNumber && touched.phoneNumber}/>
                <TextFieldWithError type={'text'} name={'firstName'} label={'First Name'} fullWidth className={classes.marginBottom10}
                                    errorMessage={errors.firstName} error={!!errors.firstName && touched.firstName}/>
                <TextFieldWithError type={'text'} name={'lastName'} label={'Last Name'} fullWidth className={classes.marginBottom10}
                                    errorMessage={errors.firstName} error={!!errors.lastName && touched.lastName}/>
                <FormControl fullWidth className={classes.marginBottom10} error={!!errors.gender && touched.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select native inputProps={{name: 'gender'}}>
                        <option aria-label="None" value="" />
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Select>
                    {!!errors.gender && touched.gender ?<FormHelperText error>{errors.gender}</FormHelperText> : null }
                </FormControl>
                <LoadingButton loading={loading} disabled={!isValid || reservationDone} type={'submit'}
                               variant={'contained'} color={'primary'}>
                    Reserve
                </LoadingButton>
            </form>
            </>
    )
};

export default ReservationForm;