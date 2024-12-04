// controllers/dashboard/medicalRecordController.js

import MedicalRecord from '../../models/medical/MedicalRecord.js';
import TreatmentLog from '../../models/medical/TreatmentLog.js';
import Pet from '../../models/Pet.js';
import Appointment from '../../models/Appointment.js';


// Iniciar la atención de una cita médica y preparar el registro médico
export const attendAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const veterinarianId = req.userId;

    // Obtener la cita y popular pet y owner
    const appointment = await Appointment.findById(appointmentId)
      .populate({
        path: 'pet',
        model: 'Pet',
        select: 'name age breed color sex chipNumber healthStatus status owner',
        populate: {
          path: 'owner',
          model: 'User',
          select: 'name email phone address',
        },
      });

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada.' });
    }

    // Verificar que el veterinario es el asignado a la cita
    if (appointment.specialist.toString() !== veterinarianId) {
      return res.status(403).json({ message: 'No autorizado para atender esta cita.' });
    }

    // Actualizar el estado de la cita a 'En Proceso' si está 'Pendiente'
    if (appointment.status === 'Pendiente') {
      appointment.status = 'En Proceso';
      await appointment.save();
    }

    // Obtener o crear el MedicalRecord de la mascota
    let medicalRecord = await MedicalRecord.findOne({ pet: appointment.pet._id });

    if (!medicalRecord) {
      medicalRecord = new MedicalRecord({ pet: appointment.pet._id });
      await medicalRecord.save();
    }

    // Buscar la entrada médica de esta cita
    let medicalEntry = medicalRecord.medicalEntries.find(
      (entry) => entry.appointment.toString() === appointmentId
    );

    if (!medicalEntry) {
      // Crear nueva entrada médica si no existe
      medicalEntry = {
        appointment: appointmentId,
        veterinarian: veterinarianId,
        medicalInfo: {},
        notes: '',
        prescriptions: [],
        documents: [],
      };

      medicalRecord.medicalEntries.push(medicalEntry);
      await medicalRecord.save();
    }

    // Verificar si ya existe un TreatmentLog asociado a esta entrada médica
    let treatmentLog = await TreatmentLog.findOne({ medicalEntry: medicalEntry._id });

    if (!treatmentLog) {
      // Crear un nuevo registro de tratamiento vacío
      treatmentLog = new TreatmentLog({
        medicalEntry: medicalEntry._id,
        startDate: null,
        endDate: null,
        treatments: [], // Inicialmente vacío
        contractSigned: false,
      });
      await treatmentLog.save();

      // Asociar el `treatmentLog` al `MedicalEntry`
      medicalEntry.treatmentLog = treatmentLog._id;
      await medicalRecord.save();
    }

    // Responder con datos estructurados
    res.status(200).json({
      message: 'Cita en proceso.',
      appointment, // Información de la cita
      medicalEntry: {
        ...medicalEntry.toObject(),
        treatmentLog, // Asociar directamente el registro de tratamiento en lugar de repetirlo
      },
      medicalRecord: {
        allergies: medicalRecord.allergies,
        vaccinations: medicalRecord.vaccinations,
        exams: medicalRecord.exams,
        medicalEntries: medicalRecord.medicalEntries.map((entry) => ({
          ...entry.toObject(),
          treatmentLog: entry._id.toString() === medicalEntry._id.toString() ? treatmentLog : undefined,
        })),
      },
    });
  } catch (error) {
    console.error('Error al iniciar la atención de la cita:', error);
    res.status(500).json({ message: 'Error al iniciar la atención de la cita.', error });
  }
};





