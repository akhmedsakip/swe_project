import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Footer from '../components/footer/Footer';
import { FooterContainer } from '../components/footer/FooterContainer';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`,
  },
  infoBlocK: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    color: 'white',
    width: '80%',
  }
});

function AboutUs() {

  const classes = useStyles();  

  return (
    <div>
      <div className={classes.root}>
      </div >
      <FooterContainer />
    </div>
  );
}

export default AboutUs;