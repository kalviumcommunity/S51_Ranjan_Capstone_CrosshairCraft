const mongoose = require('mongoose');

// Define the Crosshair schema
const crosshairSchema = new mongoose.Schema({
  CrosshairID: {
    type: String,
    required: true,
    unique: true,
  },
  Color: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Game: {
    type: String,
    required: true,
  },
  CreatedBy: {
    type: String,
    required: true,
  },
});

// Create and export the model
const crosshair = mongoose.model('Crosshair', crosshairSchema);
module.exports = { crosshair };
