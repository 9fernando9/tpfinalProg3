import { check } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarLogin = [
    check('usuario','Debe ingresar un usuario').not().isEmpty(),
    check('password','Debe ingresar una contraseña').not().isEmpty(),
    (req, res, next) => validarCampos(req, res, next)
];