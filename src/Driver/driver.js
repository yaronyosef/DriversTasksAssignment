import './driver.css';

import React from 'react';
import { connect } from 'react-redux';

const driver = (props) => {
  return (
      <div className="driverCard">

        <div className="profileStatus">
          <img src={props.picture}/>
          <span className={"status " + (props.isActive ? "active" : "inactive")}></span>
        </div>
  
        <div className="info">
          <span className="name">{props.name}</span>
          <span className="age">Age: {props.age}</span>
        </div>
        
          
          <span className="tasks">Tasks: {props.tasks.length}</span>
          <div className="actions">
            <span className="activate tag" onClick={() => props.toggleActivate(props.id)}>
              { props.isActive ? "Set inactive" : "Set active"}
            </span>
            <span className="remove tag" onClick={() => props.remove(props.id)}>Remove</span>
            <span className="location tag" onClick={() => props.showOnMap(props.id)}>Show on map</span>
          </div>

      </div>
    )
}



const mapDispatchToProps = dispatch => {
  return {
    toggleActivate: (id) => dispatch({ type: 'toggleActivate', id }),
    remove: (id) => dispatch({ type: 'remove', id }),
    showOnMap: (id) => dispatch({ type: 'showOnMap', id }),
  };
}

export default connect(null, mapDispatchToProps)(driver);
