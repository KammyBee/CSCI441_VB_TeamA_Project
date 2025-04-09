export class ShiftSchedule {
    constructor(employeeID, shiftID, date, isDeleted, startTime, endTime) {
        this.shiftID = shiftID;
        this.employeeID = employeeID;
        this.date = date;
        this.isDeleted = isDeleted;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    getEmployeeID() {
        return `${this.employeeID}`;
    }

    getStartTime() {
        return `${this.startTime}`;
    }

    async fetchShift(shiftID) {
        const response = await fetch(`http://localhost:3100/shift/${shiftID}`);
        if (!response.ok) {
            throw new Error(`Error fetching shift: ${response.statusText}`);
        }
        return await response.json();
    }
}
export default ShiftSchedule;