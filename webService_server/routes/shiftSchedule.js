const express = require('express');
const router = express.Router();
const shiftSchedule = require('../services/shiftSchedule');

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
router.delete('/:shiftID', async function(req, res, next) {
  try {
    const { shiftID } = req.params;
    res.json(await shiftSchedule.deleteshiftSchedule(shiftID));
  } catch (err) {
    res.status(500).json({ error: `Error while deleting shiftSchedule: ${err.message}` });
    next(err);
  }
});

/* GET shiftSchedule by shiftID. */

router.get('/:shiftID', async function(req, res, next) {
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
router.put('/:shiftID', async function(req, res, next) {
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

router.get('/', async function(req, res, next) {
  try {
    res.json(await shiftSchedule.getAllshiftSchedules());
  } catch (err) {
    res.status(500).json({ error: `Error while getting all shiftSchedules: ${err.message}` });
    next(err);
  }
});

module.exports = router;
