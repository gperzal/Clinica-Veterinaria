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
  notes: String,         // Notas internas del veterinario
  publicNotes: String,   // Notas compartidas con el cliente
  isClinicalRest: Boolean, // Indica si requiere reposo clínico
  prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }],
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
}, {
  timestamps: true,
});

// Esquema principal de la ficha médica
const MedicalRecordSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true, unique: true },
  allergies: [{ type: String }],  // Lista de alergias
  vaccinations: [{
    type: String,
    date: Date,
    nextDate: Date,
    status: String, // 'Vacunar' o 'Al día'
  }],
  exams: [{
    type: String,
    date: Date,
    result: String,
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  }],
  medicalEntries: [MedicalEntrySchema], // Historial de atenciones médicas
}, {
  timestamps: true,
});

export default mongoose.model('MedicalRecord', MedicalRecordSchema);
