const db = require('./db');

async function addOrder(orderStatus, menuItems, restaurantTable) {
  const result = await db.query(
    `INSERT INTO orders (orderStatus, menuItems, created_at, updated_at, restaurantTable) VALUES (?, ?, NOW(), NOW(), ?)`,
    [orderStatus, menuItems, restaurantTable]
  );

  return result;
}

async function deleteOrder(orderID) {
  const result = await db.query(
    `DELETE FROM orders WHERE orderID = ?`,
    [orderID]
  );

  return result;
}

async function getOrder(orderID) {
  const data = await db.query(
    `SELECT orderID, orderStatus, menuItems, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at, DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') as updated_at, restaurantTable FROM orders WHERE orderID = ?`,
    [orderID]
  );

  return data[0];
}

async function updateOrder(orderID, orderStatus, menuItems, restaurantTable) {
  const result = await db.query(
    `UPDATE orders SET orderStatus = ?, menuItems = ?, updated_at = NOW(), restaurantTable = ? WHERE orderID = ?`,
    [orderStatus, menuItems, restaurantTable, orderID]
  );

  return result;
}

async function getAllOrders() {
  const data = await db.query(
    `SELECT orderID, orderStatus, menuItems, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at, DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') as updated_at, restaurantTable FROM orders ORDER BY created_at DESC`
  );

  return data;
}

async function getFullOrder(restaurantTable) {
  const data = await db.query(
    `SELECT MAX(orders.orderID) OVER(PARTITION BY orders.restaurantTable) as OrderID, menu_item.itemName as MenuItem ,menu_item.description as Description,menu_item.calories as Calories,menu_item.category as Category,order_item.itemQuantity as ItemQuantity ,menu_item.price as Price ,orders.orderStatus as OrderStatus,orders.restaurantTable as RestaurantTable,orders.created_at as Created_at ,orders.updated_at as Updated_at
FROM orders
JOIN order_item ON orders.orderID = order_item.orderID
JOIN menu_item ON menu_item.itemID = order_item.itemID
WHERE orders.restaurantTable = ?
GROUP BY orders.orderID, menu_item.itemName ,menu_item.description ,menu_item.calories ,menu_item.category ,order_item.itemQuantity ,menu_item.price ,orders.orderStatus ,orders.restaurantTable ,orders.created_at ,orders.updated_at
 `,
    [restaurantTable]
  );

  return data;
}

module.exports = {
  addOrder,
  deleteOrder,
  getOrder,
  updateOrder,
  getAllOrders,
  getFullOrder,
};
