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

/* DELETE shiftSchedule by shiftScheduleID. */
router.delete('/:shiftScheduleID', async function(req, res, next) {
  try {
    const { shiftScheduleID } = req.params;
    res.json(await shiftSchedule.deleteshiftSchedule(shiftScheduleID));
  } catch (err) {
    res.status(500).json({ error: `Error while deleting shiftSchedule: ${err.message}` });
    next(err);
  }
});

/* GET shiftSchedule by shiftScheduleID. */

router.get('/:shiftScheduleID', async function(req, res, next) {
  try {
    const { shiftScheduleID } = req.params;
    res.json(await shiftSchedule.getshiftSchedule(shiftScheduleID));
  } catch (err) {
    res.status(500).json({ error: `Error while getting shiftSchedule: ${err.message}` });
    next(err);
  }
});

/* PUT update shiftSchedule by shiftScheduleID. */
router.put('/:shiftScheduleID', async function(req, res, next) {
  try {
    const { shiftScheduleID } = req.params;
    const shiftScheduleData = req.body;
    res.json(await shiftSchedule.updateshiftSchedule(shiftScheduleID, shiftScheduleData));
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
