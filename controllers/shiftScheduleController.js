import { fetchShift } from '../models/api.js';

export class ShiftScheduleController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.init();
    }

    async init() {
        // Fetch Shift Schedule
        try {
            const data = await fetchShift();
            data.forEach(shift => {
                const shiftData = new this.model(shift.shiftID, shift.employeeID, shift.date, shift.isDeleted, shift.startTime, shift.endTime);
                this.view.addShift(shiftData);
            });
        } catch (error) {
            console.error('Error fetching shifts:', error);
        }


    }



}