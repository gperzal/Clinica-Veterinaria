

import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendMailForgotPassword } from '../../services/sendMailService.js';


// Función para generar un token JWT
const generateToken = (user) => {
    const payload = {
        user: {
            id: user.id,
            role: user.role,  // Incluir el rol en el payload
        },
    };

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token válido por 1 hora
    );
};

// Registro de usuario
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        user = new User({
            name,
            email,
            password,
            role: 'Cliente'  // El rol por defecto es "Cliente"
        });

        await user.save();

        // Generar el token JWT
        const token = generateToken(user);

        // Enviar la respuesta con el token y un mensaje de éxito
        res.status(201).json({ token, message: 'Registro exitoso', name: user.name, role: user.role });
    } catch (error) {
        console.error('Error en el registro del usuario:', error);
        res.status(500).send('Error del servidor');
    }
};

// Inicio de sesión de usuario
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Generar el token JWT
        const token = generateToken(user);

        // Enviar la respuesta con el token, nombre, rol del usuario, y el ID
        res.json({ token, name: user.name, role: user.role, _id: user._id });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send('Error del servidor');
    }
};

// Olvidar de contraseña
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;


        await sendMailForgotPassword(email, user.name, resetLink);

        res.status(200).json({ message: 'Correo de restablecimiento enviado' });
    } catch (error) {
        console.error('Error en el proceso de restablecimiento de contraseña:', error);
        res.status(500).json({ message: 'Error en el proceso de restablecimiento de contraseña' });
    }
};
