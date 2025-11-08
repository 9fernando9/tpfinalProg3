import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ message: "No se proporcionó token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

export const verificarTokenReserva = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "No se proporcionó token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Agregamos el tipo de usuario específicamente
        req.tipoUsuario = decoded.rol;
        req.idUsuario = decoded.id;
        next();
    } catch (err) {
        console.error('Error al verificar token:', err);
        return res.status(401).json({ message: "Token inválido" });
    }
};

export const verificarTokenEncuesta = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "No se proporcionó token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Agregamos el tipo de usuario específicamente
        req.tipoUsuario = decoded.rol;
        req.idUsuario = decoded.id;
        next();
    } catch (err) {
        console.error('Error al verificar token:', err);
        return res.status(401).json({ message: "Token inválido" });
    }
};


export const esAdmin = (req, res, next) => {
    if (req.rol !== "admin") {
        return res.status(403).json({ message: "Requiere rol de administrador" });
    }
    next();
};

export const esEmpleadoOAdmin = (req, res, next) => {
    if (req.tipoUsuario !== "empleado" && req.tipoUsuario !== "admin") {
        return res.status(403).json({ message: "Requiere rol de empleado o admin" });
    }
    next();
};

export const esClienteOAdmin = (req, res, next) => {
    if (req.tipoUsuario !== "cliente" && req.tipoUsuario !== "admin") {
        return res.status(403).json({ message: "Requiere rol de cliente o admin" });
    }
    next();
};

export const esCliente = (req, res, next) => {
    if (req.tipoUsuario !== "cliente") {
        return res.status(403).json({ message: "Requiere rol de cliente" });
    }
    next();
};