import mongoose from 'mongoose';

// Subdocumento para Alergias
const allergySchema = new mongoose.Schema({
    name: String,
});

// Subdocumento para Vacunas
const vaccineSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Tipo de vacuna
    date: { type: Date, required: true },  // Fecha de vacunación
    nextDate: { type: Date },              // Próxima vacunación
    status: { type: String, default: 'Pendiente' } // Estado de la vacuna
});

// Subdocumento para Exámenes Médicos
const examSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Tipo de examen (e.g., radiografía, sangre)
    date: { type: Date, required: true },   // Fecha del examen
    result: { type: String, required: true } // Resultado del examen
});

// Subdocumento para Documentos Médicos
const documentSchema = new mongoose.Schema({
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }, // Opcional, si el documento está asociado a una cita específica
    name: { type: String, required: true },
    type: { type: String, required: true }, // Ejemplo: 'image', 'pdf', etc.
    fileUrl: { type: String, required: true }, // URL o ruta al archivo almacenado
    uploadedAt: { type: Date, default: Date.now },
    expiryDate: { type: Date }, // Opcional, si deseas manejar caducidad de documentos
    sharedWithOwner: { type: Boolean, default: false }, // Indica si el documento está compartido con el cliente
});

// Subdocumento para Prescripciones o Recetas Médicas
const prescriptionSchema = new mongoose.Schema({
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    prescription: String,
    dosage: String,
    duration: String,
    signature: String,
    date: { type: Date, default: Date.now },
});

// Subdocumento para Informes Médicos de Cita
const medicalReportSchema = new mongoose.Schema({
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    veterinarian: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    notes: String, // Notas y observaciones para el cliente
    prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }],
    sharedDocuments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],

});


// Modelo principal de Ficha Médica
const medicalRecordSchema = new mongoose.Schema({
    // Información del dueño
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario
    ownerName: { type: String },   // Redundancia
    ownerPhone: { type: String },  // Redundancia
    ownerEmail: { type: String },  // Redundancia

    // Información de la mascota
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true }, // Referencia a la mascota
    petName: { type: String },      // Redundancia
    petAge: { type: String },       // Edad al momento de la consulta
    petBreed: { type: String },     // Raza
    petColor: { type: String },     // Color
    petSex: { type: String },       // Sexo
    petHealthStatus: { type: String }, // Estado de salud general
    status: { type: String, enum: ['Activo', 'Inactivo'] },    // Estado del animal (Activo/Inactivo)

    // Información médica
    medicalInfo: {
        weight: { type: Number },      // Peso
        temperature: { type: Number }, // Temperatura
        heartRate: { type: Number },   // Frecuencia cardíaca
        hydrationLevel: { type: String }, // Nivel de hidratación
        observations: { type: String }    // Observaciones generales
    },

    // Alergias
    allergies: [allergySchema], // Lista de alergias

    // Historial de vacunación y exámenes
    vaccinations: [vaccineSchema], // Subdocumentos de vacunación
    exams: [examSchema],           // Subdocumentos de exámenes médicos

    // Informes médicos de cita
    medicalReports: [medicalReportSchema],// Subdocumentos de informes médicos de cita

    // Documentos médicos
    documents: [documentSchema], // Subdocumentos de documentos médicos

    // Prescripciones o recetas médicas
    prescriptions: [prescriptionSchema], // Subdocumentos de prescripciones médicas


    // Timestamps para auditoría
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

export default MedicalRecord;
