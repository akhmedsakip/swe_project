import {useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import UserContext from "../../contexts/userContext";
import logoutAction from "../../actions/userContextActions/logoutAction";
import Avatar from "@material-ui/core/Avatar";

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

const DesktopMenu = ({openAuthDialog}) => {
    const {state, dispatch} = useContext(UserContext);
    const classes = useStyles();
    const history = useHistory();
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
        <Link to="/availability" className={classes.link}>
            <Button color="inherit">Search</Button>
        </Link>
        {
            (!state.loggedIn
                ? <Button color="inherit" className={classes.loginButton} onClick={openAuthDialog}>
                    Login
                </Button>
                : <Button color="inherit" className={classes.link} onClick={() => logoutAction(dispatch)}>
                    Sign Out
                </Button>
            )
        }
        {
            state.loggedIn ? <Button onClick={() => history.push('/profile')}>
                <Avatar alt="Profile" src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' />
            </Button> : null
        }
    </div>
};

DesktopMenu.propTypes = {
    openAuthDialog: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
};

export default DesktopMenu;