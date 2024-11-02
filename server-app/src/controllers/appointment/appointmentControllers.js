// controllers/appointment/appointmentControllers.js
import Appointment from '../../models/Appointment.js';

// Crear nueva cita
export const createAppointment = async (req, res) => {
    const { date, time, serviceType, specialistId, customerId, petId } = req.body;

    try {
        const newAppointment = new Appointment({
            date,
            time,
            serviceType,
            specialist: specialistId,
            customer: customerId,
            pet: petId
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Cita creada exitosamente', appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la cita', error });
    }
};

// Obtener citas de un usuario
export const getAppointmentsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const appointments = await Appointment.find({ customer: userId }).populate('specialist pet');
        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas', error });
    }
};
