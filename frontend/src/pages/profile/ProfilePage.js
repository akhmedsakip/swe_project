import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import ProfileInfoForm from "./components/ProfileInfoForm";

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        background: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`
    },
});

const ProfilePage = () => {
    const classes = useStyles();
    return <div className={classes.root}>
        <ProfileInfoForm />
    </div>
};

export default ProfilePage;