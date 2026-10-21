const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const { upload } = require('../cloudinary');

// GET all places
router.get('/', async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single place
router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE place
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Image is required' });

    const place = new Place({
      name: req.body.name,
      category: req.body.category,
      location: req.body.location,
      rating: parseFloat(req.body.rating) || 0,
      price: req.body.price || 'Free',
      description: req.body.description || '',
      isFeatured: req.body.isFeatured === 'true' || req.body.isFeatured === true,
      imageUrl: req.file.path // Cloudinary secure URL
    });

    await place.save();
    res.status(201).json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE place
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const update = {
      name: req.body.name,
      category: req.body.category,
      location: req.body.location,
      rating: parseFloat(req.body.rating) || 0,
      price: req.body.price,
      description: req.body.description,
      isFeatured: req.body.isFeatured === 'true' || req.body.isFeatured === true
    };

    if (req.file) update.imageUrl = req.file.path;

    const place = await Place.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE place
router.delete('/:id', async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json({ message: 'Place deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;