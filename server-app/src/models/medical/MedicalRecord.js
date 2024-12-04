// models/medical/MedicalRecord.js

import mongoose from 'mongoose';

// Subesquema para entradas médicas
const MedicalEntrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  veterinarian: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicalInfo: {
    weight: Number,
    temperature: Number,
    heartRate: Number,
    respiratoryRate: Number,
    bodyCondition: Number,
    hydrationLevel: Number,
    systolicPressure: Number,
    diastolicPressure: Number,
    mucosaColor: String,
    mucosaObservations: String,
    activityLevel: String,
    temperament: String,
    diet: String,
    appetiteDigestion: String,
  },
  notes: { type: String },
  prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }],
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  treatmentLog: { type: mongoose.Schema.Types.ObjectId, ref: "TreatmentLog" },
}, {
  timestamps: true,
});

// Esquema principal de la ficha médica
const MedicalRecordSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true, unique: true },
  allergies: [{ type: String }],
  vaccinations: [{
    type: { type: String, required: true },
    date: { type: Date, required: true },
    nextDate: { type: Date, default: null },
    status: { type: String, default: 'Vacunar' },
  }],
  exams: [{
    type: { type: String, required: true },
    date: { type: Date, required: true },
    result: { type: String, required: true },
  }],
  medicalEntries: [MedicalEntrySchema], // Historial de atenciones médicas
}, {
  timestamps: true,
});

export default mongoose.model('MedicalRecord', MedicalRecordSchema);
