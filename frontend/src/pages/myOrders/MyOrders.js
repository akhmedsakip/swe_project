import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MyOrdersTable from './components/MyOrdersTable';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
    },
});

const MyOrders = () => {
    const classes = useStyles();
    return <div className={classes.root}>
        <Typography variant="h4">My Orders</Typography>
        <MyOrdersTable />
    </div>
};

export default MyOrders;