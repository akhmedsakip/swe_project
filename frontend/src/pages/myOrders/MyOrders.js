import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MyOrdersTable from './components/MyOrdersTable';

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg2.jpg'})`
    },
});

const MyOrders = () => {
    const classes = useStyles();
    return <div className={classes.root}>
        <MyOrdersTable />
    </div>
};

export default MyOrders;