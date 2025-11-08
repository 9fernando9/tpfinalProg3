import { Router } from 'express';
import { verificarToken,esEmpleadoOAdmin } from '../../middlewares/auth.js';
import ServiciosControlador from '../../controllers/serviciosControlador.js';
import {validarCreate, validarUpdate,validarId} from '../../middlewares/servicios_validarCampos.js';

const router = Router();
const serviciosControlador = new ServiciosControlador();

/**
 * @openapi
 * /servicios:
 *   get:
 *     tags:
 *       - Servicios
 *     summary: Obtener todos los servicios
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de servicios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Servicio'
 *       '401':
 *         description: No autorizado
 */
router.get('/',[verificarToken],serviciosControlador.getAllServicios);
/**
 * @openapi
 * /servicios/{servicioId}:
 *   get:
 *     tags:
 *       - Servicios
 *     summary: Obtener un servicio por ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: servicioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio a consultar
 *     responses:
 *       '200':
 *         description: Servicio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       '404':
 *         description: Servicio no encontrado
 *       '401':
 *         description: No autorizado
 */
router.get("/:servicioId",[verificarToken,esEmpleadoOAdmin,validarId], serviciosControlador.findById);
/**
 * @openapi
 * /servicios:
 *   post:
 *     tags:
 *       - Servicios
 *     summary: Crear un nuevo servicio
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServicioCreate'
 *     responses:
 *       '201':
 *         description: Servicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       '400':
 *         description: Datos inválidos
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: No tiene permisos para crear servicios
 */
router.post('/',[verificarToken,esEmpleadoOAdmin,validarCreate],serviciosControlador.create);
/**
 * @openapi
 * /servicios/{servicioId}:
 *   put:
 *     tags:
 *       - Servicios
 *     summary: Actualizar un servicio existente
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: servicioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServicioUpdate'
 *     responses:
 *       '200':
 *         description: Servicio actualizado
 *       '400':
 *         description: Datos inválidos
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: No tiene permisos para actualizar servicios
 *       '404':
 *         description: Servicio no encontrado
 */
router.put('/:servicioId',[verificarToken,esEmpleadoOAdmin,validarId,validarUpdate],serviciosControlador.update);
/**
 * @openapi
 * /servicios/{servicioId}:
 *   delete:
 *     tags:
 *       - Servicios
 *     summary: Eliminar un servicio
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: servicioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio a eliminar
 *     responses:
 *       '200':
 *         description: Servicio eliminado
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: No tiene permisos para eliminar servicios
 *       '404':
 *         description: Servicio no encontrado
 */
router.delete('/:servicioId',[verificarToken,esEmpleadoOAdmin,validarId],serviciosControlador.delete);

/**
 * @openapi
 * components:
 *   schemas:
 *     Servicio:
 *       type: object
 *       properties:
 *         servicio_id:
 *           type: integer
 *         descripcion:
 *           type: string
 *         importe:
 *           type: number
 *         activo:
 *           type: integer
 *     ServicioCreate:
 *       type: object
 *       required:
 *         - descripcion
 *         - importe
 *       properties:
 *         descripcion:
 *           type: string
 *         importe:
 *           type: number
 *     ServicioUpdate:
 *       type: object
 *       properties:
 *         descripcion:
 *           type: string
 *         importe:
 *           type: number
 */

export default router;