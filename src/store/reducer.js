const intiatlState = {
  addUserModalOpen: false,
  sorters: {
    name: 'desc',
    age: 'desc'
  },
  filters: {
    name: null,
    age: null
  },
  drivers: {},
  driverMarkers: [],
  tasks: [],
}

let filteredDrivers;
let drivers;

const getFilteredDrivers = (drivers) => {
  return Object.values(drivers).filter(driver => driver.hidden !== true && driver.deleted !== true && driver.isActive);
}

const getTasksFromDrivers = (drivers) => {
  return drivers.reduce((accumulator, driver) => {
    driver.tasks.forEach(task => accumulator.push({...task, index: accumulator.length, driver}));
    return accumulator;
  }, [])
}

const reducer = (state = intiatlState, action) => {
  
  switch (action.type) {
    case 'setDrivers':
      drivers = action.value.reduce((accumulator, driver) => {
        accumulator[driver.id] = driver;
        return accumulator;
      }, {});

      filteredDrivers = getFilteredDrivers(drivers);

      state = {
        ...state,
        drivers,
        driverMarkers: getFilteredDrivers(filteredDrivers),
        tasks: getTasksFromDrivers(filteredDrivers),
      };    
      break;
    case 'changeFilter':
      const filters = state.filters;
      filters[action.filter] = action.value;
      drivers = {};
      
      for (const key in state.drivers) {
          const driver = state.drivers[key];
          let show = true;
          let age = parseInt(filters.age) || null;
          if(age) show = driver.age === age;
          if(show && filters.name){
            show = driver.name.toLowerCase().includes(filters.name.toLowerCase());
          }
          driver.hidden = !show;
          drivers[key] = driver;
      }

      filteredDrivers = getFilteredDrivers(drivers);

      state = {
        ...state,
        filters,
        drivers,
        driverMarkers: filteredDrivers,
        tasks: getTasksFromDrivers(filteredDrivers),
      };
      break;
    case 'toggleActivate':
      drivers = Object.assign({}, state.drivers);;
      const status = !drivers[action.id].isActive;
      drivers[action.id].isActive = status;
      filteredDrivers = getFilteredDrivers(drivers);

      state = {
        ...state,
        drivers,
        driverMarkers: filteredDrivers,
        tasks: getTasksFromDrivers(filteredDrivers),
      };
      break;
    case 'remove':
      drivers = Object.assign({}, state.drivers);
      drivers[action.id].deleted = true;
      filteredDrivers = getFilteredDrivers(drivers);
      state = {
        ...state,
        drivers,
        tasks: getTasksFromDrivers(filteredDrivers),
        driverMarkers: filteredDrivers
      };
      break;
    case 'showOnMap':
      let driverMarkers = [];
      if(state.driverMarkers.length === 1 && state.driverMarkers[0].id === action.id){
        driverMarkers = getFilteredDrivers(state.drivers);
      }else{
        driverMarkers = [state.drivers[action.id]];
      }
      
      state = {
        ...state,
        driverMarkers,
        tasks: getTasksFromDrivers(driverMarkers),
      };
      break;
    case 'changeAsignedTo':
    
      drivers = Object.assign({}, state.drivers);
      let tasks = drivers[action.currentDriverId].tasks;
      const tempTask = tasks.filter(task => task.id === action.taskId)[0];
      drivers[action.nextDriverId].tasks = [...drivers[action.nextDriverId].tasks, tempTask];
      drivers[action.currentDriverId].tasks = tasks.filter(task => task.id !== action.taskId);
      
      filteredDrivers = getFilteredDrivers(drivers);

      state = {
        ...state,
        drivers,
        driverMarkers: filteredDrivers,
        tasks: getTasksFromDrivers(filteredDrivers),
      };

      break;
    default:
      break;
  }

  return state;
}

export default reducer;
//140