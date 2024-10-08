import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Asegúrate de que el token se envíe en el encabezado de autorización
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
    }

    try {
        // Verificar el token JWT
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);  // Extraer el token de "Bearer <token>"

        // Asignar el userId y role del token decodificado al objeto req
        req.userId = decoded.user.id;
        req.userRole = decoded.user.role;

        next();  // Continuar al siguiente middleware/controlador
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o ha expirado' });
    }
};

export default authMiddleware;
