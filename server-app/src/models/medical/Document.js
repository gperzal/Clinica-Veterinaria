// models/medical/Document.js

import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  medicalEntry: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalEntry' }, // Opcional, si el documento está asociado a una atención específica
  name: { type: String, required: true },
  type: { type: String, required: true }, // 'image', 'pdf', etc.
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  expiryDate: { type: Date }, // Si aplica caducidad
  sharedWithOwner: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export default mongoose.model('Document', DocumentSchema);
