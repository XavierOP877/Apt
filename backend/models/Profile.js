const mongoose = require('mongoose');

// Define the Profile Schema
const profileSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  socialLinks: {
    linkedin: {
      type: String,
      required: true
    },
    twitter: {
      type: String,
      required: true
    },
    github: {
      type: String,
      required: true
    }
  }
});

// Create a model from the schema
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
