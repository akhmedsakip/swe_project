import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import AuthenticationDialog from "./AuthenticationDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    background: 'rgba(255, 255, 255, 0.3)',
    color: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'black',
    textDecoration: 'none' 
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar className={classes.bar}>
          <Link to="/" className={classes.link}>
            <Typography edge="start" variant="h5" className={classes.menuButton} color="inherit" aria-label="menu">
              Amita Hotels
          </Typography>
          </Link>
          <div className={classes.title}>
          </div>
          <Link to="/rooms" className={classes.link}>
            <Button color="inherit">Rooms</Button>
          </Link>
          <Link to="/about" className={classes.link}>
            <Button color="inherit">About Us</Button>
          </Link>
          <Button color="inherit" className={classes.menuButton} onClick={handleClickOpen}>Login</Button>
        </Toolbar>
      </AppBar>
      <AuthenticationDialog onClose={() => setOpen(false)} open={open} />
    </div>
  );
}