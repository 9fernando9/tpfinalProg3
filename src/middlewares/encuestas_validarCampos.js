import { check, param } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarCreate = [
    check('reserva_id','El ID de la reserva es obligatorio').not().isEmpty().isInt({ min: 1 }).withMessage('El ID de la reserva debe ser un entero positivo'),
    check('puntuacion','La puntuación es obligatoria').not().isEmpty().isInt({ min: 1, max: 5 }).withMessage('La puntuación debe ser un entero entre 1 y 5'),
    check('comentario','El comentario es obligatorio').not().isEmpty().isString().withMessage('El comentario debe ser un texto'),
    (req, res, next) => validarCampos(req, res, next)
];


export const validarId = [
    param('reserva_id')
        .exists().withMessage('reserva_id es obligatorio en la ruta')
        .bail()
        .isInt({ min: 1 }).withMessage('reserva_id debe ser un entero positivo')
        .toInt(),
    (req, res, next) => validarCampos(req, res, next)
];