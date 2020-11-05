import ButtonAppBar from './components/TopBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Hotels from './pages/Hotels';
import RoomType from "./pages/RoomTypes";
import Home from './pages/Home';
import SearchFirst from "./pages/SearchFirst";
import { makeStyles } from '@material-ui/core';
import UserContextProvider from "./components/UserContextProvider";

const useStyles = makeStyles((theme) => ({
  root: {
  }
}))

function App() {
  const classes = useStyles();

  return (
    <UserContextProvider>
      <Router>
        <div className={classes.root}>
          <ButtonAppBar />
          <Route path="/" component={Home} exact />
          <Route path="/hotels" component={Hotels} />
          <Route path="/about" component={AboutUs} />
          <Route path="/roomTypes" component={RoomType} />
          <Route path="/searchFirst" component={SearchFirst} />
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
