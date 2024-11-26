// models/medical/TreatmentLog.js

import mongoose from 'mongoose';

const TreatmentEntrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  treatment: String,
  notes: String,
  confirmed: { type: Boolean, default: false },
});

const TreatmentLogSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  medicalEntry: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalEntry', required: true },
  startDate: Date,
  endDate: Date,
  extendedDays: { type: Boolean, default: false },
  treatments: [TreatmentEntrySchema],
  contractSigned: { type: Boolean, default: false },
  contractDocument: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' }, // Referencia al contrato firmado
}, {
  timestamps: true,
});

export default mongoose.model('TreatmentLog', TreatmentLogSchema);
