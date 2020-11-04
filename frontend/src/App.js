import React from "react";
import ButtonAppBar from './components/TopBar';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Hotels from './pages/Hotels';
import Home from './pages/Home';
import { makeStyles } from '@material-ui/core';
import UserContextProvider from "./components/UserContextProvider";
import Root from "./components/Root";
import Profile from './pages/Profile';


const useStyles = makeStyles((theme) => ({
  root: {
  }
}));

function App() {
  const classes = useStyles();

  return (
    <UserContextProvider>
      <BrowserRouter>
        <div className={classes.root}>
          <Root>
            <ButtonAppBar />
            <Route path="/" component={Home} exact />
            <Route path="/hotels" component={Hotels} />
            <Route path="/about" component={AboutUs} />
            <Route path="/profile" component={Profile} />
            <Route path="*" render={() => (<Redirect to="/" />)} />
          </Root>
        </div>
      </BrowserRouter>
    </UserContextProvider>

  );
}

export default App;
