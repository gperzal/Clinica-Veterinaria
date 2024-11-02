import User from '../../models/User.js';

export const getSpecialists = async (req, res) => {
    try {
        const specialists = await User.find({ role: { $in: ['Veterinario', 'Estilista'] } });
        res.status(200).json(specialists);
    } catch (error) {
        console.error('Error fetching specialists:', error);
        res.status(500).json({ message: 'Error al obtener especialistas' });
    }
};
