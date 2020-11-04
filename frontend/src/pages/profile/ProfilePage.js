import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import ProfileInfo from "./ProfileInfo";

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        background: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`
    },
});

const ProfilePage = () => {
    const classes = useStyles();
    return <div className={classes.root}>
        <ProfileInfo />
    </div>
};

export default ProfilePage;