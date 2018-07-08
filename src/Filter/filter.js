import './filter.css';

import React from 'react';
import { connect } from 'react-redux';

const filter = (props) => {
  return (
    <div className="filter">
      <span>Filter by {props.filterName}:</span>
      <input placeholder={props.filterName+"..."} onChange={(e) => props.changeFilter(props.filterType, e.target.value)}/>
    </div>)
}

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: (filter, value) => dispatch({ type: 'changeFilter', filter, value })
  };
}

export default connect(null, mapDispatchToProps)(filter);