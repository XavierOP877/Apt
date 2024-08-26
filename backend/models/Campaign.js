const mongoose = require('mongoose');

// Define the Campaign Schema
const campaignSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  projectTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  targetFund: {
    type: Number,
    required: true
  },
  fundReceived: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

// Create a model from the schema
const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
