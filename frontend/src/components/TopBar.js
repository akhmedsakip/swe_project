import { IconButton, Menu, MenuItem, useMediaQuery } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationDialog from "./AuthenticationDialog";
import useTheme from '@material-ui/core/styles/useTheme';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    background: 'rgba(255, 255, 255, 0.5)',
    color: 'black',
  },
  amitaHotels: {
    marginRight: theme.spacing(2),
    fontFamily: 'Staatliches'
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'black',
    textDecoration: 'none',
  },
  loginButton: {
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  menuIcon: {
    color: 'black'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAcnhorEl] = useState(false);

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleMenuClick = () => {
    setAcnhorEl(!anchorEl);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar className={classes.bar}>

          <Link to="/" className={classes.link}>
            <Typography edge="start" variant="h5" className={classes.amitaHotels} color="inherit" aria-label="menu">
              Amita Hotels
          </Typography>
          </Link>

          <div className={classes.title}>
          </div>

          {!isMobileScreen ?
            <div>
              <Link to="/" className={classes.link}>
                <Button color="inherit">Home</Button>
              </Link>
              <Link to="/hotels" className={classes.link}>
                <Button color="inherit">Hotels</Button>
              </Link>
              <Link to="/about" className={classes.link}>
                <Button color="inherit">About Us</Button>
              </Link>
              <Button color="inherit" className={classes.loginButton} onClick={handleClickOpen}>Login</Button>
            </div>
            : <div>
              <IconButton edge="start" onClick={handleMenuClick} className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClick}
              >
                <MenuItem onClick={handleMenuClick}>
                  <Link to="/" className={classes.link}>
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClick}>
                  <Link to="/hotels" className={classes.link}>
                    Hotels
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClick}>
                  <Link to="/about" className={classes.link}>
                    About Us
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClickOpen}>
                  Login
                </MenuItem>
              </Menu>

            </div>

          }
        </Toolbar>
      </AppBar>
      <AuthenticationDialog onClose={() => setOpen(false)} open={open} />
    </div>
  );
}