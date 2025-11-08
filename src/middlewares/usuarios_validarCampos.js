import { check,param } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarCreate = [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('nombre_usuario','El nombre de usuario es obligatorio').not().isEmpty().isEmail().withMessage('El nombre de usuario debe ser un email válido'),
    check('contrasenia','La contraseña es obligatoria y debe tener al menos 6 caracteres').isLength({min:6}),
    check('tipo_usuario')
        .exists().withMessage('El tipo de usuario es obligatorio')
        .bail()
        .isInt().withMessage('El tipo de usuario debe ser numérico')
        .bail()
        .toInt()
        .custom(v => [1,2,3].includes(v)).withMessage('El tipo de usuario debe ser 1, 2 o 3'),
    check('celular').optional({ checkFalsy: true }).not().isEmpty().withMessage('El celular es obligatorio'),
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
    param('usuarioId')
        .exists().withMessage('usuarioId es obligatorio en la ruta')
        .bail()
        .isInt({ min: 1 }).withMessage('usuarioId debe ser un entero positivo')
        .toInt(),
    requireAtLeastOne(['nombre','apellido','nombre_usuario','contrasenia','tipo_usuario','celular','foto']),
    check('nombre').optional({ checkFalsy: true }).not().isEmpty().withMessage('El nombre no puede estar vacío'),
    check('apellido').optional({ checkFalsy: true }).not().isEmpty().withMessage('El apellido no puede estar vacío'),
    check('nombre_usuario').optional({ checkFalsy: true }).not().isEmpty().withMessage('El nombre de usuario no puede estar vacío').isEmail().withMessage('El nombre de usuario debe ser un email válido'),
    check('contrasenia').optional({ checkFalsy: true }).isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('tipo_usuario')
        .optional({ checkFalsy: true })
        .isInt().withMessage('El tipo de usuario debe ser numérico')
        .bail()
        .toInt()
        .custom(v => [1,2,3].includes(v)).withMessage('El tipo de usuario debe ser 1, 2 o 3'),
    check('celular').optional({ checkFalsy: true }).not().isEmpty().withMessage('El celular no puede estar vacío'),
    (req, res, next) => validarCampos(req, res, next)
];

export const validarId = [
    param('usuarioId')
        .exists().withMessage('usuarioId es obligatorio en la ruta')
        .bail()
        .isInt({ min: 1 }).withMessage('usuarioId debe ser un entero positivo')
        .toInt(),
    (req, res, next) => validarCampos(req, res, next)
];