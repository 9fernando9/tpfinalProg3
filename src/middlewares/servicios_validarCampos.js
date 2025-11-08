import { check,param } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarCreate = [
    check('descripcion','La descripción es obligatoria').not().isEmpty(),
    check('importe')
        .exists().withMessage('El importe es obligatorio')
        .bail()
        .isFloat({ gt: 0 }).withMessage('El importe debe ser un número mayor que 0')
        .toFloat(),
    (req, res, next) => validarCampos(req, res, next)
];

// Middleware que exige al menos un campo para el update
const requireAtLeastOne = (allowedFields = []) => (req, res, next) => {
    const body = req.body || {};
    const hasAny = allowedFields.some(f => Object.prototype.hasOwnProperty.call(body, f));
    if (!hasAny) {
        return res.status(400).json({
            ok: false,
            errors: [{ msg: `Debe enviar al menos uno de los campos: ${allowedFields.join(', ')}` }]
        });
    }
    next();
};

export const validarUpdate = [
    param('servicioId')
            .exists().withMessage('servicioId es obligatorio en la ruta')
            .bail()
            .isInt({ min: 1 }).withMessage('servicioId debe ser un entero positivo')
            .toInt(),
    requireAtLeastOne(['descripcion','importe']),
    check('descripcion').optional({ checkFalsy: true }).not().isEmpty().withMessage('La descripción no puede estar vacía'),
    check('importe')
        .optional({ checkFalsy: true })
        .isFloat({ gt: 0 }).withMessage('El importe debe ser un número mayor que 0')
        .toFloat(),
    (req, res, next) => validarCampos(req, res, next)
];

export const validarId = [
    param('servicioId')
        .exists().withMessage('servicioId es obligatorio en la ruta')
        .bail()
        .isInt({ min: 1 }).withMessage('servicioId debe ser un entero positivo')
        .toInt(),
    (req, res, next) => validarCampos(req, res, next)
];