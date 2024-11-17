// Middleware para verificar roles
const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        const userRole = req.userRole;

        if (!userRole) {
            return res.status(403).json({ message: 'Acceso denegado. No se pudo determinar el rol del usuario.' });
        }

        if (!requiredRoles.includes(userRole)) {
            return res.status(403).json({ message: `Acceso denegado. Se requiere uno de los siguientes roles: ${requiredRoles.join(', ')}.` });
        }

        next();
    };
};

export default roleMiddleware;
