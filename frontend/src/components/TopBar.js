import { useMediaQuery } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationDialog from "./AuthenticationDialog";
import useTheme from '@material-ui/core/styles/useTheme';
import DesktopMenu from "./menus/DesktopMenu";
import MobileMenu from "./menus/MobileMenu";

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

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const openAuthDialog = () => {
    setOpen(true);
  };

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

          {!isMobileScreen ? <DesktopMenu openAuthDialog={openAuthDialog} />
            : <MobileMenu openAuthDialog={openAuthDialog}/>

          }
        </Toolbar>
      </AppBar>
      <AuthenticationDialog onClose={() => setOpen(false)} open={open} />
    </div>
  );
}