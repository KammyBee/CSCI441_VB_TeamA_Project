// index.js - Express server setup
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3100;

// Routers
const customerRouter = require('./routes/customer');
const employeeRouter = require('./routes/employee');
const employeeTypeRouter = require('./routes/employeeType');
const ingredientRouter = require('./routes/ingredient');
const itemIngredientRouter = require('./routes/item_ingredient');
const menuItemRouter = require('./routes/menu_item');
const orderItemRouter = require('./routes/order_item');
const ordersRouter = require('./routes/orders');
const paymentMethodsRouter = require('./routes/payment_methods');
const restaurantTableRouter = require('./routes/restaurant_table');
const timeLogRouter = require('./routes/time_log');
const transactionItemRouter = require('./routes/transaction_item');
const transactionRouter = require('./routes/transaction');
const customRouter = require('./routes/custom');
const shiftScheduleRouter = require('./routes/shiftSchedule');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/assets', express.static(path.join(__dirname, './assets')));
app.use('/css', express.static(path.join(__dirname, './css')));

// API routes (order matters)
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/employee_type', employeeTypeRouter);
app.use('/ingredient', ingredientRouter);
app.use('/item_ingredient', itemIngredientRouter);
app.use('/menu_item', menuItemRouter);
app.use('/order_item', orderItemRouter);
app.use('/orders', ordersRouter);
app.use('/payment_methods', paymentMethodsRouter);
app.use('/restaurant_table', restaurantTableRouter);
app.use('/time_log', timeLogRouter);
app.use('/transaction_item', transactionItemRouter);
app.use('/transaction', transactionRouter);
app.use('/custom', customRouter);
app.use('/shiftSchedule', shiftScheduleRouter);

// Error handler (always after API mounts)
app.use((err, req, res, next) => {
  console.error(err.message, err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message });
});

// HTML view routes (customer portal)
app.get('/customer/:page?', (req, res) => {
  const page = req.params.page || 'customerLoginPage';
  const filePath = path.join(
    __dirname,
    '../views/customerComponents',
    `${page}.html`
  );
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending HTML page', err);
      res.status(err.status || 500).end();
    }
  });
});

// Fallback: redirect all other routes to customer portal
app.get('*', (req, res) => {
  res.redirect('/customer');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
