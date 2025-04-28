const express = require('express');
const router = express.Router();
const {
  addCustomer,
  authenticateCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
  getAllCustomers,
  validateCustomer,
  addReservation,
  getReservationsByCustomer,
} = require('../services/customer');

// 1) Reservation endpoints first
// POST new reservation
router.post('/reservation', async (req, res, next) => {
  try {
    console.log('POST /customer/reservation payload:', req.body);
    const created = await addReservation(req.body);
    res.json(created);
  } catch (err) {
    err.statusCode = 400;
    err.message = `Error while creating reservation: ${err.message}`;
    next(err);
  }
});

// GET all reservations for a customer
router.get('/reservations', async (req, res, next) => {
  try {
    console.log('🔍 GET /customer/reservations called with:', req.query);
    const customerID = req.query.customerID ?? req.query.customer_id;
    if (!customerID) {
      return res.status(400).json({ message: 'customerID query parameter is required' });
    }
    const list = await getReservationsByCustomer(customerID);
    console.log(`Found ${list.length} reservation(s)`);
    res.json(list);
  } catch (err) {
    console.error('Error in GET /customer/reservations:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// 2) Other customer routes
// POST new customer (signup)
router.post('/', async (req, res, next) => {
  try {
    console.log('POST /customer payload:', req.body);
    const created = await addCustomer(req.body);
    res.json(created);
  } catch (err) {
    err.statusCode = 400;
    err.message = `Error while adding customer: ${err.message}`;
    next(err);
  }
});

// POST login
router.post('/login', async (req, res, next) => {
  try {
    console.log('POST /customer/login payload:', req.body);
    const user = await authenticateCustomer(req.body);
    res.json(user);
  } catch (err) {
    err.statusCode = 401;
    err.message = `Login failed: ${err.message}`;
    next(err);
  }
});

// GET all customers
router.get('/', async (req, res, next) => {
  try {
    const all = await getAllCustomers();
    res.json(all);
  } catch (err) {
    err.statusCode = 500;
    err.message = `Error while fetching customers: ${err.message}`;
    next(err);
  }
});

// GET customer by ID
router.get('/:customerID', async (req, res, next) => {
  try {
    const { customerID } = req.params;
    const cust = await getCustomer(customerID);
    res.json(cust);
  } catch (err) {
    err.statusCode = 500;
    err.message = `Error while fetching customer: ${err.message}`;
    next(err);
  }
});

// PUT update customer by ID
router.put('/:customerID', async (req, res, next) => {
  try {
    const { customerID } = req.params;
    console.log(`PUT /customer/${customerID} payload:`, req.body);
    const updated = await updateCustomer(customerID, req.body);
    res.json(updated);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') err.statusCode = 409;
    err.statusCode = 500;
    err.message = `Error while updating customer: ${err.message}`;
    next(err);
  }
});

// DELETE customer by ID
router.delete('/:customerID', async (req, res, next) => {
  try {
    const { customerID } = req.params;
    const deleted = await deleteCustomer(customerID);
    res.json(deleted);
  } catch (err) {
    err.statusCode = 500;
    err.message = `Error while deleting customer: ${err.message}`;
    next(err);
  }
});

// POST validate (username/email/phone)
router.post('/validate', async (req, res, next) => {
  try {
    const { customerID, ...field } = req.body;
    await validateCustomer(field, customerID);
    res.status(200).json({ valid: true });
  } catch (err) {
    err.statusCode = 409;
    next(err);
  }
});

module.exports = router;
