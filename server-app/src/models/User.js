// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String, enum: ['Cliente', 'Administrativo', 'Veterinario', 'Estilista', 'Administrador'], default: 'Cliente' },
    phone: { type: String },
            altPhone: { type: String },
            birthdate: { type: Date },
            address: { type: String },
            resetPasswordToken: { type: String },
            resetPasswordExpires: { type: Date },
}, {
    timestamps: true,
});

// Método para encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
