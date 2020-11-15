import React from "react";
import ButtonAppBar from './components/TopBar';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Hotels from './pages/Hotels';
import RoomType from "./pages/RoomTypes";
import Home from './pages/Home';
import AvailabilityPage from "./pages/availability/AvailabilityPage";
import Root from "./components/Root";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminPage from "./pages/admin/AdminPage";
import PrivateRoute from "./components/PrivateRoute";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import StoreProvider from "./store/store";
import Reservations from "./pages/reservations/Reservations";


function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Root>
          <ButtonAppBar />
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/hotels" component={Hotels} />
            <Route path="/roomTypes" component={RoomType} />
            <Route path="/availability" component={AvailabilityPage} />
            <PrivateRoute path="/reservations" component={Reservations} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <PrivateAdminRoute path="/admin" component={AdminPage} />
            <Route path="*" render={() => (<Redirect to="/" />)} />
          </Switch>
        </Root>
      </BrowserRouter>
    </StoreProvider>

  );
}

export default App;
