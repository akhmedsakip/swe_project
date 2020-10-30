import ButtonAppBar from './components/TopBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Hotels from './pages/Hotels';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div>
        <ButtonAppBar />
        <Route path="/" component={Home} exact />
        <Route path="/hotels" component={Hotels} />
        <Route path="/about" component={AboutUs} />
      </div>
    </Router>
  );
}

export default App;
