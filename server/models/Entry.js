// server/models/Entry.js
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  contact: { type: String, required: true, match: /^\d{10,15}$/ },
  email: { type: String, required: true, trim: true, lowercase: true, match: /.+\@.+\..+/ },
  address: { type: String, required: true },
  idProof: { type: String, required: true },
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'], required: true },
  familyMembers: { type: Number, min: 0, required: true },
  occupation: { type: String, required: true },
  income: { type: Number, min: 0, required: true },
  education: { type: String, required: true },
  joiningAs: { type: String, enum: ['Learner', 'Trainer', 'Volunteer', 'Other'], required: true },
  supportNeeded: { type: String, required: true },
  languages: { type: [String], required: true },
  skills: { type: [String], required: true },
  skillsLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  preferredTraining: { type: String },
  digitalLiteracy: { type: String, enum: ['None', 'Basic', 'Intermediate', 'Advanced'], required: true },
  healthConcerns: { type: String },
  refugeeStatus: { type: String, enum: ['Citizen', 'Refugee', 'Displaced', 'Other'], required: true },
  availability: { type: String, required: true },
  emergencyName: { type: String, required: true },
  emergencyRelation: { type: String, required: true },
  emergencyContact: { type: String, required: true, match: /^\d{10,15}$/ },
  declaration: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entry', entrySchema);
