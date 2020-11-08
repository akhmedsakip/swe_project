import React from "react";
import ButtonAppBar from './components/TopBar';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Hotels from './pages/Hotels';
import RoomType from "./pages/RoomTypes";
import Home from './pages/Home';
import AvailabilityPage from "./pages/availability/AvailabilityPage";
import Root from "./components/Root";
import ProfilePage from "./pages/profile/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import StoreProvider from "./store/store";


function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Root>
          <ButtonAppBar />
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/hotels" component={Hotels} />
            <Route path="/about" component={AboutUs} />
            <Route path="/roomTypes" component={RoomType} />
            <Route path="/availability" component={AvailabilityPage} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <Route path="*" render={() => (<Redirect to="/" />)} />
          </Switch>
        </Root>
      </BrowserRouter>
    </StoreProvider>

  );
}

export default App;
