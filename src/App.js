import React from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment'
import Dashboard from './components/dashboard';
import Charts from './components/charts'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Row, NavLink, Col } from 'react-bootstrap';


class App extends React.Component{
  render(){
    return (
      <Router>
        <nav class="navbar sticky-top navbar-dark bg-dark" style={{margin:'0 auto',display:'block',textAlign:'center',float:'none'}}>
          <Row>
            <Col lg={6}><Link to="/map" role="button" aria-pressed="true" className="navbar-brand">Dashboard</Link></Col>
            <Col lg={6}><Link to="/stats" role="button" aria-pressed="true" className="navbar-brand">Charts</Link></Col>
          </Row>
        </nav>
        <br/>
        <br/>
        <Switch>
          <Route path="/map">
          <Dashboard></Dashboard>
          </Route>
          <Route path="/stats">
            <Charts></Charts>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
