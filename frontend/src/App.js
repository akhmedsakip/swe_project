import React from "react";
import ButtonAppBar from './components/TopBar';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Hotels from './pages/Hotels';
import RoomType from "./pages/RoomTypes";
import Home from './pages/Home';
import AvailabilityPage from "./pages/availability/AvailabilityPage";
import { makeStyles } from '@material-ui/core';
import UserContextProvider from "./context-providers/UserContextProvider";
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
          <Route path="/searchFirst" component={AvailabilityPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <Route path="*" render={() => (<Redirect to="/" />)} />
        </Root>
      </BrowserRouter>
    </UserContextProvider>

  );
}

export default App;
