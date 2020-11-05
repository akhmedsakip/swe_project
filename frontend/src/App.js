import React from "react";
import ButtonAppBar from './components/TopBar';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Hotels from './pages/Hotels';
import RoomType from "./pages/RoomTypes";
import Home from './pages/Home';
import SearchFirst from "./pages/SearchFirst";
import { makeStyles } from '@material-ui/core';
import UserContextProvider from "./components/UserContextProvider";
import Root from "./components/Root";
import ProfilePage from "./pages/profile/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Root>
          <ButtonAppBar />
          <Route path="/" component={Home} exact/>
          <Route path="/hotels" component={Hotels} />
          <Route path="/about" component={AboutUs} />
          <Route path="/roomTypes" component={RoomType} />
          <Route path="/searchFirst" component={SearchFirst} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <Route path="*" render={() => (<Redirect to="/" />)} />
        </Root>
      </BrowserRouter>
    </UserContextProvider>

  );
}

export default App;
