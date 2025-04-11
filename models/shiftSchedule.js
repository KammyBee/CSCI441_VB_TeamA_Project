export class ShiftSchedule {
    constructor(employeeID, shiftID, date, isDeleted, startTime, endTime, firstName, lastName) {
        this.shiftID = shiftID;
        this.employeeID = employeeID;
        this.date = date;
        this.isDeleted = isDeleted;
        this.startTime = startTime;
        this.endTime = endTime;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getEmployeeID() {
        return `${this.employeeID}`;
    }

    getStartTime() {
        return `${this.startTime}`;
    }

    async fetchShift(shiftID) {
        const response = await fetch(`http://localhost:3100/shift_schedule/${shiftID}`);
        if (!response.ok) {
            throw new Error(`Error fetching shift: ${response.statusText}`);
        }
        return await response.json();
    }
}
export default ShiftSchedule;