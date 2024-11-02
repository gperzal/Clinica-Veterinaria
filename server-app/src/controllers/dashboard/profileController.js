import User from '../../models/User.js';
import Pet from '../../models/Pet.js';
import bcrypt from 'bcryptjs';

// Obtener perfil de usuario
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                altPhone: user.altPhone,
                birthdate: user.birthdate,
                address: user.address,
                role: user.role,
            }
        });
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
    }
};

// Actualizar perfil de usuario
export const updateProfile = async (req, res) => {
    const { name, email, phone, altPhone, birthdate, address } = req.body;

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar los campos permitidos
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.altPhone = altPhone || user.altPhone;
        user.birthdate = birthdate || user.birthdate;
        user.address = address || user.address;

        await user.save();

        res.json({
            message: 'Perfil actualizado correctamente',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                altPhone: user.altPhone,
                birthdate: user.birthdate,
                address: user.address,
            }
        });
    } catch (error) {
        console.error('Error al actualizar el perfil del usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el perfil del usuario' });
    }
};

// Añadir una mascota
export const addPet = async (req, res) => {
    const { name, age, breed, color, sex, chipNumber, healthStatus, status, image } = req.body;

    try {
        const newPet = new Pet({
            name,
            age,
            breed,
            color,
            sex,
            chipNumber,
            healthStatus,
            status,
            image,
            owner: req.userId  // Relacionar la mascota con el usuario autenticado
        });

        await newPet.save();

        res.status(201).json({ message: 'Mascota registrada correctamente', pet: newPet });
    } catch (error) {
        console.error('Error al registrar la mascota:', error);
        res.status(500).json({ message: 'Error al registrar la mascota' });
    }
};

// Obtener todas las mascotas
export const getPets = async (req, res) => {
    try {
        // Buscar todas las mascotas del usuario autenticado (dueño)
        const pets = await Pet.find({ owner: req.userId });

        if (!pets || pets.length === 0) {
            return res.status(404).json({ message: 'No se encontraron mascotas para este usuario' });
        }

        res.json({ pets });
    } catch (error) {
        console.error('Error al obtener las mascotas del usuario:', error);
        res.status(500).json({ message: 'Error al obtener las mascotas del usuario' });
    }
};

// Actualizar una mascota
export const updatePet = async (req, res) => {
    const { petId } = req.params;
    const { name, age, breed, color, sex, chipNumber, healthStatus, status, image } = req.body;

    try {
        const pet = await Pet.findOne({ _id: petId, owner: req.userId });  // Verificar que la mascota pertenece al usuario

        if (!pet) {
            return res.status(404).json({ message: 'Mascota no encontrada o no pertenece al usuario' });
        }

        // Actualizar los campos permitidos
        pet.name = name || pet.name;
        pet.age = age || pet.age;
        pet.breed = breed || pet.breed;
        pet.color = color || pet.color;
        pet.sex = sex || pet.sex;
        pet.chipNumber = chipNumber || pet.chipNumber;
        pet.healthStatus = healthStatus || pet.healthStatus;
        pet.status = status || pet.status;
        pet.image = image || pet.image;

        await pet.save();

        res.json({ message: 'Mascota actualizada correctamente', pet });
    } catch (error) {
        console.error('Error al actualizar la mascota:', error);
        res.status(500).json({ message: 'Error al actualizar la mascota' });
    }
};

// Eliminar una mascota
export const deletePet = async (req, res) => {
    const { petId } = req.params;

    try {
        const pet = await Pet.findOneAndDelete({ _id: petId, owner: req.userId });  // Verificar que la mascota pertenece al usuario

        if (!pet) {
            return res.status(404).json({ message: 'Mascota no encontrada o no pertenece al usuario' });
        }

        res.json({ message: 'Mascota eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la mascota:', error);
        res.status(500).json({ message: 'Error al eliminar la mascota' });
    }
};


// Cambiar de contraseña
export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar que la contraseña actual sea correcta
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña actual incorrecta' });
        }

        // Verificar que la nueva contraseña no sea igual a la actual
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({ message: 'La nueva contraseña no puede ser igual a la actual' });
        }

        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Actualizar la contraseña directamente en la base de datos usando findByIdAndUpdate
        await User.findByIdAndUpdate(req.userId, { password: hashedPassword });

        res.json({ message: 'Contraseña cambiada con éxito' });
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ message: 'Error al cambiar la contraseña' });
    }
};


// Obtener dueño por ID
export const getOwnerById = async (req, res) => {
    const { ownerId } = req.params;
    try {
        const owner = await User.findById(ownerId).select('name email phone altPhone address');
        if (!owner) {
            return res.status(404).json({ message: 'Dueño no encontrado' });
        }
        res.json({ owner });
    } catch (error) {
        console.error('Error al obtener el dueño:', error);
        res.status(500).json({ message: 'Error al obtener el dueño' });
    }
};

// Obtener mascota por ID
export const getPetById = async (req, res) => {
    const { petId } = req.params;
    try {
        const pet = await Pet.findById(petId).populate('owner', 'name email phone');
        if (!pet) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.json({ pet });
    } catch (error) {
        console.error('Error al obtener la mascota:', error);
        res.status(500).json({ message: 'Error al obtener la mascota' });
    }
};

// Obtener todos los veterinarios y estilistas
export const getSpecialists = async (req, res) => {
    try {
        const specialists = await User.find({ role: { $in: ['Veterinario', 'Estilista'] } });
        res.status(200).json(specialists);
    } catch (error) {
        console.error('Error fetching specialists:', error);
        res.status(500).json({ message: 'Error al obtener especialistas' });
    }
};