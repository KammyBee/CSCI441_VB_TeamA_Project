const db = require('./db');

async function addTable(tableStatus, orderID) {
  const result = await db.query(
    `INSERT INTO restaurant_table (tableStatus, orderID) VALUES (?, ?)`,
    [tableStatus, orderID]
  );

  return result;
}

async function deleteTable(tableID) {
  const result = await db.query(
    `DELETE FROM restaurant_table WHERE tableID = ?`,
    [tableID]
  );

  return result;
}

async function getTable(tableID) {
  const data = await db.query(
    `SELECT * FROM restaurant_table WHERE tableID = ?`,
    [tableID]
  );

  return data[0];
}

async function updateTable(tableID, tableStatus, orderID, employeeName) {
  const result = await db.query(
    `UPDATE restaurant_table SET tableStatus = ?, orderID = ?, employeeName = ? WHERE tableID = ?`,
    [tableStatus, orderID, employeeName, tableID]
  );
  return result;
}

async function getAllTables() {
  const data = await db.query(
    // `SELECT * FROM restaurant_table`
    `SELECT * FROM restaurant_table LEFT JOIN orders on tableID = restaurantTable`
  );

  return data;
}

module.exports = {
  addTable,
  deleteTable,
  getTable,
  updateTable,
  getAllTables
};
