import {IconButton, Menu, MenuItem} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {Link} from "react-router-dom";
import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    link: {
        color: 'black',
        textDecoration: 'none',
    },
});

const MobileMenu = ({openAuthDialog}) => {
    const classes = useStyles();
    const anchorEl = useRef(null);
    const [open, setOpen] = useState(false);
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
            <MenuItem onClick={() => {
                openAuthDialog();
                setOpen(false)
            }}>
                Login
            </MenuItem>
        </Menu>
    </div>
    )
};

MobileMenu.propTypes = {
    openAuthDialog: PropTypes.func.isRequired,
};

export default MobileMenu;