import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header.js';
import ShiftScheduleView from './components/ShiftScheduleView.js';
//import ShiftManagementView from '../js/components/ShiftManagementView.jsx';

function App() {

    
    

    // const handlePrevWeekTest  = () =>{
    //   console.log('are we here',currentDate.clone().subtract(1, 'week'));
    //     handlePrevWeek(currentDate.subtract(1, 'week'));
    //     setDate(currentDate.subtract(1, 'week'));
    // };
    // const handleNextWeekTest  = () =>{
    //   console.log('are we here',currentDate.clone().add(1, 'week'));
    //     handleNextWeek(currentDate.add(1, 'week'));
    //     setDate(currentDate.add(1, 'week'));
    // };

    


return React.createElement (
  React.Fragment,
  null,
  React.createElement(Header),
  React.createElement(ShiftScheduleView, ),
);

}

ReactDOM.createRoot(document.getElementById('shift-schedule')).render(React.createElement(App));