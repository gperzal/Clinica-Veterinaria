

export const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una mayúscula');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una minúscula');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('La contraseña debe contener al menos un número');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('La contraseña debe contener al menos un carácter especial');
    }

    return errors;
};

export const validateName = (name) => {
    const errors = [];

    if (name.length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres');
    }
    if (name.length > 50) {
        errors.push('El nombre no puede exceder los 50 caracteres');
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
        errors.push('El nombre solo puede contener letras y espacios');
    }

    return errors;
};

export const validateEmail = (email) => {
    const errors = [];

    if (!email) {
        errors.push('El email es requerido');
    }
    if (email.length > 50) {
        errors.push('El email no puede exceder los 50 caracteres');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Email inválido');
    }

    return errors;
};
