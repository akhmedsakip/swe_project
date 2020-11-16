import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

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

const AdminPage = () => {
    const classes = useStyles();
    return <div className={classes.root}>

    </div>
};

export default AdminPage;