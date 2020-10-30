import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

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

  const [open, setOpen] = React.useState(false);
  const [isRegistration, setRegistration] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setRegistration(false);
    setOpen(false);
  };

  const login = () => {

  }

  const register = () => {

  }

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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To log-in to this website, please enter your email address and password here.
            If you do not have an Amita Hotels account, please register.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" disabled={isRegistration}>
            Login
          </Button>
          <Button onClick={() => setRegistration(true)} color="secondary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}