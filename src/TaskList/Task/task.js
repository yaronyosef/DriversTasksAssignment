import './task.css';

import React from 'react';

const task = (props) => {

  // console.log({props});
  const options = props.drivers.map((driver, key) => {
    // selected={props.driver.id == driver.id}
    return <option key={key} value={driver.id}  >{driver.name}</option>
  });
  // data-taskId={props.task.id}
  // data-driverId={props.driver.id} data-taskId={props.task.id}
  return (<tr>
    <td><span>{props.index}</span></td>
    <td><span>{props.title}</span></td>
    <td><span className="scedule">{props.scheduled_for}</span></td>
    <td><span><select value={props.driver.id} onChange={(event) => props.changeAsignedTo(event)} 
                      data-driverid={props.driver.id} data-taskid={props.id}>
      {options}
      </select></span></td>
    <td><span>{props.address}</span></td>
    <td><span>{props.longitude}</span></td>
    <td><span>{props.latitude}</span></td>
    <td><span className="show button" onClick={props.showOnMap}>show</span></td>
    </tr>)
}

export default task;