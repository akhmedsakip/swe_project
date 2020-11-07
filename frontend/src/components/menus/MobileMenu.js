import React, {useRef, useState, useContext} from "react";
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {Link, useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import logoutAction from "../../actions/userContextActions/logoutAction";
import AppContext from "../../store/AppContext";
import {AUTH_OPEN_DIALOG} from "../../store/auth/authActionTypes";

const useStyles = makeStyles({
    link: {
        color: 'black',
        textDecoration: 'none',
    },
});

const MobileMenu = () => {
    const classes = useStyles();
    const anchorEl = useRef(null);
    const [open, setOpen] = useState(false);
    const {state, dispatch} = useContext(AppContext);
    const history = useHistory();

    return (
    <div>
        <IconButton edge="start" className={classes.menuButton} ref={anchorEl}
                    color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
            <MenuIcon/>
        </IconButton>
        <Menu
            anchorEl={anchorEl.current}
            open={open}
            onClose={() => setOpen(false)}
        >
            <MenuItem onClick={() => setOpen(false)}>
                <Link to="/" className={classes.link}>
                    Home
                </Link>
            </MenuItem>
            <MenuItem onClick={() => setOpen(false)}>
                <Link to="/hotels" className={classes.link}>
                    Hotels
                </Link>
            </MenuItem>
            <MenuItem onClick={() => setOpen(false)}>
                <Link to="/about" className={classes.link}>
                    About Us
                </Link>
            </MenuItem>
            <MenuItem onClick={() => setOpen(false)}>
                <Link to="/availability" className={classes.link}>
                    Search
                </Link>
            </MenuItem>
            {
                state.loggedIn ?
                    <MenuItem onClick={() => history.push('/profile')}>
                        Profile
                    </MenuItem> : null
            }
            {
                !state.loggedIn
                ? <MenuItem onClick={() => {
                        dispatch({type: AUTH_OPEN_DIALOG});
                        setOpen(false)
                    }}>
                        Login
                    </MenuItem>
                :
                    <MenuItem onClick={() => logoutAction(dispatch)}>
                        Sign Out
                    </MenuItem>

            }
        </Menu>
    </div>
    )
};

MobileMenu.propTypes = {};

export default MobileMenu;