import { sendMailFeedback } from '../../services/sendMailService.js';

export const handleFeedback = async (req, res) => {
    try {
        const { email, type, description, deviceInfo, mediaUrls } = req.body;

        await sendMailFeedback('clinica.veterinaria.pets2024@gmail.com', {
            email,
            type,
            description,
            deviceInfo,
            mediaUrls,
        });

        res.status(200).json({ message: 'Feedback enviado exitosamente.' });
    } catch (error) {
        console.error('Error al manejar el feedback:', error);
        res.status(500).json({ message: 'Error al enviar el feedback.' });
    }
};
