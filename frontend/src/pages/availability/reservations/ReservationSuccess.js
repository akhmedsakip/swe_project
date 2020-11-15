import {Icon, Typography} from "@material-ui/core";
import {CheckCircleOutline} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    marginLeft32: {
        marginLeft: '32px',
    },
    icon: {
        fontSize: '10em',
        color: theme.palette.primary.main,
    },
    success: {
        color: theme.palette.primary.main,
        fontSize: '1.5em',
        fontWeight: 700,
        flex: 1,
    }
}))

const ReservationSuccess = () => {
    const classes = useStyles();
    return <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Icon component={CheckCircleOutline} fontSize={'large'}
              className={`${classes.icon}`} />
        <Typography className={`${classes.marginLeft32} ${classes.success}`}>
            Successfully reserved a room
        </Typography>
    </Box>
};

export default ReservationSuccess;