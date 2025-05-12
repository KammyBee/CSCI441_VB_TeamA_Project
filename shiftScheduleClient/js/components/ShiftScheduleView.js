//written by: Avery Turnquest & Godbless Amankwah
import React, { useState } from 'react';

export default function ShiftSchedule() {
    // const [startOfWeek, handlePrevWeek ] = useState(moment().startOf('week').add(1, 'days').format('MMM D, YYYY'));
    // const [endOfWeek, handleNextWeek ] = useState(moment().endOf('week').add(1, 'days').format('MMM D, YYYY'));
    const [currentDate, setCurrentDate] = useState(moment());
    const [shiftData, setShiftData] = useState([]);
    
    const startOfWeek = currentDate.clone().startOf('week').add(1, 'days').format('dddd MMM Do');
    const endOfWeek   = currentDate.clone().endOf('week').add(1, 'days').format('dddd MMM Do');

    const handlePrevWeek = () => {
        setCurrentDate(cd => cd.clone().subtract(1, 'week'));
      };
      const handleNextWeek = () => {
        setCurrentDate(cd => cd.clone().add(1, 'week'));
      };
    
    const getStartOfWeek = date => {
        const d = new Date(date);
        d.setHours(0,0,0,0);
        const day = d.getDay();                // 0 = Sunday … 6 = Saturday
        d.setDate(d.getDate() - day);
        return d.toISOString().split('T')[0];  // “YYYY-MM-DD”
      };
    
      const getEndOfWeek = date => {
        const d = new Date(date);
        d.setHours(23,59,59,999);
        const day = d.getDay();
        d.setDate(d.getDate() + (6 - day));
        return d.toISOString().split('T')[0];
      };


    React.useEffect(() => {
       
    
        const fetchSchedules = async () => {
          const startWeek = getStartOfWeek(currentDate);
          const endWeek   = getEndOfWeek(currentDate);
    
          fetch(
            `http://localhost:3100/shiftSchedule?startOfWeek=${encodeURIComponent(startWeek)}&endOfWeek=${encodeURIComponent(endWeek)}`
          ).then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
          }).then(data => setShiftData(data))
          .catch(err => {
            console.error('Fetch error:', err);
            setShiftData({ error: err.message });
          });
        };
    
        fetchSchedules();
      }, [startOfWeek, endOfWeek]);

    React.useEffect(()=>{
      const  updateWeekRangeDisplay = ()=>{
        const weekRangeDisplay = document.getElementById('weekRangeDisplay');
        if (weekRangeDisplay) {
            // const startOfWeek = currentDate.clone().startOf('week').add(1, 'days').format('MMM D, YYYY');
            //const endOfWeek = currentDate.clone().endOf('week').add(1, 'days').format('MMM D, YYYY');
            weekRangeDisplay.textContent = `${startOfWeek} - ${endOfWeek}`;
            console.log('Week range updated:', `${startOfWeek} - ${endOfWeek}`);
        } else {
            console.error('Element with id "weekRangeDisplay" not found.');
        }

        const sundayDisplay = document.getElementById('sundayDisplay');
            if(sundayDisplay) {
                const sunday = currentDate.clone().startOf('week').add(7, 'days').format('dddd MMM Do');
                sundayDisplay.textContent = `${sunday}`;
            }
            console.log('sundayDisplay',sundayDisplay)

            const mondayDisplay = document.getElementById('mondayDisplay');
            if(mondayDisplay) {
                const monday = currentDate.clone().startOf('week').add(1, 'days').format('dddd MMM Do');
                mondayDisplay.textContent = `${monday}`;
            }    
            console.log('mondayDisplay', mondayDisplay);

        const tuesdayDisplay = document.getElementById('tuesdayDisplay');
            if(tuesdayDisplay) {
                const tuesday = currentDate.clone().startOf('week').add(2, 'days').format('dddd MMM Do');
                tuesdayDisplay.textContent = `${tuesday}`;
            }

        const wednesdayDisplay = document.getElementById('wednesdayDisplay');
            if(wednesdayDisplay) {
                const wednesday = currentDate.clone().startOf('week').add(3, 'days').format('dddd MMM Do');
                wednesdayDisplay.textContent = `${wednesday}`;
            }

        const thursdayDisplay = document.getElementById('thursdayDisplay');
            if(thursdayDisplay) {
                const thursday = currentDate.clone().startOf('week').add(4, 'days').format('dddd MMM Do');
                thursdayDisplay.textContent = `${thursday}`;
            }

        const fridayDisplay = document.getElementById('fridayDisplay');
            if(fridayDisplay) {
                const friday = currentDate.clone().startOf('week').add(5, 'days').format('dddd MMM Do');
                fridayDisplay.textContent = `${friday}`;
            }

        const saturdayDisplay = document.getElementById('saturdayDisplay');
            if(saturdayDisplay) {
                const saturday = currentDate.clone().startOf('week').add(6, 'days').format('dddd MMM Do');
                saturdayDisplay.textContent = `${saturday}`;
            }
    };
    updateWeekRangeDisplay();
    },[currentDate])

    

    // const handlePrevWeek = () => {
    //     currentDate = currentDate.clone().subtract(1, 'week');
    //     updateWeekRangeDisplay();
    // };

    // const handleNextWeek = () => {
    //     currentDate = currentDate.clone().add(1, 'week');
    //     updateWeekRangeDisplay();
    // };

    // let obj = {
    //      monArr: [],
    //      tueArr: [],
    //      wedArr: [],
    //      thuArr:[],
    //      friArr: [],
    //      satArr: [],
    //      sunArr: [],
    // }
    // const [weekArray, setWeekArray] = React.useState(obj);
    var monArr = [];
    var tueArr = [];
    var wedArr = [];
    var thuArr = [];
    var friArr = [];
    var satArr = [];
    var sunArr = [];

    const addEmployeetoArray = (shiftData)=>{
        console.log('shift-schedule',shiftData);
       
      
       
        shiftData.forEach((element) => {
            console.log('checking these values',startOfWeek, endOfWeek);
            //if(element.date >= moment(startOfWeek, 'll').format('YYYY-MM-DD HH:mm:ss') && element.date <= moment(endOfWeek, 'll').format('YYYY-MM-DD HH:mm:ss'))
            switch(moment(element.date, 'YYYY-MM-DD hh:mm:ss').format('dddd')){
                case "Sunday":
                    sunArr.push(element);
                    return;
                    break;
                case "Monday":
                    monArr.push(element);
                    return;
                    break;
                case "Tuesday":
                    tueArr.push(element);
                    return;
                    break;
                case "Wednesday":
                    wedArr.push(element);
                    return;
                    break;
                case "Thursday":
                    thuArr.push(element);
                    return;
                    break;
                case "Friday":
                    friArr.push(element);
                    return;
                    break;
                case "Saturday":
                    satArr.push(element);
                    return;
                    break;
                default:
             }});
         }

    const addEmployeetoTable = (dayArr, listMorn, listLunch, listAft, fragMorn, fragLunch, fragAft)=>{
        //let li = document.createElement('li');
        dayArr.forEach(element => {
                if (checkShift(element.startTime) == 'morning'){
                    let li = document.createElement('li');
                    li.textContent = `${element.firstName} ${element.lastName}<br>`;
                    fragMorn.appendChild(li);
                    //listMorn.textContent = `${fragMorn.textContent}`;
                    //console.log('list Morn: ', listMorn);
                }
                if (checkShift(element.startTime) == 'lunch'){
                    let li = document.createElement('li');
                    li.textContent = `${element.firstName} ${element.lastName}<br>`;
                    fragLunch.appendChild(li);
                    //dayArr.pop();
                    //listLunch.textContent = `${fragLunch.textContent}`;
                    //console.log('list Lunch: ', listLunch);
                }
                if (checkShift(element.startTime) == 'afternoon'){
                    let li = document.createElement('li');
                    li.textContent = `${element.firstName} ${element.lastName}<br>`;
                    console.log('Afternoon shift added ', li);
                    fragAft.appendChild(li);
                    //listAft.textContent = `${fragAft.textContent}`;
                    //console.log('list Aft: ', listAft);
                }
            });
            listMorn.innerHTML = `${fragMorn.textContent}`;
            listLunch.innerHTML = `${fragLunch.textContent}`;
            listAft.innerHTML = `${fragAft.textContent}`;
            //empty contents of array
            dayArr.forEach(element =>{dayArr.pop;})

        }
        
        const  checkShift = (startTime)=>{
            //intStartTime = moment(startTime, 'H:mm:ss').format('H');
            if(startTime < "12:00:00" ){
                return "morning";
            }

            if(startTime >= "12:00:00" && startTime < "13:00:00"){
                return "lunch";
            }
            else{
                return "afternoon";
            }
        }
        
        try{
            addEmployeetoArray(shiftData);
        }
        catch(error){
            console.error(error);
            console.log(error, ": Unable to execute addEmployeetoArray.");
        }
        //console.log('tueArr is :', tueArr);
        const fShiftSun = document.getElementById('fShiftSun');
        const lunchSun = document.getElementById('lunchSun');
        const sShiftSun = document.getElementById('sShiftSun');
        const fShiftSunFragment = document.createDocumentFragment();
        const lunchSunFragment = document.createDocumentFragment();
        const sShiftSunFragment = document.createDocumentFragment();

        const fShiftMon = document.getElementById('fShiftMon');
        const lunchMon = document.getElementById('lunchMon');
        const sShiftMon = document.getElementById('sShiftMon');
        const fShiftMonFragment = document.createDocumentFragment();
        const lunchMonFragment = document.createDocumentFragment();
        const sShiftMonFragment = document.createDocumentFragment();

        const fShiftTue = document.getElementById('fShiftTue');
        const lunchTue = document.getElementById('lunchTue');
        const sShiftTue = document.getElementById('sShiftTue');
        const fShiftTueFragment = document.createDocumentFragment();
        const lunchTueFragment = document.createDocumentFragment();
        const sShiftTueFragment = document.createDocumentFragment();

        const fShiftWed = document.getElementById('fShiftWed');
        const lunchWed = document.getElementById('lunchWed');
        const sShiftWed = document.getElementById('sShiftWed');
        const fShiftWedFragment = document.createDocumentFragment();
        const lunchWedFragment = document.createDocumentFragment();
        const sShiftWedFragment = document.createDocumentFragment();

        const fShiftThu = document.getElementById('fShiftThu');
        const lunchThu = document.getElementById('lunchThu');
        const sShiftThu = document.getElementById('sShiftThu');
        const fShiftThuFragment = document.createDocumentFragment();
        const lunchThuFragment = document.createDocumentFragment();
        const sShiftThuFragment = document.createDocumentFragment();

        const fShiftFri = document.getElementById('fShiftFri');
        const lunchFri = document.getElementById('lunchFri');
        const sShiftFri = document.getElementById('sShiftFri');
        const fShiftFriFragment = document.createDocumentFragment();
        const lunchFriFragment = document.createDocumentFragment();
        const sShiftFriFragment = document.createDocumentFragment();

        const fShiftSat = document.getElementById('fShiftSat');
        const lunchSat = document.getElementById('lunchSat');
        const sShiftSat = document.getElementById('sShiftSat');
        const fShiftSatFragment = document.createDocumentFragment();
        const lunchSatFragment = document.createDocumentFragment();
        const sShiftSatFragment = document.createDocumentFragment();

        const fragment = document.createDocumentFragment();
        if(sunArr){
            try{
            addEmployeetoTable(sunArr, fShiftSun, lunchSun, sShiftSun, fShiftSunFragment, lunchSunFragment, sShiftSunFragment); 
            }

            catch(error){
                console.error;
                console.log(error, ":Unable to add Employees to Sunday table");
            }
        //    console.log("addEmployeeToTable active")
        }

        if(monArr){
            try{
                addEmployeetoTable(monArr, fShiftMon, lunchMon, sShiftMon, fShiftMonFragment, lunchMonFragment, sShiftMonFragment); 
            }
            catch(error){
                console.error;
                console.log(error, ":Unable to add Employees to Sunday table");
            }
            
            //console.log("addEmployeeToTable active")
        }

        if(tueArr){
            try{
                addEmployeetoTable(tueArr, fShiftTue, lunchTue, sShiftTue, fShiftTueFragment, lunchTueFragment, sShiftTueFragment); 
            }
            catch(error){
                console.error;
                console.log(error, ":Unable to add Employees to Sunday table");
            }
            
            //console.log("addEmployeeToTable active")
        }

        if(wedArr){
            try{
                addEmployeetoTable(wedArr, fShiftWed, lunchWed, sShiftWed, fShiftWedFragment, lunchWedFragment, sShiftWedFragment); 
            }
            catch(error){
                console.error;
                console.log(error, ":Unable to add Employees to Sunday table");
            }
           
            //console.log("addEmployeeToTable active")
        }

        if(thuArr){
            try{
                addEmployeetoTable(thuArr, fShiftThu, lunchThu, sShiftThu, fShiftThuFragment, lunchThuFragment, sShiftThuFragment); 
            }
            catch(error){
                console.error;
                console.log(error, ":Unable to add Employees to Sunday table");
            }
                //console.log("addEmployeeToTable active")
        }

        if(friArr){
            try{
                addEmployeetoTable(friArr, fShiftFri, lunchFri, sShiftFri, fShiftFriFragment, lunchFriFragment, sShiftFriFragment); 
            }
            catch(error){
                console.error;
                console.log(error, ":Unable to add Employees to Sunday table");
            }
            
            //console.log("addEmployeeToTable active")
        }

        if(satArr){
            try{
                addEmployeetoTable(satArr, fShiftSat, lunchSat, sShiftSat, fShiftSatFragment, lunchSatFragment, sShiftSatFragment); 
            }
            catch(error){
                console.error;
                console.log(error, ":Unable to add Employees to Sunday table");
            }
            
            //console.log("addEmployeeToTable active")
        }   
    

        return (
          
            <div>
              <div className="date-selector">
                <button onClick={() => handlePrevWeek()}>Prev</button>
                <span id="weekRangeDisplay"></span>
                <button onClick={() => handleNextWeek()}>Next</button>
              </div>
        
             {shiftData &&<table className="schedule-body">
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      <h1>M</h1>
                      <div className="schedule-date" id="mondayDisplay">
                        {currentDate.clone().startOf('week').add(1, 'days').format('dddd MMM Do')}
                      </div>
                    </th>
                    <th>
                      <h1>T</h1>
                      <div className="schedule-date" id="tuesdayDisplay">
                        {currentDate.clone().startOf('week').add(2, 'days').format('dddd MMM Do')}
                      </div>
                    </th>
                    <th>
                      <h1>W</h1>
                      <div className="schedule-date" id="wednesdayDisplay">
                        {currentDate.clone().startOf('week').add(3, 'days').format('dddd MMM Do')}
                      </div>
                    </th>
                    <th>
                      <h1>T</h1>
                      <div className="schedule-date" id="thursdayDisplay">
                        {currentDate.clone().startOf('week').add(4, 'days').format('dddd MMM Do')}
                      </div>
                    </th>
                    <th>
                      <h1>F</h1>
                      <div className="schedule-date" id="fridayDisplay">
                        {currentDate.clone().startOf('week').add(5, 'days').format('dddd MMM Do')}
                      </div>
                    </th>
                    <th>
                      <h1>S</h1>
                      <div className="schedule-date" id="saturdayDisplay">
                        {currentDate.clone().startOf('week').add(6, 'days').format('dddd MMM Do')}
                      </div>
                    </th>
                    <th>
                      <h1>S</h1>
                      <div className="schedule-date" id="sundayDisplay">
                        {currentDate.clone().startOf('week').add(7, 'days').format('dddd MMM Do')}
                      </div>
                    </th>
                  </tr>
                </thead>
        
                <tbody>
                  <tr>
                    <th>
                      <h1>First Shift</h1>
                      8:00 A.M. - 12:00 P.M.
                    </th>
                    <td id="fShiftMon">Get Employees</td>
                    <td id="fShiftTue">Get Employees</td>
                    <td id="fShiftWed">Get Employees</td>
                    <td id="fShiftThu">Get Employees</td>
                    <td id="fShiftFri">Get Employees</td>
                    <td id="fShiftSat">Get Employees</td>
                    <td id="fShiftSun">Get Employees</td>
                  </tr>
        
                  <tr>
                    <th>
                      <h1>Lunch</h1>
                      12:00 P.M. - 1:00 P.M.
                    </th>
                    <td id="lunchMon">Get Employees</td>
                    <td id="lunchTue">Get Employees</td>
                    <td id="lunchWed">Get Employees</td>
                    <td id="lunchThu">Get Employees</td>
                    <td id="lunchFri">Get Employees</td>
                    <td id="lunchSat">Get Employees</td>
                    <td id="lunchSun">Get Employees</td>
                  </tr>
        
                  <tr>
                    <th>
                      <h1>Second Shift</h1>
                      1:00 P.M. - 5:00 P.M.
                    </th>
                    <td id="sShiftMon">Get Employees</td>
                    <td id="sShiftTue">Get Employees</td>
                    <td id="sShiftWed">Get Employees</td>
                    <td id="sShiftThu">Get Employees</td>
                    <td id="sShiftFri">Get Employees</td>
                    <td id="sShiftSat">Get Employees</td>
                    <td id="sShiftSun">Get Employees</td>
                  </tr>
                </tbody>
              </table>}
            </div>
          );
        }