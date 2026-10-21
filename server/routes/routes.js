const express = require('express');
const router = express.Router();
const Route = require('../models/Route');
const { upload } = require('../cloudinary');

router.get('/', async (req, res) => {
  try {
    const routes = await Route.find().sort({ createdAt: -1 });
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Image is required' });

    const stops = req.body.stops
      ? req.body.stops.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const route = new Route({
      title: req.body.title,
      category: req.body.category,
      duration: req.body.duration,
      distance: req.body.distance,
      difficulty: req.body.difficulty,
      stopsCount: stops.length,
      stops,
      imageUrl: req.file.path
    });

    await route.save();
    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Route.findByIdAndDelete(req.params.id);
    res.json({ message: 'Route deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;