import {useContext, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import logoutAction from "../../actions/auth/logoutAction";
import Avatar from "@material-ui/core/Avatar";
import AppContext from "../../store/AppContext";
import {AUTH_OPEN_DIALOG} from "../../store/auth/authActionTypes";

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

const DesktopMenu = () => {
    const {state, dispatch} = useContext(AppContext);
    const classes = useStyles();
    const history = useHistory();
    const { loggedIn, userInfo, isAdmin } = state.user;
    // useEffect(() => {
    //     console.log(identicon);
    // }, [identicon]);
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
            isAdmin ? <Button color="inherit" className={classes.link} onClick={() => history.push('/admin')}>
                Admin
            </Button> : null
        }
        {
            loggedIn && <Button onClick={() => history.push('/reservations')}>
                Reservations
            </Button>
        }
        {
            (!loggedIn
                ? <Button color="inherit" className={classes.loginButton} onClick={() => dispatch({type: AUTH_OPEN_DIALOG})}>
                    Login
                </Button>
                : <Button color="inherit" className={classes.link} onClick={() => logoutAction(dispatch)}>
                    Sign Out
                </Button>
            )
        }
        {
            loggedIn ? <Button onClick={() => history.push('/profile')}>
                <Avatar alt="Profile" src={`data:image/png;base64,${userInfo.identicon}`} />
            </Button> : null
        }
        
    </div>
};

DesktopMenu.propTypes = {};

export default DesktopMenu;