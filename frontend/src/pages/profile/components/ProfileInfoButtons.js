import React, {useContext} from 'react';
import {Button} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {makeStyles} from "@material-ui/core/styles";
import ProfileContext from "../../../contexts/ProfileContext";
import LoadingButton from "../../../components/LoadingButton";

const ProfileInfoButtons = () => {
    const classes = useStyles();
    const {editing, setEditing, formik, setChangePassword, loading} = useContext(ProfileContext);
    const {resetForm, isValid} = formik;
    return editing ?
            <div className={classes.row}>
                <LoadingButton loading={loading} type={'submit'} disabled={!isValid}
                        variant="outlined" color={'primary'}
                        className={`${classes.button} ${classes.marginBottom12}`}>
                    Submit
                </LoadingButton>
                <Button variant="outlined" color="secondary"
                        onClick={() => {
                            setEditing(false);
                            resetForm();
                        }}
                        className={`${classes.button} ${classes.marginBottom12}`}>
                    Cancel
                </Button>
            </div>
            :
            <div className={`${classes.row}`}>
                <Button variant="outlined" color={'primary'} className={`${classes.button} ${classes.marginBottom12}`}
                    onClick={() => {
                        setEditing(true);
                    }}>
                    Edit
                    <EditIcon fontSize={"inherit"}/>
                </Button>
                <Button variant="outlined" color="secondary" className={`${classes.button} ${classes.marginBottom12}`}
                    onClick={() => {
                        setChangePassword(true);
                    }}>
                    Change password
                </Button>
            </div>
};

export default ProfileInfoButtons;


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