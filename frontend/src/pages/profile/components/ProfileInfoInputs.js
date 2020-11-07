import React, {useContext, useEffect} from 'react';
import InformationRow from "./InformationRow";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import moment from 'moment';
import ProfileContext from "../../../contexts/ProfileContext";

const useStyles = makeStyles({
    info: {
        display: 'flex',
        flexDirection: 'column',
        '& :last-child': {
            border: '0px solid black',
        },
    },
    marginBottom12: {
        marginBottom: 12,
    }
});

const ProfileInfoInputs = () => {
    const classes = useStyles();
    const {formik, editing} = useContext(ProfileContext);
    const {values, handleChange, errors} = formik;

    return <div className={`${classes.info} ${classes.marginBottom12}`}>
        <InformationRow label={'Email'} name={'email'}>
            {values.email}
        </InformationRow>
        <InformationRow label={'First name'} name={'firstName'} />
        <InformationRow label={'Last name'} name={'lastName'} />
        <InformationRow label={'Gender'} name={'gender'}>
            {
                editing ? <Select fullWidth native onChange={handleChange('gender')} value={values.gender}
                                  inputProps={{dir:'rtl'}} error={!!errors.gender}>
                    <option aria-label="None" value="" />
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Select> : values.gender
            }
        </InformationRow>
        <InformationRow label={'Birth date'} name={'dateOfBirth'}>
            <TextField type={editing ? 'date' : 'text'}
                       error={!!errors.dateOfBirth}
                       value={editing ? moment(values.dateOfBirth).format('yyyy-MM-DD') : moment(values.dateOfBirth).format('L')}
                       onChange={handleChange('dateOfBirth')} disabled={!editing} InputProps={{disableUnderline: !editing}} fullWidth/>
        </InformationRow>
    </div>
};

export default ProfileInfoInputs;