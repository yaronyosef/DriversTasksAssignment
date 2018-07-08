// import './driverList.css';

import React, { Component } from 'react';

import Task from './Task/task';
import { connect } from 'react-redux';

class TaskList extends Component {

  render() {

    const taskList = this.props.tasks.map((task, i) => {

      return <Task {...task} index={i} key={task.id}
                    drivers={this.props.drivers} changeAsignedTo={this.props.changeAsignedTo} showOnMap={() => this.props.showOnMap(task.driver.id)} />
    });

    return (
      <div id="tasksList">
      <span>Total tasks: {taskList.length}</span>
      <table id="tasks_table">
        <tbody>
          <tr>
            <td><span>Id</span></td>
            <td><span>Title</span></td>
            <td className="scheduled_for"><span>Scheduled for</span></td>
            <td><span>Assigned to</span></td>
            <td><span>Address</span></td>
            <td><span>Longitude</span></td>
            <td><span>Latitude</span></td>
            <td><span>Locate on map</span></td>
          </tr>
        
          {taskList}
          
        </tbody>
      </table>
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

const mapStateToProps = state => {
  let drivers = Object.values(state.drivers).filter(driver => driver.deleted !== true && driver.isActive);
  drivers = drivers.sort((a, b) => compareStrings([a.name, b.name], 'desc'));
  return {
    drivers,
    tasks: state.tasks
  };
}

const mapDispatchToProps = dispatch => {
  return {
    showOnMap: (id) => dispatch({ type: 'showOnMap', id }),
    changeAsignedTo: (value) => dispatch({ type: 'changeAsignedTo',
      currentDriverId: value.target.getAttribute('data-driverid'),
      nextDriverId: value.target.value,
      taskId: value.target.getAttribute('data-taskid')
    })
  };
}

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
