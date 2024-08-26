const express = require('express');
const Campaign = require('../models/Campaign');
const router = express.Router();

// Create a new campaign
router.post('/campaigns', async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).send(campaign);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all campaigns
router.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.send(campaigns);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single campaign by ID
router.get('/campaigns/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).send();
    res.send(campaign);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a campaign by ID
router.patch('/campaigns/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!campaign) return res.status(404).send();
    res.send(campaign);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a campaign by ID
router.delete('/campaigns/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) return res.status(404).send();
    res.send(campaign);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
  