import ButtonAppBar from './components/TopBar';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Hotels from './pages/Hotels';
import Home from './pages/Home';
import { makeStyles } from '@material-ui/core';
import Profile from './pages/Profile';

const useStyles = makeStyles((theme) => ({
  root: {
  }
}))

function App() {
  const classes = useStyles();

  return (
    <Router>
      <ButtonAppBar />
      <Route path="/" component={Home} exact />
      <Route path="/hotels" component={Hotels} />
      <Route path="/about" component={AboutUs} />
      <Route path="/profile" component={Profile} />
      <Route path="*" render={() => (<Redirect to="/" />)} />
    </Router>

  );
}

export default App;
