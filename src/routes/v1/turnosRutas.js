import { Router } from 'express';
import { verificarToken,esEmpleadoOAdmin } from '../../middlewares/auth.js';
import TurnosControlador from '../../controllers/turnosControlador.js';
import {validarCreate, validarUpdate,validarId} from '../../middlewares/turnos_validarCampos.js';


const router = Router();
const turnosControlador = new TurnosControlador();

/**
 * @openapi
 * /turnos:
 *   get:
 *     tags:
 *       - Turnos
 *     summary: Obtener todos los turnos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de turnos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turno'
 *       '401':
 *         description: No autorizado
 */
router.get('/',[verificarToken],turnosControlador.getAllTurnos);
/**
 * @openapi
 * /turnos/{turnoId}:
 *   get:
 *     tags:
 *       - Turnos
 *     summary: Obtener un turno por ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: turnoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     responses:
 *       '200':
 *         description: Turno encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turno'
 *       '404':
 *         description: Turno no encontrado
 *       '401':
 *         description: No autorizado
 */
router.get("/:turnoId",[verificarToken,esEmpleadoOAdmin,validarId], turnosControlador.findById);
/**
 * @openapi
 * /turnos:
 *   post:
 *     tags:
 *       - Turnos
 *     summary: Crear un nuevo turno
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TurnoCreate'
 *     responses:
 *       '201':
 *         description: Turno creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turno'
 *       '400':
 *         description: Datos inválidos
 *       '401':
 *         description: No autorizado
 */
router.post('/',[verificarToken,esEmpleadoOAdmin,validarCreate],turnosControlador.create);
/**
 * @openapi
 * /turnos/{turnoId}:
 *   put:
 *     tags:
 *       - Turnos
 *     summary: Actualizar un turno existente
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: turnoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TurnoUpdate'
 *     responses:
 *       '200':
 *         description: Turno actualizado
 *       '400':
 *         description: Datos inválidos
 *       '404':
 *         description: Turno no encontrado
 *       '401':
 *         description: No autorizado
 */
router.put('/:turnoId',[verificarToken,esEmpleadoOAdmin,validarId,validarUpdate],turnosControlador.update);
/**
 * @openapi
 * /turnos/{turnoId}:
 *   delete:
 *     tags:
 *       - Turnos
 *     summary: Eliminar un turno
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: turnoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno a eliminar
 *     responses:
 *       '200':
 *         description: Turno eliminado
 *       '404':
 *         description: Turno no encontrado
 *       '401':
 *         description: No autorizado
 */
router.delete('/:turnoId',[verificarToken,esEmpleadoOAdmin,validarId],turnosControlador.delete);

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Turno:
 *       type: object
 *       properties:
 *         turno_id:
 *           type: integer
 *         orden:
 *           type: integer
 *         hora_desde:
 *           type: string
 *           example: "09:00:00"
 *         hora_hasta:
 *           type: string
 *           example: "10:00:00"
 *         activo:
 *           type: integer
 *     TurnoCreate:
 *       type: object
 *       required:
 *         - orden
 *         - hora_desde
 *         - hora_hasta
 *       properties:
 *         orden:
 *           type: integer
 *         hora_desde:
 *           type: string
 *           example: "09:00:00"
 *         hora_hasta:
 *           type: string
 *           example: "10:00:00"
 *     TurnoUpdate:
 *       type: object
 *       properties:
 *         orden:
 *           type: integer
 *         hora_desde:
 *           type: string
 *         hora_hasta:
 *           type: string
 */

export default router;