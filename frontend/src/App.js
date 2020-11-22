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
import AdminTableInstance from "./pages/admin-table/Instance";
import SeasonalRates from "./pages/seasonal-rates/SeasonalRates";
import SeasonWeekDays from "./pages/seasonal-rates/season-weekdays/SeasonWeekDays";
import Employees from "./pages/employees/Employees";
import EmployeesSchedules from "./pages/employees/employeesSchedules/EmployeesSchedules";

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
            <Route path="/seasonal-rates" component={SeasonalRates} />
            <Route path="/seasonal-rates-weekdays/:id" component={SeasonWeekDays} />
            <Route path="/employees" component={Employees} />
            <Route path="/employees/:id" component={EmployeesSchedules} />
            <PrivateAdminRoute path="/admin" component={AdminPage} />
            <Route path="/admin-table-example" component={AdminTableInstance} />
            <Route path="*" render={() => (<Redirect to="/" />)} />

          </Switch>
        </Root>
      </BrowserRouter>
    </StoreProvider>

  );
}

export default App;
