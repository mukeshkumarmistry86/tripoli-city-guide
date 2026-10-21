//remaned from plan.js to Plan.js
const mongoose = require('mongoose');

const PlanPlaceSchema = new mongoose.Schema({
  name: String,
  location: String,
  rating: Number,
  imageUrl: String
}, { _id: false });

const PlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String, required: true },       // "This evening at 6:30 PM"
  duration: { type: String, required: true },   // "3 hours"
  stopsCount: { type: Number, default: 0 },
  distance: { type: String, default: '0 km' },
  isOwnPlan: { type: Boolean, default: false }, // true = "My Own Plan" tab
  places: [PlanPlaceSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan', PlanSchema);