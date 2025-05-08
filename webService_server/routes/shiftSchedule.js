const express = require('express');
const router = express.Router();
const {
  addshiftSchedule,
  deleteshiftSchedule,
  getshiftSchedule,
  updateshiftSchedule,
  getAllshiftSchedules
} = require('../services/shiftSchedule');

/* POST new shiftSchedule. */

router.post('/', async function(req, res, next) {
  try {
    const shiftScheduleData = req.body;
    res.json(await shiftSchedule.addshiftSchedule(shiftScheduleData));
  } catch (err) {
    res.status(500).json({ error: `Error while adding shiftSchedule: ${err.message}` });
    next(err);
  }
});

/* DELETE shiftSchedule by shiftID. */
router.delete('/:shiftID', async (req, res, next)=> {
  try {
    const { shiftID } = req.params;
    res.json(await shiftSchedule.deleteshiftSchedule(shiftID));
  } catch (err) {
    res.status(500).json({ error: `Error while deleting shiftSchedule: ${err.message}` });
    next(err);
  }
});

/* GET shiftSchedule by shiftID. */

router.get('/:shiftID', async (req, res, next) =>{
  try {
    const { shiftID } = req.params;
    const schedule = await shiftSchedule.getshiftSchedule(shiftID);
    if (!schedule) {
      return res.status(404).json({ error: 'ShiftSchedule not found' });
    }
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: `Error while getting shiftSchedule: ${err.message}` });
    next(err);
  }
});

/* PUT update shiftSchedule by shiftID. */
router.put('/:shiftID', async (req, res, next) =>{
 
  try {
    const { shiftID } = req.params;
    const shiftScheduleData = req.body;
    res.json(await shiftSchedule.updateshiftSchedule(shiftID, shiftScheduleData));
    console.log("reached");
  } catch (err) {
    res.status(500).json({ error: `Error while updating shiftSchedule: ${err.message}` });
    next(err);
  }
});

/* GET all shiftSchedules. */

router.get('/', async (req, res) => {
  console.log('req.query →', req.query);
  const { startOfWeek, endOfWeek } = req.query;
  if (!startOfWeek || !endOfWeek) {
    return res.status(400).json({ error: 'Missing dates' });
  }
  try {
    const rows = await getAllshiftSchedules({ startOfWeek, endOfWeek });
    res.json(rows);
  } catch (err) {
    console.error('🛑 handler error:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
