import React from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment'
import Dashboard from './components/dashboard';


class App extends React.Component{
  render(){
    return (
      <Dashboard></Dashboard>
    );
  }
}

export default App;
