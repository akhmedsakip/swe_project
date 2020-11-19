import { useMediaQuery } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AuthenticationDialog from "../pages/auth/AuthenticationDialog";
import useTheme from '@material-ui/core/styles/useTheme';
import DesktopMenu from "./menus/DesktopMenu";
import MobileMenu from "./menus/MobileMenu";
import Spinner from "./Spinner";
import AppContext from "../store/AppContext";

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
  menuIcon: {
    color: 'black'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const {state} = useContext(AppContext);
  const {loading} = state.user;

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
          {(() => {
            if(loading) {
              return <Spinner />
            }
            if(isMobileScreen) {
              return <MobileMenu />
            }
            return <DesktopMenu />
          })()}
        </Toolbar>
      </AppBar>
      <AuthenticationDialog />
    </div>
  );
}