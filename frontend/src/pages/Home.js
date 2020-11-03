import { Collapse, IconButton, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  title: {
    color: 'white',
    fontFamily: 'Staatliches serif',
    fontSize: '10vmin',
    background: 'rgba(0, 0, 0, 0.5)',
    // borderRadius: '20px',
    padding: '5vmin',
  },
  arrowIcon: {
    color: 'white',
    fontSize: '4rem',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%'
  },
  bg: {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`,
  },
  bg1: {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg1.jpg'})`,
  },
  bottomBar: {
    background: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center'
  }
}))

function Home() {

  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, [])

  return (
    <div>
      <div className={classes.root + " " + classes.bg1}>
        <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
          <h1 className={classes.title}>
            Welcome to Amita Hotels!
          </h1>
          <Scroll to="section-2" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.arrowIcon} />
            </IconButton>
          </Scroll>
        </Collapse>
      </div>
      <div id="section-2" className={classes.root + " " + classes.bg} title="section-1">

      </div>
      <div className={classes.bottomBar}>
        <h1>
          Our Contacts;
          Address
      </h1>
      </div>
    </div>
  )
}

export default Home;
