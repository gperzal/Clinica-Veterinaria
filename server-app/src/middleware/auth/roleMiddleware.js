// Middleware para verificar roles
const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        // Verifica si el rol del usuario está incluido en los roles permitidos
        if (!requiredRoles.includes(req.userRole)) {
            return res.status(403).json({ message: 'Acceso denegado. Tu Rol no tiene permisos para realizar esta acción.' });
        }
        next(); // Si el rol es válido, pasa al siguiente middleware o controlador
    };
};

export default roleMiddleware;
