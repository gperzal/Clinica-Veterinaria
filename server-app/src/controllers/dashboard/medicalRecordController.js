// controllers/dashboard/medicalRecordController.js

import MedicalRecord from '../../models/medical/MedicalRecord.js';
import Pet from '../../models/Pet.js';
import Appointment from '../../models/Appointment.js';

// Iniciar la atención de una cita médica y preparar el registro médico
export const attendAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const veterinarianId = req.userId;

    console.log('Veterinario ID:', veterinarianId);
    console.log('Cita ID:', appointmentId);

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

    res.status(200).json({
      message: 'Cita en proceso.',
      appointment,
      medicalRecord,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar la atención de la cita.', error });
  }
};

// Guardar la ficha médica y completar la cita
export const saveMedicalRecord = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const {
      petUpdates,
      medicalEntry,
      allergies,
      vaccinations,
      exams,
      treatmentHistory,
    } = req.body;
    const veterinarianId = req.userId;

    // Obtener la cita
    const appointment = await Appointment.findById(appointmentId).populate('pet');

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada.' });
    }

    // Verificar autorización
    if (appointment.specialist.toString() !== veterinarianId) {
      return res.status(403).json({ message: 'No autorizado para guardar esta ficha médica.' });
    }

    // Actualizar el estado de la cita a 'Completada'
    appointment.status = 'Completada';
    await appointment.save();

    // Actualizar la mascota si es necesario
    if (petUpdates) {
      await Pet.findByIdAndUpdate(appointment.pet._id, petUpdates, { new: true });
    }

    // Obtener el MedicalRecord
    let medicalRecord = await MedicalRecord.findOne({ pet: appointment.pet._id });

    if (!medicalRecord) {
      return res.status(404).json({ message: 'Registro médico no encontrado.' });
    }

    // Agregar la nueva entrada médica
    const newMedicalEntry = {
      date: new Date(),
      appointment: appointment._id,
      veterinarian: veterinarianId,
      ...medicalEntry,
    };
    medicalRecord.medicalEntries.push(newMedicalEntry);

    // Actualizar alergias, vacunas, exámenes
    if (allergies) {
      medicalRecord.allergies = allergies;
    }
    if (vaccinations) {
      medicalRecord.vaccinations = vaccinations;
    }
    if (exams) {
      medicalRecord.exams = exams;
    }

    // Agregar historial de tratamientos si es necesario
    if (treatmentHistory) {
      medicalRecord.treatmentHistory = treatmentHistory;
    }

    // Guardar el registro médico
    await medicalRecord.save();

    res.status(200).json({
      message: 'Ficha médica guardada correctamente.',
      medicalRecord,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la ficha médica.', error });
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

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    const userId = req.userId;



    // Validar que el estado proporcionado es válido
    const validStatuses = ['Pendiente', 'En Proceso', 'Completada'];
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