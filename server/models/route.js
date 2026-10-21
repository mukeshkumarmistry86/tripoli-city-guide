//remaned from route.js to Route.js
const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: String, required: true },   // "4 hours"
  distance: { type: String, required: true },   // "3.2 km"
  difficulty: { type: String, required: true }, // Easy, Medium, Hard
  stopsCount: { type: Number, default: 0 },
  stops: [{ type: String }],                    // ["Place 1", "Place 2"]
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Route', RouteSchema);