// Guardar la ficha médica y completar la citala cita
export const saveMedicalRecord = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const {
      petUpdates,
      medicalEntry,
      allergies,
      vaccinations,
      exams,
      notes, // Notas de la cita
    } = req.body;

    const veterinarianId = req.userId;

    console.log("Datos recibidos:", {
      veterinarianId,
      appointmentId,
      petUpdates,
      medicalEntry,
      allergies,
      vaccinations,
      exams,
      notes,
    });

    // Obtener la cita
    const appointment = await Appointment.findById(appointmentId).populate('pet');
    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada.' });
    }

    // Verificar autorización
    if (appointment.specialist.toString() !== veterinarianId) {
      return res.status(403).json({ message: 'No autorizado para guardar esta ficha médica.' });
    }

    // Actualizar los datos de la mascota si es necesario
    if (petUpdates) {
      await Pet.findByIdAndUpdate(appointment.pet._id, petUpdates, { new: true });
    }

    // Obtener o crear el registro médico
    let medicalRecord = await MedicalRecord.findOne({ pet: appointment.pet._id });
    if (!medicalRecord) {
      medicalRecord = new MedicalRecord({
        pet: appointment.pet._id,
        allergies: [],
        vaccinations: [],
        exams: [],
        medicalEntries: [],
      });
    }

    // Verificar si ya existe una entrada médica para esta cita
    let existingEntry = medicalRecord.medicalEntries.find(
      (entry) => entry.appointment.toString() === appointmentId
    );

    if (existingEntry) {
      // Actualizar la entrada médica existente
      existingEntry.medicalInfo = medicalEntry;
      existingEntry.notes = notes; // Asignar la nota a la entrada médica
      existingEntry.updatedAt = new Date();
    } else {
      // Crear una nueva entrada médica
      const newMedicalEntry = {
        date: new Date(),
        appointment: appointment._id,
        veterinarian: veterinarianId,
        medicalInfo: medicalEntry,
        notes: notes,
      };
      medicalRecord.medicalEntries.push(newMedicalEntry);
    }

    // Actualizar otros campos si se proporcionan
    if (allergies) medicalRecord.allergies = allergies;
    if (vaccinations) medicalRecord.vaccinations = vaccinations;
    if (exams) medicalRecord.exams = exams.map((exam) => ({
      type: String(exam.type),
      date: new Date(exam.date),
      result: String(exam.result),
    }));
    if (treatmentHistory) medicalRecord.treatmentHistory = treatmentHistory;

    // Guardar el registro médico
    await medicalRecord.save();

    res.status(200).json({
      message: 'Ficha médica guardada correctamente.',
      medicalRecord,
    });
  } catch (error) {
    console.error('Error al guardar la ficha médica:', error);
    res.status(500).json({ message: 'Error al guardar la ficha médica.', error });
  }
};

