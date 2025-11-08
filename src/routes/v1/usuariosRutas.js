import { Router } from 'express';
import UsuariosControlador from '../../controllers/usuariosControlador.js';
import {validarCreate, validarUpdate,validarId} from '../../middlewares/usuarios_validarCampos.js';

const router = Router();
const usuariosControlador = new UsuariosControlador();

/**
 * @openapi
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener todos los usuarios
 *     responses:
 *       '200':
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       '401':
 *         description: No autorizado
 */
router.get('/',usuariosControlador.getAllUsuarios);
/**
 * @openapi
 * /usuarios/{usuarioId}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener usuario por ID
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       '404':
 *         description: Usuario no encontrado
 */
router.get("/:usuarioId",[validarId], usuariosControlador.findById);
/**
 * @openapi
 * /usuarios:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Crear un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCreate'
 *     responses:
 *       '201':
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       '400':
 *         description: Datos inválidos
 */
router.post('/',[validarCreate],usuariosControlador.create);
/**
 * @openapi
 * /usuarios/{usuarioId}:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar un usuario existente
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioUpdate'
 *     responses:
 *       '200':
 *         description: Usuario actualizado
 *       '400':
 *         description: Datos inválidos
 *       '404':
 *         description: Usuario no encontrado
 */
router.put('/:usuarioId',[validarUpdate],usuariosControlador.update);
/**
 * @openapi
 * /usuarios/{usuarioId}:
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar un usuario
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Usuario eliminado
 *       '404':
 *         description: Usuario no encontrado
 */
router.delete('/:usuarioId',[validarId],usuariosControlador.delete);

/**
 * @openapi
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         usuario_id:
 *           type: integer
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         email:
 *           type: string
 *         nombre_usuario:
 *           type: string
 *         tipo_usuario:
 *           type: integer
 *         activo:
 *           type: integer
 *     UsuarioCreate:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - email
 *         - nombre_usuario
 *         - password
 *       properties:
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         email:
 *           type: string
 *         nombre_usuario:
 *           type: string
 *         password:
 *           type: string
 *         tipo_usuario:
 *           type: integer
 *     UsuarioUpdate:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         email:
 *           type: string
 *         nombre_usuario:
 *           type: string
 *         password:
 *           type: string
 *         tipo_usuario:
 *           type: integer
 */

export default router;