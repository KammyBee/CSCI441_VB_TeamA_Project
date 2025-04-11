//Written by Avery Turnquest

import { Employee } from '../models/employee.js';
import { ShiftSchedule } from '../models/shiftSchedule.js';
import { ShiftScheduleController } from '../controllers/shiftScheduleController.js';



let currentDate = moment();

    const updateWeekRangeDisplay = () => {
        const weekRangeDisplay = document.getElementById('weekRangeDisplay');
        if (weekRangeDisplay) {
            const startOfWeek = currentDate.clone().startOf('week').add(1, 'days').format('MMM D, YYYY');
            const endOfWeek = currentDate.clone().endOf('week').add(1, 'days').format('MMM D, YYYY');
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

    const mondayDisplay = document.getElementById('mondayDisplay');
        if(mondayDisplay) {
            const monday = currentDate.clone().startOf('week').add(1, 'days').format('dddd MMM Do');
            mondayDisplay.textContent = `${monday}`;
        }

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

    const handlePrevWeek = () => {
        currentDate = currentDate.clone().subtract(1, 'week');
        updateWeekRangeDisplay();
    };

    const handleNextWeek = () => {
        currentDate = currentDate.clone().add(1, 'week');
        updateWeekRangeDisplay();
    };

    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded. Initializing week range display...');
        updateWeekRangeDisplay();
    });

    window.handleNextWeek = handleNextWeek;
    window.handlePrevWeek = handlePrevWeek;





        function checkDay(date){
            dayOfWeek = date.checkDay();
            switch(dayOfWeek){
                case 0:
                    return "Sunday";
                    break;
                case 1:
                    return "Monday";
                    break;
                case 2:
                    return "Tuesday";
                    break;
                case 3:
                    return "Wednesday";
                    break;
                case 4:
                    return "Thursday";
                    break;
                case 5:
                    return "Friday";
                    break;
                case 6:
                    return "Saturday";
                    break;
                default:
            }
        }

        function checkShift(startTime){
            if(startTime < 12 ){
                return "morning";
            }

            if(startTime >= 12 && startTime < 13){
                return "lunch";
            }
            else{
                return "afternoon";
            }
        }
/*
        function addEmployee(shiftData){
            if(checkDay(shiftData.date == "<Monday")){
                if(checkShift(shiftData.startTime == "morning")){
                    document.getElementById("fShiftMon").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "lunch")){
                    document.getElementById("lunchMon").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "afternoon")){
                    document.getElementById("sShiftMon").appendChild(shiftData.employeeID);                
                }

            }

            if(checkDay(shiftData.date == "Tuesday")){
                if(checkShift(shiftData.startTime == "morning")){
                    document.getElementById("fShiftTue").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "lunch")){
                    document.getElementById("lunchTue").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "afternoon")){
                    document.getElementById("sShiftTue").appendChild(shiftData.employeeID);                
                }

            }

            if(checkDay(shiftData.date == "wedneday")){
                if(checkShift(shiftData.startTime == "morning")){
                    document.getElementById("fShiftWed").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "lunch")){
                    document.getElementById("lunchWed").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "afternoon")){
                    document.getElementById("sShiftWed").appendChild(shiftData.employeeID);                
                }

            }

            if(checkDay(shiftData.date == "thursday")){
                if(checkShift(shiftData.startTime == "morning")){
                    document.getElementById("fShiftThu").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "lunch")){
                    document.getElementById("lunchThu").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "afternoon")){
                    document.getElementById("sShiftThu").appendChild(shiftData.employeeID);                
                }

            }

            if(checkDay(shiftData.date == "friday")){
                if(checkShift(shiftData.startTime == "morning")){
                    document.getElementById("fShiftFri").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "lunch")){
                    document.getElementById("lunchFri").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "afternoon")){
                    document.getElementById("sShiftFri").appendChild(shiftData.employeeID);                
                }

            }

            if(checkDay(shiftData.date == "saturday")){
                if(checkShift(shiftData.startTime == "morning")){
                    document.getElementById("fShiftSat").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "lunch")){
                    document.getElementById("lunchSat").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "afternoon")){
                    document.getElementById("sShiftSat").appendChild(shiftData.employeeID);                
                }

            }

            if(checkDay(shiftData.date == "sunday")){
                if(checkShift(shiftData.startTime == "morning")){
                    document.getElementById("fShiftSun").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "lunch")){
                    document.getElementById("lunchSun").appendChild(shiftData.employeeID);                
                }
                if(checkShift(shiftData.startTime == "afternoon")){
                    document.getElementById("sShiftSun").appendChild(shiftData.employeeID);                
                }

            }

          
        }*/

        var s = '2025-05-04 00:00:00';
        var m = moment(s, 'YYYY-MM-DD hh:mm:ss').format('dddd');


        var monArr = [];
        var tueArr = [];
        var wedArr = [];
        var thuArr = [];
        var friArr = [];
        var satArr = [];
        var sunArr = [];

        function addEmployeetoArray(shiftSchedule){

            shiftSchedule.forEach((element) => {
                switch(moment(element.date, 'YYYY-MM-DD hh:mm:ss').format('dddd')){
                    case "Sunday":
                        sunArr.push(element);
                        return;
                        break;
                    case "Monday":
                        monArr.push(element);
                        return;
                        break;
                    case "Tueday":
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

        let fShiftMon = document.getElementById('fShiftMon');
        function addEmployeetoTable(dayArr, listMorn, listLunch, listAft){
            dayArr.forEach(element => {
                if (checkShift(element.startTime) == 'morning'){
                    let li = document.createElement('li');
                    li.textContent = `${element.firstName + ' ' + element.lastName}`;
                    listMorn.appendChild(li);
                }
                if (checkShift(element.startTime) == 'lunch'){
                    let li = document.createElement('li');
                    li.textContent = `${element.firstName + ' ' + element.lastName}`;
                    listLunch.appendChild(li);
                }
                if (checkShift(element.startTime) == 'afternoon'){
                    let li = document.createElement('li');
                    li.textContent = `${element.firstName + ' ' + element.lastName}`;
                    listAft.appendChild(li);
                }
            });
        }

        //10:41:50
        //moment(h, 'H:mm:ss').format('H');