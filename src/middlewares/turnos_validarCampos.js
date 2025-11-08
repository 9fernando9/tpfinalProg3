import { check, param } from 'express-validator';
import { validarCampos } from './validarCampos.js';


const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/; // acepta HH:mm o HH:mm:ss

const toMinutes = (hhmm) => {
    const parts = String(hhmm).split(':').map(p => Number(p));
    if (parts.length < 2 || parts.some(isNaN)) return NaN;
    return parts[0] * 60 + parts[1];
};

const atLeastTwoHoursAfter = (value, { req }) => {
    const desde = req.body.hora_desde;
    if (!desde) return true; // si no viene hora_desde no validamos aquí
    if (!timeRegex.test(desde)) throw new Error('hora_desde inválida (esperado HH:mm o HH:mm:ss)');
    if (!timeRegex.test(value)) throw new Error('hora_hasta inválida (esperado HH:mm o HH:mm:ss)');
    const diff = toMinutes(value) - toMinutes(desde);
    if (diff < 120) throw new Error('hora_hasta debe ser al menos 2 horas mayor que hora_desde');
    return true;
};

export const validarCreate = [
    check('orden')
        .exists().withMessage('orden es obligatorio en la ruta')
        .bail()
        .isInt({ min: 1 }).withMessage('orden debe ser un entero positivo')
        .toInt(),
    check('hora_desde')
        .exists().withMessage('La hora desde es obligatoria')
        .bail()
        .matches(timeRegex).withMessage('La hora desde debe tener formato HH:mm:ss'),

    check('hora_hasta')
        .exists().withMessage('La hora hasta es obligatoria')
        .bail()
        .matches(timeRegex).withMessage('La hora hasta debe tener formato HH:mm:ss')
        .bail()
        .custom(atLeastTwoHoursAfter),
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
    param('turnoId')
        .exists().withMessage('turnoId es obligatorio en la ruta')
        .bail()
        .isInt({ min: 1 }).withMessage('turnoId debe ser un entero positivo')
        .toInt(),
    requireAtLeastOne(['orden','hora_desde','hora_hasta']),
    check('orden').optional({checkFalsy: true})
        .isInt({ min: 1 }).withMessage('orden debe ser un entero positivo')
        .toInt(),
    check('hora_desde')
        .optional({ checkFalsy: true })
        .bail()
        .matches(timeRegex).withMessage('La hora desde debe tener formato HH:mm:ss'),

    check('hora_hasta')
        .optional({ checkFalsy: true })
        .bail()
        .matches(timeRegex).withMessage('La hora hasta debe tener formato HH:mm:ss')
        .bail()
        .custom(atLeastTwoHoursAfter),
    (req, res, next) => validarCampos(req, res, next)
];

export const validarId = [
    param('turnoId')
        .exists().withMessage('turnoId es obligatorio en la ruta')
        .bail()
        .isInt({ min: 1 }).withMessage('turnoId debe ser un entero positivo')
        .toInt(),
    (req, res, next) => validarCampos(req, res, next)
];