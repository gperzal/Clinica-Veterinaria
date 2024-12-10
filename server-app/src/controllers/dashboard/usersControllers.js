// src/controllers/dashboard/usersControllers.js
import User from '../../models/User.js';
import Pet from '../../models/Pet.js';
import Appointment from '../../models/Appointment.js';
import Order from '../../models/Order.js';
import bcrypt from 'bcryptjs';
import csv from 'csv-parser';
import xlsx from 'xlsx';
import fs from 'fs';
import { Readable } from 'stream';

// Obtener todos los usuarios, con filtros opcionales por nombre, rol y estado
export const getUsers = async (req, res) => {
    try {
        const { name, role, status } = req.query;

        const query = {};
        if (name) query.name = { $regex: name, $options: 'i' };
        if (role) query.role = role;
        if (status) query.status = status;

        const users = await User.find(query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role, phone, altPhone, birthdate, address } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        const user = new User({ name, email, password, role, phone, altPhone, birthdate, address });
        await user.save();

        res.status(201).json({ message: 'Usuario creado exitosamente', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

//  obtener un resumen del usuario
export const getUserSummary = async (req, res) => {
    try {
        const { userId } = req.params;

        // Obtener información básica del usuario
        const user = await User.findById(userId).select('name email role phone address');

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Obtener las mascotas del usuario
        const pets = await Pet.find({ owner: userId }).select('name');

        // Obtener las citas médicas del usuario
        const appointments = await Appointment.find({ owner: userId })
            .populate('specialist', 'name')
            .populate('pet', 'name')
            .select('date time serviceType status');

        // Obtener las órdenes del usuario
        const orders = await Order.find({ user: userId }).select('orderNumber createdAt status');

        // Resumen final
        const summary = {
            user,
            pets,
            appointments: appointments.map((appt) => ({
                date: appt.date,
                time: appt.time,
                serviceType: appt.serviceType,
                status: appt.status,
                specialist: appt.specialist?.name || 'No especificado',
                pet: appt.pet?.name || 'No especificado',
            })),
            orders: orders.map((order) => ({
                orderNumber: order.orderNumber,
                date: order.createdAt,
                status: order.status,
            })),
        };

        return res.json(summary);
    } catch (error) {
        console.error('Error al obtener resumen del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



// Actualizar un usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, email, password, role, phone, altPhone, birthdate, address } = req.body;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        user.role = role || user.role;
        user.phone = phone || user.phone;
        user.altPhone = altPhone || user.altPhone;
        user.birthdate = birthdate || user.birthdate;
        user.address = address || user.address;

        await user.save();

        res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};

// Carga masiva de usuarios desde CSV o XLSX
export const bulkUploadUsers = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Por favor, sube un archivo' });
        }
        console.log('Archivo recibido:', req.file.originalname);

        const fileBuffer = req.file.buffer; // Leer archivo directamente en memoria
        const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

        let users = [];

        if (fileExtension === 'csv') {
            // Procesar archivo CSV
            const csvRows = [];
            const readableStream = new Readable();
            readableStream.push(fileBuffer);
            readableStream.push(null); // Fin del stream

            readableStream
                .pipe(csv())
                .on('data', (row) => {
                    csvRows.push(row); // Agregar fila al arreglo
                })
                .on('end', async () => {
                    users = csvRows; // Asignar filas al arreglo users
                    const results = await processUsers(users); // *** Aquí llamamos a processUsers ***
                    res.status(200).json(results); // Retornar resultados
                });
        } else if (fileExtension === 'xlsx') {
            // Procesar archivo XLSX
            const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            users = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            const results = await processUsers(users); // *** Aquí también llamamos a processUsers ***
            res.status(200).json(results); // Retornar resultados
        } else {
            return res.status(400).json({ message: 'Formato de archivo no soportado' });
        }
    } catch (error) {
        console.error('Error en bulkUploadUsers:', error);
        res.status(500).json({ message: 'Error en la carga masiva de usuarios', error });
    }
};

// Procesar usuarios cargados
const processUsers = async (users) => {
    const results = { created: 0, failed: 0, errors: [] };

    for (const userData of users) {
        try {
            const { name, email, password, role, phone, altPhone, birthdate, address } = userData;

            if (!name || !email || !password) {
                throw new Error('Faltan campos obligatorios');
            }

            const userExists = await User.findOne({ email });
            if (userExists) {
                results.failed += 1;
                results.errors.push({ email, message: 'Correo ya registrado' });
                continue;
            }

            const user = new User({ name, email, password, role, phone, altPhone, birthdate, address });
            await user.save();
            results.created += 1;
        } catch (error) {
            results.failed += 1;
            results.errors.push({ email: userData.email, message: error.message });
        }
    }

    return results;
};
