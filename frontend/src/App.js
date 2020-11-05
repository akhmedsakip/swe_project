import React from "react";
import ButtonAppBar from './components/TopBar';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Hotels from './pages/Hotels';
import Home from './pages/Home';
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
          <Route path="/" component={Home} exact />
          <Route path="/hotels" component={Hotels} />
          <Route path="/about" component={AboutUs} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <Route path="*" render={() => (<Redirect to="/" />)} />
        </Root>
      </BrowserRouter>
    </UserContextProvider>

  );
}

export default App;
