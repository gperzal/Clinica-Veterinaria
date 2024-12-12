import mongoose from 'mongoose';

// Subesquema para las entradas individuales de tratamientos
const TreatmentEntrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  treatment: { type: String, required: true },
  notes: { type: String, default: "" },
  confirmed: { type: Boolean, default: false },
});

// Esquema principal para el historial de tratamientos
const TreatmentLogSchema = new mongoose.Schema({
  medicalEntry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalEntry',
    required: true,
  },
  startDate: { type: Date},
  endDate: { type: Date },
  treatments: [TreatmentEntrySchema],
  contractSigned: { type: Boolean, default: false },
}, {
  timestamps: true, 
});

export default mongoose.model('TreatmentLog', TreatmentLogSchema);
