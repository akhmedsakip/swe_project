import React from "react";
import ButtonAppBar from './components/TopBar';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Hotels from './pages/Hotels';
import RoomType from "./pages/RoomTypes";
import Home from './pages/Home';
import AvailabilityPage from "./pages/availability/AvailabilityPage";
import Root from "./components/Root";
import ProfilePage from "./pages/profile/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import StoreProvider from "./store/store";
import Reservations from "./pages/reservations/Reservations";
import AdminTableInstance from "./components/interactive-table/Instance";
import SeasonalRates from "./pages/seasonal-rates/SeasonalRates";
import SeasonWeekDays from "./pages/seasonal-rates/season-weekdays/SeasonWeekDays";
import Employees from "./pages/employees/Employees";
import EmployeesWorkingDays from "./pages/employees/employee-working-days/EmployeeWorkingDays";
import AdminReservations from "./pages/admin-reservations/AdminReservations";
import {
  READ_ALL_EMPLOYEES,
  READ_ALL_ORDERS,
  READ_ALL_SCHEDULES,
  READ_ALL_SEASONS
} from "./store/user/userPrivelegesTypes";

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
            <PrivateRoute path="/admin-reservations" component={AdminReservations} privileges={[READ_ALL_ORDERS]} />
            <PrivateRoute path="/employees" component={Employees} privileges={[READ_ALL_EMPLOYEES]} />
            <PrivateRoute path="/employees-working-days/:id" component={EmployeesWorkingDays} privileges={[READ_ALL_SCHEDULES]} />
            <PrivateRoute path="/seasonal-rates" component={SeasonalRates} privileges={[READ_ALL_SEASONS]} />
            <PrivateRoute path="/seasonal-rates-weekdays/:id" component={SeasonWeekDays} privileges={[READ_ALL_SEASONS]} />
            <Route path="*" render={() => (<Redirect to="/" />)} />

          </Switch>
        </Root>
      </BrowserRouter>
    </StoreProvider>

  );
}

export default App;
