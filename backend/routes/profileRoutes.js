const express = require('express');
const Profile = require('../models/Profile');
const router = express.Router();

// Create a new profile
router.post('/profiles', async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).send(profile);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all profiles
router.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.send(profiles);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single profile by ID
router.get('/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).send();
    res.send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a profile by ID
router.patch('/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!profile) return res.status(404).send();
    res.send(profile);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a profile by ID
router.delete('/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).send();
    res.send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
