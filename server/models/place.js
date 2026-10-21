//remaned from place.js to Place.js
const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },   // Historical, Food, Museum, etc.
  location: { type: String, required: true },   // Medina, Marina, etc.
  rating: { type: Number, default: 0 },
  price: { type: String, default: 'Free' },     // "Free" or "40 LYD"
  description: { type: String, default: '' },
  imageUrl: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Place', PlaceSchema);
