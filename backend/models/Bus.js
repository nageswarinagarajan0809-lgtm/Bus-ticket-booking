const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true,
  },
  busName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper'],
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
    default: 50,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  amenities: [
    {
      type: String,
      enum: ['WiFi', 'Charging', 'Toilet', 'AC', 'Blanket', 'Pillow'],
    },
  ],
  operatorName: {
    type: String,
    required: true,
  },
  pricePerSeat: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bus', busSchema);
