import { sendContactMail } from '../../services/sendMailService.js';

export const handleContactForm = async (req, res) => {
    try {
        const { fullName, email, phone, reason, message, preferredDate } = req.body;
        await sendContactMail({ fullName, email, phone, reason, message, preferredDate });
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        console.error('Error en el controlador de contacto:', error);
        res.status(500).json({ message: 'Error al enviar el correo de contacto' });
    }
};
