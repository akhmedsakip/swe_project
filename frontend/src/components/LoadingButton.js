import React from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    submitLabel: {
        opacity: ({loading}) => loading ? 0 : '100%',
    },
    spinner: {
        position: 'absolute'
    },
});

const LoadingButton = ({loading = false, children, ...other}) => {
    const classes = useStyles({loading});
    return <Button {...other}>
        {loading ? <Spinner className={classes.spinner} /> : null}
        <Typography className={classes.submitLabel}>
            {children}
        </Typography>
    </Button>
};

LoadingButton.propTypes = {
    loading: PropTypes.bool,
};

export default LoadingButton;