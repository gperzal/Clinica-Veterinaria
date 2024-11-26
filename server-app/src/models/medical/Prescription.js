// models/medical/Prescription.js

import mongoose from 'mongoose';

const PrescriptionSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  medicalEntry: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalEntry', required: true },
  veterinarian: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  prescription: String,
  dosage: String,
  duration: String,
  signature: String, // Firma electrónica si aplica
}, {
  timestamps: true,
});

export default mongoose.model('Prescription', PrescriptionSchema);
