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

  const loremIpsum1 = "Amita Hotels - It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

  return (
    <div>
      <div className={classes.root}>
      </div >
      <FooterContainer />
    </div>
  );
}

export default AboutUs;