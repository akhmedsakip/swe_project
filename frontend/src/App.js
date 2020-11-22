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
import AdminTable from "./pages/admin-table/AdminTable";
import EmployeeSchedule from "./pages/employeeSchedule/EmployeeSchedule";
import SeasonalRates from "./pages/seasonalRates/SeasonalRates";
import AdminTableInstance from "./pages/admin-table/Instance";
import AllReservations from "./pages/allReservations/AllReservations";
import EmployeeWorkingDays from "./pages/employee-working-days/EmployeeWorkingDays";

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
            <PrivateRoute path="/all-reservations" component={AllReservations} />
            <PrivateRoute path="/employee-schedules" component={EmployeeSchedule} />
            <PrivateRoute path="/seasonal-rates" component={SeasonalRates} />
            <PrivateAdminRoute path="/admin" component={AdminPage} />
            <Route path="/admin-table-example" component={AdminTableInstance} />
            <Route path="/employee-working-days" component={EmployeeWorkingDays} />
            <Route path="*" render={() => (<Redirect to="/" />)} />

          </Switch>
        </Root>
      </BrowserRouter>
    </StoreProvider>

  );
}

export default App;
