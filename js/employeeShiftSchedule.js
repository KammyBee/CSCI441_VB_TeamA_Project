//Written by Avery Turnquest

//import { Employee } from '../models/employee.js';



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


/*
    const updateEmployeeShift = () =>{
        
    }

    const checkShift = (scheduleDay, employee) =>{
    
        //if (startTime > 8am > 12pm)
            //add to morning shift
        
        //if (startTime > 1pm > 5pm)
            //add to 2nd shift

        //if (startTime < 12pm && endTime > 1pm)
            //add to lunch shift
    }

    const checkDay = (shift_schedule) =>{
        //SELECT all employees in table

        /*for all employees switch (date){
            case monday:

            break;

            case monday:

            break;

            case tuesday:

            break;

            case wednesday:

            break;

            case thursday:

            break;

            case friday:

            break;

            case saturday:

            break;

            case sunday:

            break;

            default:

        }
      
    }
        */