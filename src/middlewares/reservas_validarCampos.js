import { check, param } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarCreate = [
    check('fecha_reserva','La fecha de reserva es obligatoria').not().isEmpty().isDate().withMessage('La fecha debe ser una fecha válida'),
    check('salon_id','El ID del salón es obligatorio').isInt({ min: 1 }).withMessage('El ID del salón debe ser un entero positivo'),    
    check('turno_id','El ID del turno es obligatorio').isInt({ min: 1 }).withMessage('El ID del turno debe ser un entero positivo'),
    check('tematica','La temática es obligatoria').not().isEmpty(),
    //el importe_salon se tomaran desde la base cuando se valide el salon_id
    //el importe_total se calculara en el backend sumando el importe_salon + los importes de los servicios
    // validar idservicios: debe ser array no vacío, elementos enteros positivos y sin duplicados
    check('idservicios')
        .exists().withMessage('Debe enviar idservicios')
        .bail()
        .isArray({ min: 1 }).withMessage('idservicios debe ser un array no vacío')
        .bail()
        .custom(ids => {
            if (!Array.isArray(ids)) throw new Error('idservicios debe ser un array');
            // comprobar que todos son enteros positivos
            const nums = ids.map(i => Number(i));
            if (nums.some(n => !Number.isInteger(n) || n < 1)) {
                throw new Error('Cada idservicio debe ser un entero positivo');
            }
            // comprobar duplicados
            const uniq = new Set(nums);
            if (uniq.size !== nums.length) {
                throw new Error('idservicios contiene ids duplicados');
            }
            return true;
        }),
        // validar cada elemento del array
    check('idservicios.*')
        .isInt({ min: 1 }).withMessage('Cada idservicio debe ser un entero positivo')
        .toInt(),
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
    param('reservaId')
            .exists().withMessage('reservaId es obligatorio en la ruta')
            .bail()
            .isInt({ min: 1 }).withMessage('reservaId debe ser un entero positivo')
            .toInt(),
    requireAtLeastOne(['fecha_reserva','salon_id','usuario_id','turno_id','foto_cumpleaniero','tematica','importe_salon','importe_total']),
    check('fecha_reserva').optional({ checkFalsy: true }).not().isEmpty().withMessage('La fecha de reserva no puede estar vacía').isDate().withMessage('La fecha debe ser una fecha válida'),
    check('salon_id').optional({ checkFalsy: true }).not().isEmpty().withMessage('El ID del salón no puede estar vacío'),
    check('turno_id').optional({ checkFalsy: true }).not().isEmpty().withMessage('El ID del turno no puede estar vacío'),
    check('tematica').optional({ checkFalsy: true }).not().isEmpty().withMessage('La temática no puede estar vacía'),
    check('importe')
        .optional({ checkFalsy: true })
        .isFloat({ gt: 0 }).withMessage('El importe debe ser un número mayor que 0')
        .toFloat(),
    check('importe_total')
        .optional({ checkFalsy: true })
        .isFloat({ gt: 0 }).withMessage('El importe total debe ser un número mayor que 0')
        .toFloat(),
    (req, res, next) => validarCampos(req, res, next)
];

export const validarId = [
    param('reservaId')
        .exists().withMessage('reservaId es obligatorio en la ruta')
        .bail()
        .isInt({ min: 1 }).withMessage('reservaId debe ser un entero positivo')
        .toInt(),
    (req, res, next) => validarCampos(req, res, next)
];