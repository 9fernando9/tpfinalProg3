export const rutaNoEncontrada = (req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: `Ruta no encontrada: ${req.originalUrl}`
    });
};