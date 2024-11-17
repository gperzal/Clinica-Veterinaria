import mongoose from 'mongoose';

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

    // Información médica
    medicalInfo: {
        weight: { type: Number },      // Peso
        temperature: { type: Number }, // Temperatura
        heartRate: { type: Number },   // Frecuencia cardíaca
        hydrationLevel: { type: String }, // Nivel de hidratación
        observations: { type: String }    // Observaciones generales
    },

    // Alergias
    allergies: [{ type: String }], // Lista de alergias

    // Historial de vacunación y exámenes
    vaccinations: [vaccineSchema], // Subdocumentos de vacunación
    exams: [examSchema],           // Subdocumentos de exámenes médicos

    // Notas del veterinario
    vetNotes: { type: String }, // Observaciones generales del veterinario

    // Timestamps para auditoría
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

export default MedicalRecord;