// Actualizar un sector de tratamiento
export const updateTreatmentLog = async (req, res) => {
  try {
    const { treatmentId } = req.params;
    const { startDate, endDate, contractSigned } = req.body;

    const treatmentLog = await TreatmentLog.findByIdAndUpdate(
      treatmentId,
      { startDate, endDate, contractSigned },
      { new: true }
    );

    if (!treatmentLog) {
      return res.status(404).json({ message: "TreatmentLog no encontrado." });
    }

    res.status(200).json({ message: "TreatmentLog actualizado.", treatmentLog });
  } catch (error) {
    console.error("Error al actualizar TreatmentLog:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Actualizar tratamientos de una entrada de tratamiento
export const updateTreatments = async (req, res) => {
  try {
    const { treatmentId } = req.params;
    const { treatments } = req.body;
    console.log("Datos recibidos1:", req.params);
    console.log("Datos recibidos2:", {
      treatmentId,
      treatments,
    });

    const treatmentLog = await TreatmentLog.findByIdAndUpdate(
      treatmentId,
      { treatments },
      { new: true }
    );

    if (!treatmentLog) {
      return res.status(404).json({ message: "TreatmentLog no encontrado." });
    }

    res.status(200).json({ message: "Tratamientos actualizados.", treatmentLog });
  } catch (error) {
    console.error("Error al actualizar tratamientos:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};


// oBTENER LA ID DE TRATAMIENTO 
export const getTreatmentLogByAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    // Buscar el registro médico (MedicalRecord) asociado a la cita
    const medicalRecord = await MedicalRecord.findOne({ "medicalEntries.appointment": appointmentId });

    if (!medicalRecord) {
      return res.status(404).json({ message: "No se encontró un registro médico para esta cita." });
    }

    // Buscar la entrada médica correspondiente a la cita
    const medicalEntry = medicalRecord.medicalEntries.find(
      (entry) => entry.appointment.toString() === appointmentId
    );

    if (!medicalEntry) {
      return res.status(404).json({ message: "No se encontró la entrada médica para esta cita." });
    }

    // Buscar el TreatmentLog asociado a la entrada médica
    const treatmentLog = await TreatmentLog.findOne({ _id: medicalEntry.treatmentLog });

    if (!treatmentLog) {
      return res.status(404).json({ message: "No se encontró un registro de tratamiento para esta cita." });
    }

    // Devolver el tratamiento encontrado
    res.status(200).json(treatmentLog);
  } catch (error) {
    console.error("Error al buscar el registro de tratamiento:", error);
    res.status(500).json({ message: "Error al buscar el registro de tratamiento.", error: error.message });
  }
};


export const getTreatmentLog = async (req, res) => {
  const { treatmentId } = req.params; // Obtener el ID de los parámetros de la solicitud
  console.log("ID recibido:", treatmentId);
  // Validación inicial para asegurar que el ID no esté vacío o sea inválido
  if (!treatmentId) {
    return res.status(400).json({ message: "El ID del registro de tratamiento es obligatorio." });
  }

  console.log("ID del tratamiento recibido:", treatmentId);

  try {
    // Buscar el registro de tratamiento por su ID
    const treatmentLog = await TreatmentLog.findById(treatmentId)

    // Verificar si el registro de tratamiento existe
    if (!treatmentLog) {
      console.warn(`Registro de tratamiento con ID ${treatmentId} no encontrado.`);
      return res.status(404).json({ message: "Registro de tratamiento no encontrado." });
    }

    // Devolver el registro de tratamiento en la respuesta
    return res.status(200).json(treatmentLog);

  } catch (error) {
    // Capturar errores en la búsqueda o conexión a la base de datos
    console.error(`Error al obtener el registro de tratamiento con ID ${treatmentId}:`, error);
    return res.status(500).json({ message: "Error interno al obtener el registro de tratamiento." });
  }
};

// Actualizar una entrada médica específica
export const updateMedicalEntry = async (req, res) => {
  try {
    const { medicalRecordId, entryId } = req.params;
    const updates = req.body;
    const veterinarianId = req.userId;

    // Obtener el registro médico
    const medicalRecord = await MedicalRecord.findById(medicalRecordId);

    if (!medicalRecord) {
      return res.status(404).json({ message: 'Registro médico no encontrado.' });
    }

    // Encontrar la entrada médica
    const entry = medicalRecord.medicalEntries.id(entryId);

    if (!entry) {
      return res.status(404).json({ message: 'Entrada médica no encontrada.' });
    }

    // Verificar que el veterinario que intenta actualizar es el mismo que creó la entrada
    if (entry.veterinarian.toString() !== veterinarianId) {
      return res.status(403).json({ message: 'No autorizado para actualizar esta entrada médica.' });
    }

    // Actualizar los campos de la entrada médica
    Object.assign(entry, updates);

    // Registrar la fecha de actualización
    entry.updatedAt = new Date();

    await medicalRecord.save();

    res.status(200).json({ message: 'Entrada médica actualizada correctamente.', entry });
  } catch (error) {
    console.error('Error al actualizar la entrada médica:', error);
    res.status(500).json({ message: 'Error al actualizar la entrada médica.', error });
  }
};


// Obtener el registro médico de una mascota
export const getMedicalRecordByPet = async (req, res) => {
  try {
    const { petId } = req.params;

    const medicalRecord = await MedicalRecord.findOne({ pet: petId })
      .populate('pet')
      .populate({
        path: 'medicalEntries',
        populate: { path: 'veterinarian', select: 'name email' },
      })
      .populate('vaccinations')
      .populate('exams');

    if (!medicalRecord) {
      return res.status(404).json({ message: 'Registro médico no encontrado.' });
    }

    res.status(200).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro médico.', error });
  }
};



// Eliminar el MedicalRecord de una mascota
export const deleteMedicalRecord = async (req, res) => {
  try {
    const { petId } = req.params;

    const medicalRecord = await MedicalRecord.findOneAndDelete({ pet: petId });

    if (!medicalRecord) {
      return res.status(404).json({ message: 'Registro médico no encontrado.' });
    }

    res.status(200).json({ message: 'Registro médico eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el registro médico.', error });
  }
};



// Actualizar información de la mascota (si es necesario)
export const updatePet = async (req, res) => {
  try {
    const { petId } = req.params;
    const updates = req.body;

    const updatedPet = await Pet.findByIdAndUpdate(petId, updates, { new: true });

    if (!updatedPet) {
      return res.status(404).json({ message: 'Mascota no encontrada.' });
    }

    res.status(200).json({ message: 'Información de la mascota actualizada.', pet: updatedPet });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la mascota.', error });
  }
};

// Actualizar el estado de una cita
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    // Validar que el estado proporcionado es válido
    const validStatuses = ['Pendiente', 'En Proceso', 'Finalizado'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Estado no válido.' });
    }

    // Obtener la cita
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada.' });
    }

    // Verificar si el usuario es el especialista asignado o un administrador
    if (appointment.specialist.toString() !== userId && !req.user.roles.includes('Administrador')) {
      return res.status(403).json({ message: 'No autorizado para cambiar el estado de esta cita.' });
    }

    // Actualizar el estado de la cita
    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: 'Estado de la cita actualizado correctamente.', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado de la cita.', error });
  }
};