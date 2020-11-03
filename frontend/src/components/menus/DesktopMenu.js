import {useContext} from 'react';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import UserContext from "../../contexts/userContext";

const useStyles = makeStyles({
    link: {
        color: 'black',
        textDecoration: 'none',
    },
    loginButton: {
        color: 'black',
        textDecoration: 'none',
        fontWeight: 'bold',
    }
});

const DesktopMenu = ({openAuthDialog, signOut}) => {
    const {state, dispatch} = useContext(UserContext);
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
        {
            (!state.loggedIn
                ? <Button color="inherit" className={classes.loginButton} onClick={openAuthDialog}>
                    Login
                </Button>
                : <Button color="inherit" className={classes.link} onClick={() => dispatch({type: 'signOut'})}>
                    Sign Out
                </Button>
            )
        }
    </div>
};

DesktopMenu.propTypes = {
    openAuthDialog: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
};

export default DesktopMenu;