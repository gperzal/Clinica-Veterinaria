// models/medical/MedicalControl.js

import mongoose from 'mongoose';

const MedicalControlSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  date: Date,
  description: String,
  testsRequired: [String],
  notificationsSent: [{ type: Date }],
}, {
  timestamps: true,
});

export default mongoose.model('MedicalControl', MedicalControlSchema);
