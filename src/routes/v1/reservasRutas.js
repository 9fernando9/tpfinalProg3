import { Router } from 'express';
import { verificarTokenReserva,verificarToken,esClienteOAdmin,esAdmin } from '../../middlewares/auth.js';
import ReservasControlador from '../../controllers/reservasControlador.js';
import {validarCreate, validarUpdate, validarId} from '../../middlewares/reservas_validarCampos.js';


const reservasControlador = new ReservasControlador();
const router = Router();

/**
 * @openapi
 * /reservas:
 *   get:
 *     tags:
 *       - Reservas
 *     summary: Obtener todas las reservas
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserva'
 *       '401':
 *         description: No autorizado
 */
router.get('/',[verificarTokenReserva],reservasControlador.getAllReservas);
/**
 * @openapi
 * /reservas:
 *   post:
 *     tags:
 *       - Reservas
 *     summary: Crear una nueva reserva
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservaCreate'
 *     responses:
 *       '201':
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       '400':
 *         description: Datos inválidos
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: No tiene permisos para crear reservas
 */
router.post('/',[verificarTokenReserva,esClienteOAdmin,validarCreate],reservasControlador.create);
/**
 * @openapi
 * /reservas/{reservaId}:
 *   put:
 *     tags:
 *       - Reservas
 *     summary: Actualizar una reserva existente
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reservaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservaUpdate'
 *     responses:
 *       '200':
 *         description: Reserva actualizada
 *       '400':
 *         description: Datos inválidos
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: No tiene permisos para actualizar reservas
 *       '404':
 *         description: Reserva no encontrada
 */
router.put('/:reservaId',[verificarToken,esAdmin,validarId,validarUpdate],reservasControlador.update);
/**
 * @openapi
 * /reservas/{reservaId}:
 *   delete:
 *     tags:
 *       - Reservas
 *     summary: Eliminar una reserva
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reservaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva a eliminar
 *     responses:
 *       '200':
 *         description: Reserva eliminada
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: No tiene permisos para eliminar reservas
 *       '404':
 *         description: Reserva no encontrada
 */
router.delete('/:reservaId',[verificarToken,esAdmin,validarId],reservasControlador.delete);

/**
 * @openapi
 * components:
 *   schemas:
 *     Reserva:
 *       type: object
 *       properties:
 *         reserva_id:
 *           type: integer
 *         fecha_reserva:
 *           type: string
 *           format: date
 *         salon_id:
 *           type: integer
 *         usuario_id:
 *           type: integer
 *         turno_id:
 *           type: integer
 *         foto_cumpleaniero:
 *           type: string
 *         tematica:
 *           type: string
 *         importe_salon:
 *           type: number
 *         importe_total:
 *           type: number
 *         activo:
 *           type: integer
 *     ReservaCreate:
 *       type: object
 *       required:
 *         - fecha_reserva
 *         - salon_id
 *         - turno_id
 *         - tematica
 *       properties:
 *         fecha_reserva:
 *           type: string
 *           format: date
 *         salon_id:
 *           type: integer
 *         turno_id:
 *           type: integer
 *         foto_cumpleaniero:
 *           type: string
 *         tematica:
 *           type: string
 *         lista_servicios:
 *           type: array
 *           items:
 *             type: integer
 *     ReservaUpdate:
 *       type: object
 *       properties:
 *         fecha_reserva:
 *           type: string
 *           format: date
 *         salon_id:
 *           type: integer
 *         turno_id:
 *           type: integer
 *         foto_cumpleaniero:
 *           type: string
 *         tematica:
 *           type: string
 *         lista_servicios:
 *           type: array
 *           items:
 *             type: integer
 */

export default router;