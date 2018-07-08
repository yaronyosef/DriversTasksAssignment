import './App.css';

import React, { Component } from 'react';

import DriverList from './DriverList/driverList';
import Filter from './Filter/filter';
import Map from './map';
import TaskList from './TaskList/taskList';
import axios from 'axios';
import { connect } from 'react-redux';

class App extends Component {

  async componentDidMount(){
    const response = await axios.get('https://next.json-generator.com/api/json/get/E1_PyD7fS');
    this.props.setDrivers(response.data);
  }

  render() {

    return (
      <div className="App">

        <div className="sideCube">
          <Filter filterType="name" filterName="name" />
          <Filter filterType="age" filterName="age" />
          <DriverList/>
        </div>

        <div>
          <Map
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjMiwaON8r31sBjfJ0tkMRUWptGMIsrEs&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>

        <TaskList/>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDrivers: (value) => dispatch({ type: 'setDrivers', value })
  };
}

export default connect(null, mapDispatchToProps)(App);
