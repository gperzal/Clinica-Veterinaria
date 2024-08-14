

import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };


        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token, message: 'Registration successful!' });
            }
        );;
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, name: user.name });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};


export const forgotPassword  = async (req, res) => {
    const { email } = req.body;

    try {
        // Buscar al usuario por correo electrónico
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Crear un token de restablecimiento de contraseña
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

        await user.save();

        // Devolver el token y el nombre de usuario
        res.status(200).json({ resetToken, userName: user.name });
    } catch (error) {
        console.error('Error en el proceso de restablecimiento de contraseña:', error);
        res.status(500).json({ message: 'Error en el proceso de restablecimiento de contraseña' });
    }
};

export const resetPassword = async (req, res) => {
    const { email, password, resetToken } = req.body;

    try {
        // Buscar al usuario por correo electrónico y verificar el token
        const user = await User.findOne({
            email,
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: Date.now() }, // Asegurarse de que el token no haya expirado
        });

        if (!user) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }

        // Actualizar la contraseña
        user.password = await bcrypt.hash(password, 12);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.error('Error restableciendo la contraseña:', error);
        res.status(500).json({ message: 'Error restableciendo la contraseña' });
    }
};