import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    link: {
        color: 'black',
        textDecoration: 'none',
    },
});

const DesktopMenu = ({openAuthDialog}) => {
    const classes = useStyles();
    return <div>
        <Link to="/" className={classes.link}>
            <Button color="inherit">Home</Button>
        </Link>
        <Link to="/hotels" className={classes.link}>
            <Button color="inherit">Hotels</Button>
        </Link>
        <Link to="/about" className={classes.link}>
            <Button color="inherit">About Us</Button>
        </Link>
        <Button color="inherit" className={classes.loginButton} onClick={openAuthDialog}>Login</Button>
    </div>
};

DesktopMenu.propTypes = {
    openAuthDialog: PropTypes.func.isRequired,
};

export default DesktopMenu;