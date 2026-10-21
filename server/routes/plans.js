const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const plan = new Plan({
      title: req.body.title,
      time: req.body.time,
      duration: req.body.duration,
      stopsCount: parseInt(req.body.stopsCount) || 0,
      distance: req.body.distance || '0 km',
      isOwnPlan: req.body.isOwnPlan === true || req.body.isOwnPlan === 'true',
      places: req.body.places || []
    });

    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;