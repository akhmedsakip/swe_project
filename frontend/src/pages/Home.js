import { Collapse, IconButton, makeStyles, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import Footer from '../components/footer/Footer';
import { FooterContainer } from '../components/footer/FooterContainer';
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
    display: 'flex',
    justifyContent: 'space-around'
  },
  hotelInfo: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  section2: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  info: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    color: 'white',
    width: '80%',
  },
}))

function Home() {

  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const loremIpsum1 = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
  const loremIpsum2 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

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
      <div id="section-2" className={classes.section2 + " " + classes.bg} title="section-1">
        <div className={classes.info}>
          <Typography style={{fontSize: '3.5vmin'}}>
            AMITA Hotels is a collection of modern hotels located throughout every part of the world. 
Beautifully designed and nested in the heart of the city, The AMITA Hotel, Almaty effortlessly combines all of the best features of a modern hotel in the dynamic urban center. After a day spent exploring the city, guests at this five-star hotel can reflect upon their time in Kazakhstan from the unique perspective. Our hotel welcomes those who would like to spend quality time and enjoy comfortable rooms, restaurants suitable for any taste and much more. Our reception staff will be happy to help you during your stay in Almaty, suggesting itineraries, places to visit and gourmet restaurants in this charming city. Let us create your perfect stay.
Contact the AMITA HOTELS, Almaty reservations team to book your stay with us.
          </Typography>
        </div>
      </div>
      <FooterContainer />
    </div>
  )
}

export default Home;
