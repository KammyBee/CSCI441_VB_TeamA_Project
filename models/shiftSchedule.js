class ShiftSchedule {
    constructor(employeeID, shiftID, date, isDeleted, startTime, endTime) {
        this.shiftID = shiftID;
        this.employeeID = employeeID;
        this.date = date;
        this.isDeleted = isDeleted;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}