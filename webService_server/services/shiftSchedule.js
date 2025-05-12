//written by: Avery Turnquest & Godbless Amankwah
const db = require('./db');

async function addshiftSchedule(shiftScheduleData) {
  const result = await db.query(
    `INSERT INTO shift_schedule (employeeID, date, startTime, endTime) VALUES (?, ?, ?, ?)`,
    [shiftScheduleData.employeeID, shiftScheduleData.date, shiftScheduleData.startTime, shiftScheduleData.endTime]
  );

  return result;
}

async function deleteshiftSchedule(shiftID) {
  const result = await db.query(
    `DELETE FROM shift_schedule WHERE shiftID = ?`,
    [shiftID]
  );

  return result;
}

async function getshiftSchedule(shiftID) {
  const data = await db.query(
    `SELECT shiftID, employeeID, weekNumber, startTime, endTime,DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') as date, DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') as updated_at FROM shift_schedule WHERE shiftID = ?`,
    [shiftID]
  );

  return data[0];
}

async function updateshiftSchedule(shiftID, shiftScheduleData) {
  const result = await db.query(
    `UPDATE shift_schedule SET employeeID = ?,startTime = ?, endTime = ?, date = ? WHERE shiftID = ? `,
    [shiftScheduleData.employeeID, shiftScheduleData.startTime, shiftScheduleData.endTime, shiftScheduleData.date, shiftID]
  );

  return result;
}

async function getAllshiftSchedules({ startOfWeek, endOfWeek }) {
  if (!startOfWeek || !endOfWeek) {
    throw new Error('No startOfWeek or endOfWeek provided');
  }

  const sql = `
    SELECT
      shiftID,
      shift_schedule.employeeID,
      employee.firstName,
      employee.lastName,
      startTime,
      endTime,
      DATE_FORMAT(shift_schedule.date, '%Y-%m-%d %H:%i:%s') AS date,
      DATE_FORMAT(shift_schedule.updated_at, '%Y-%m-%d %H:%i:%s') AS updated_at
    FROM shift_schedule
    LEFT JOIN employee
      ON employee.employeeID = shift_schedule.employeeID
    WHERE shift_schedule.date BETWEEN ? AND ?
  `;

  try {
    const rows =  db.query(sql, [startOfWeek, endOfWeek]);
    return rows;
  } catch (dbErr) {
    console.error('🛑  Database error in getAllShiftSchedules:\n', dbErr.stack);
    throw dbErr;
  }
}

module.exports = {
  addshiftSchedule,
  deleteshiftSchedule,
  getshiftSchedule,
  updateshiftSchedule,
  getAllshiftSchedules
};
