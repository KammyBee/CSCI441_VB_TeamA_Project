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
  createSurvey,
  getSurveyByCustomer

} = require('../services/customer');

router.post('/survey', async (req, res) => {
  const payload = {
    customerID:       req.body.customerID,
    food_score:       req.body.food_score,
    service_score:    req.body.service_score,
    atmosphere_score: req.body.atmosphere_score,
    value_score:      req.body.value_score,
    cleanliness_score:req.body.cleanliness_score,
    efficiency_score: req.body.efficiency_score,
    overall_score:    req.body.overall_score,
    feedback:         req.body.feedback
  };

  if (payload.customerID == null || payload.overall_score == null) {
    return res.status(400).json({ error: 'customerID & overall_score required' });
  }

  try {
    const survey = await createSurvey(payload);
    res.status(201).json(survey);
  } catch (err) {
    console.error('Error inserting survey:', err);
    res.status(500).json({ error: 'Could not save survey' });
  }
});

// GET the latest survey for a given customer
router.get('/survey', async (req, res) => {
  const customerID = req.query.customerID;
  if (!customerID) {
    return res.status(400).json({ error: 'customerID query param required' });
  }

  try {
    const survey = await getSurveyByCustomer(customerID);
    res.json(survey);
  } catch (err) {
    console.error('Error fetching survey:', err);
    res.status(500).json({ error: 'Could not load survey' });
  }
});

// POST /customer/validate
router.post('/validate', async (req, res) => {
  const { customerID, ...field } = req.body;
  try {
    await validateCustomer(field, customerID);
    // success → return valid: true
    res.status(200).json({ valid: true });
  } catch (err) {
    // conflict → return JSON error message
    res.status(409).json({ error: err.message });
  }
});
// 1) Reservation endpoints first
// POST new reservation
router.post('/reservation', async (req, res, next) => {
  try {
    // Accept either key name:
    const cid = req.body.customer_id ?? req.body.customerID;
    const { reserved_for, group_size, special_event } = req.body;
    const created = await addReservation({
      customer_id: cid,
      reserved_for, 
      group_size,
      special_event
    });
    res.json(created);
  } catch (err) { /* … */ }
});
router.delete('/reservation/:reservationID', async (req, res, next) => {
  try {
    const { reservationID } = req.params;
    console.log('DELETE /customer/reservation/', reservationID);
    // Soft-delete: mark status=Closed
    const sql = `
      UPDATE reservation
      SET status = 'Closed'
      WHERE reservation_id = ?
    `;
    await db.query(sql, [reservationID]);
    res.json({ success: true });
  } catch (err) {
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



module.exports = router;
