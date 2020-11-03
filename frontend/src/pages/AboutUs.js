import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center'
  }
});

function AboutUs() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Here should be About Us</h1>
    </div>
    )
}

export default AboutUs;
