import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import { compose, withProps } from "recompose";

import React from "react";
import { connect } from 'react-redux';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCjMiwaON8r31sBjfJ0tkMRUWptGMIsrEs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={4} defaultCenter={{ lat: 37.729066, lng: -98.083506 }}>
    {
    props.driverMarkers.map(driver => {
    return <Marker
              icon={{url: "/static/driver.png"}}
              position={{ lat: parseFloat(driver.latitude), lng: parseFloat(driver.longitude) }}
              key={driver.id}>
                {/* <InfoWindow
                    // onCloseClick={this.handleToggle}
                    >
                  <span>Something</span>
                </InfoWindow> */}
              </Marker>
    })
    }
    
    {
    props.tasks.map(task => {
    return <Marker
              icon={{url: "/static/task.png"}}
              position={{ lat: parseFloat(task.latitude), lng: parseFloat(task.longitude) }}
              key={task.id}/>
    })
    }
  
  </GoogleMap>
));

const mapStateToProps = state => {
  return {
    driverMarkers: state.driverMarkers,
    tasks: state.tasks
  };
}

export default connect(mapStateToProps)(MyMapComponent);