const db = require('./db');

async function addshiftSchedule(shiftScheduleData) {
  const result = await db.query(
    `INSERT INTO shift_schedule (week_Id, employeeID, weekNumber, date, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?)`,
    [shiftScheduleData.week_Id, shiftScheduleData.employeeID, shiftScheduleData.weekNumber, shiftScheduleData.date, shiftScheduleData.startTime, shiftScheduleData.endTime]
  );

  return result;
}

async function deleteshiftSchedule(shiftScheduleID) {
  const result = await db.query(
    `DELETE FROM shiftSchedule WHERE shiftScheduleID = ?`,
    [shiftScheduleID]
  );

  return result;
}

async function getshiftSchedule(shiftScheduleID) {
  const data = await db.query(
    `SELECT week_Id, employeeID, weekNumber, startTime, endTime,DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') as date, DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') as updated_at FROM shift_schedule WHERE shiftScheduleID = ?`,
    [shiftScheduleID]
  );

  return data[0];
}

async function updateshiftSchedule(shiftScheduleID, shiftScheduleData) {
  const result = await db.query(
    `UPDATE shift_schedule SET week_Id = ?, employeeID = ?, weekNumber = ?, startTime = ?, endTime = ?, date = ? WHERE shiftScheduleID = ? `,
    [shiftScheduleData.week_Id, shiftScheduleData.employeeID, shiftScheduleData.weekNumber, shiftScheduleData.startTime, shiftScheduleData.endTime, shiftScheduleData.date, shiftScheduleID]
  );

  return result;
}

async function getAllshiftSchedules() {
  const data = await db.query(
    `SELECT week_Id, employeeID, weekNumber, startTime, endTime, DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') as date, DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') as updated_at FROM shift_schedule`
  );

  return data;
}

module.exports = {
  addshiftSchedule,
  deleteshiftSchedule,
  getshiftSchedule,
  updateshiftSchedule,
  getAllshiftSchedules
};
