import { check,param } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarCreate = [
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('capacidad','La capacidad es obligatoria').isInt({min:20}).withMessage('La capacidad debe ser un número entero mayor a 20').toInt(),
    check('importe')
        .exists().withMessage('El importe es obligatorio')
        .bail()
        .isFloat({ gt: 0 }).withMessage('El importe debe ser un número mayor que 0')
        .toFloat(),
    check('latitud')
        .optional({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 }).withMessage('Latitud inválida (debe estar entre -90 y 90)')
        .toFloat(),
    check('longitud')
        .optional({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 }).withMessage('Longitud inválida (debe estar entre -180 y 180)')
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
    param('salonId')
                .exists().withMessage('salonId es obligatorio en la ruta')
                .bail()
                .isInt({ min: 1 }).withMessage('salonId debe ser un entero positivo')
                .toInt(),
    requireAtLeastOne(['titulo','direccion','capacidad','importe','latitud','longitud']),
    check('titulo').optional({ checkFalsy: true }).not().isEmpty().withMessage('El titulo no puede estar vacío'),
    check('direccion').optional({ checkFalsy: true }).not().isEmpty().withMessage('La direccion no puede estar vacía'),
    check('capacidad').optional({ checkFalsy: true }).isInt({min:20}).withMessage('La capacidad debe ser un número entero').toInt(),
    check('importe')
        .optional({ checkFalsy: true })
        .isFloat({ gt: 0 }).withMessage('El importe debe ser un número mayor que 0')
        .toFloat(),
    check('latitud')
        .optional({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 }).withMessage('Latitud inválida (debe estar entre -90 y 90)')
        .toFloat(),
    check('longitud')
        .optional({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 }).withMessage('Longitud inválida (debe estar entre -180 y 180)')
        .toFloat(),
    (req, res, next) => validarCampos(req, res, next)
];

export const validarId = [
    param('salonId')
        .exists().withMessage('salonId es obligatorio en la ruta')
        .bail()
        .isInt({ min: 1 }).withMessage('salonId debe ser un entero positivo')
        .toInt(),
    (req, res, next) => validarCampos(req, res, next)
];