// controllers/appointment/appointmentControllers.js
import Appointment from '../../models/Appointment.js';

// Crear nueva cita
export const createAppointment = async (req, res) => {
    const { date, time, serviceType, specialistId, ownerId, petId } = req.body;

    try {
        const newAppointment = new Appointment({
            date,
            time,
            serviceType,
            specialist: specialistId,
            owner: ownerId,
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
    // console.log("User ID:", req.params);
    try {
        const appointments = await Appointment.find({ owner: userId }).populate('specialist pet');
        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas', error });
    }
};


// Obtener citas de un especialista (veterinario)
export const getAppointmentsBySpecialist = async (req, res) => {
    try {
        const { userId } = req;
        const { status, period, page = 1, limit = 10 } = req.query; // Recibe filtros del cliente
        const query = { specialist: userId };

        // Filtrar por estado (opcional)
        if (status) {
            query.status = status;
        }

        // Filtrar por periodo
        const today = new Date();
        if (period === 'day') {
            query.date = {
                $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
            };
        } else if (period === 'week') {
            const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            query.date = { $gte: startOfWeek };
        } else if (period === 'month') {
            query.date = {
                $gte: new Date(today.getFullYear(), today.getMonth(), 1),
            };
        }

        // Paginación
        const skip = (page - 1) * limit;

        // Consultar citas
        const appointments = await Appointment.find(query)
            .populate({
                path: 'pet',
                select: 'name owner',
                populate: { path: 'owner', select: 'name' },
            })
            .skip(skip)
            .limit(limit);

        // Total de citas para paginación
        const total = await Appointment.countDocuments(query);

        res.status(200).json({ appointments, total, page, totalPages: Math.ceil(total / limit) });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas', error });
    }
};
