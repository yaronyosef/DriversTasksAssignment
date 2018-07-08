import './driverList.css';

import React, { Component } from 'react';

import Driver from '../Driver/driver';
import { connect } from 'react-redux';

class DriverList extends Component {

  render() {

    const drivers = this.props.drivers;
    const driverRows = drivers.map(driver => <Driver {...driver} key={driver.id}/>);

    return (
      <div id="driverList">
        <div className="header">
          <span className="capsule addUser">ADD USER</span>
          <span className="totalDrivers">Total drivers: {drivers.length}</span>
        </div>
        <div className="list">{driverRows}</div>
      </div>
    );
  }
}

const compareStrings = (strings, direction) => {
  const [string1, string2] = direction === 'desc' ? strings : strings.reverse();
  if (string1 < string2) return -1;
  if (string1 > string2) return 1;
  return 0;
}

const compareNumbers = (numbers, direction) => {
  const [number1, number2] = direction === 'desc' ? numbers : numbers.reverse();
  return number1 - number2;
}

const mapStateToProps = state => {
  return {
    drivers: Object.values(state.drivers).filter(driver => driver.hidden !== true && driver.deleted !== true).
    sort((driverA, driverB) => {
      if(state.sorters.name && driverA.name !== driverB.name){
        return compareStrings([driverA.name, driverB.name], state.sorters.name)
      }
      if(state.sorters.age){
        return compareNumbers([driverA.age, driverB.age], state.sorters.age)
      }
      return 0;
    })
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setDrivers: (value) => dispatch({ type: 'setDrivers', value })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverList);
