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



    class View{
    
        addShift(shiftSchedule) {
            const ul = document.getElementById('test');
            const li = document.createElement('li');
            li.id = `shift-${shiftSchedule.employeeID}`;
            li.dataset.shiftSchedule = JSON.stringify(shiftSchedule);

            const empText = document.createElement('span');
            empText.textContent = `${shiftSchedule.employeeID}: ${shiftSchedule.getEmployeeID()}`;
            empText.style.cursor = 'pointer';

            li.appendChild(empText);
            ul.appendChild(li);
        }
    }    
    
    const view = new View();
    const controller = new ShiftScheduleController(view, ShiftSchedule);
        /*for all employees switch (shift){

            case monday:
                if(shift.startTime < 12pm )
                    add fShiftMon
                if(shift.startTime => 12pm && shift.startTime < 1pm)
                    add lunchMon
                if(shift.startTime >= 1pm)
                    add fShiftMon
            break;

            case tuesday:
                if(shift.startTime < 12pm )
                    add fShiftTue
                if(shift.startTime => 12pm && shift.startTime < 1pm)
                    add lunchTue
                if(shift.startTime >= 1pm)
                    add fShiftTue
            break;

            case wednesday:
                if(shift.startTime < 12pm )
                    add fShiftWed
                if(shift.startTime => 12pm && shift.startTime < 1pm)
                    add lunchWed
                if(shift.startTime >= 1pm)
                    add fShiftWed
            break;

            case thursday:
                if(shift.startTime < 12pm )
                    add fShiftThu
                if(shift.startTime => 12pm && shift.startTime < 1pm)
                    add lunchThu
                if(shift.startTime >= 1pm)
                    add fShiftThu
            break;

            case friday:
                if(shift.startTime < 12pm )
                    add fShiftFri
                if(shift.startTime => 12pm && shift.startTime < 1pm)
                    add lunchFri
                if(shift.startTime >= 1pm)
                    add fShiftFri
            break;

            case saturday:
                if(shift.startTime < 12pm )
                    add fShiftSat
                if(shift.startTime => 12pm && shift.startTime < 1pm)
                    add lunchSat
                if(shift.startTime >= 1pm)
                    add fShiftSat
            break;

            case sunday:
                if(shift.startTime < 12pm )
                    add fShiftSun
                if(shift.startTime => 12pm && shift.startTime < 1pm)
                    add lunchSun
                if(shift.startTime >= 1pm)
                    add fShiftSun
            break;

            default:

        }
        */