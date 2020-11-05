import React, {useContext} from 'react';
import {Button} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {makeStyles} from "@material-ui/core/styles";
import ProfileContext from "../../../contexts/profileContext";

const useStyles = makeStyles({
    row: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    button: {
        fontSize: ({isMobileScreen}) => isMobileScreen ? 15 : 10,
        width: ({isMobileScreen}) => isMobileScreen ? '70%' : '40%',
        minWidth: 100,
    },
    marginBottom12: {
        marginBottom: 12,
    }
});

const ProfileInfoButtons = () => {
    const classes = useStyles();
    const {editing, setEditing, formik, setChangePassword} = useContext(ProfileContext);
    const {resetForm, isValid} = formik;
    return editing ?
            <div className={classes.row}>
                <Button type={'submit'} disabled={!isValid}
                        variant="outlined" color={'primary'}
                        className={`${classes.button} ${classes.marginBottom12}`}>
                    Submit
                </Button>
                <Button variant="outlined" color="secondary"
                        onClick={() => setEditing(false)}
                        className={`${classes.button} ${classes.marginBottom12}`}>
                    Cancel
                </Button>
            </div>
            :
            <div className={`${classes.row}`}>
                <Button variant="outlined" color={'primary'} className={`${classes.button} ${classes.marginBottom12}`}
                    onClick={() => {
                        setEditing(!editing);
                        resetForm();
                    }}>
                    Edit
                    <EditIcon fontSize={"inherit"}/>
                </Button>
                <Button variant="outlined" color="secondary" className={`${classes.button} ${classes.marginBottom12}`}
                    onClick={() => setChangePassword(true)}>
                    Change password
                </Button>
            </div>
};

export default ProfileInfoButtons;

