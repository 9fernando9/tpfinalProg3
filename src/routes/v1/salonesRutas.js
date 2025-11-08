import { Router } from 'express';
import { verificarToken,esEmpleadoOAdmin } from '../../middlewares/auth.js';
import SalonesControlador from '../../controllers/salonesControlador.js';
import {validarCreate, validarUpdate,validarId} from '../../middlewares/salones_validarCampos.js';


const salonesControlador = new SalonesControlador();
const router = Router();

/**
 * @openapi
 * /salones:
 *   get:
 *     tags:
 *       - Salones
 *     summary: Obtener todos los salones
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de salones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Salon'
 *       '401':
 *         description: No autorizado
 */
router.get('/',[verificarToken],salonesControlador.getAllSalones);
/**
 * @openapi
 * /salones/{salonId}:
 *   get:
 *     tags:
 *       - Salones
 *     summary: Obtener un salón por ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: salonId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del salón a consultar
 *     responses:
 *       '200':
 *         description: Salón encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Salon'
 *       '404':
 *         description: Salón no encontrado
 *       '401':
 *         description: No autorizado
 */
router.get("/:salonId",[verificarToken,esEmpleadoOAdmin,validarId], salonesControlador.findById);
/**
 * @openapi
 * /salones:
 *   post:
 *     tags:
 *       - Salones
 *     summary: Crear un nuevo salón
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalonCreate'
 *     responses:
 *       '201':
 *         description: Salón creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Salon'
 *       '400':
 *         description: Datos inválidos
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: No tiene permisos para crear salones
 */
router.post('/',[verificarToken,esEmpleadoOAdmin,validarCreate],salonesControlador.create);
/**
 * @openapi
 * /salones/{salonId}:
 *   put:
 *     tags:
 *       - Salones
 *     summary: Actualizar un salón existente
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: salonId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del salón a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalonUpdate'
 *     responses:
 *       '200':
 *         description: Salón actualizado
 *       '400':
 *         description: Datos inválidos
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: No tiene permisos para actualizar salones
 *       '404':
 *         description: Salón no encontrado
 */
router.put('/:salonId',[verificarToken,esEmpleadoOAdmin,validarId,validarUpdate],salonesControlador.update);
/**
 * @openapi
 * /salones/{salonId}:
 *   delete:
 *     tags:
 *       - Salones
 *     summary: Eliminar un salón
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: salonId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del salón a eliminar
 *     responses:
 *       '200':
 *         description: Salón eliminado
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: No tiene permisos para eliminar salones
 *       '404':
 *         description: Salón no encontrado
 */
router.delete('/:salonId',[verificarToken,esEmpleadoOAdmin,validarId],salonesControlador.delete);
/**
 * @openapi
 * components:
 *   schemas:
 *     Salon:
 *       type: object
 *       properties:
 *         salon_id:
 *           type: integer
 *         titulo:
 *           type: string
 *         direccion:
 *           type: string
 *         capacidad:
 *           type: integer
 *         importe:
 *           type: number
 *         activo:
 *           type: integer
 *     SalonCreate:
 *       type: object
 *       required:
 *         - titulo
 *         - direccion
 *         - capacidad
 *         - importe
 *       properties:
 *         titulo:
 *           type: string
 *         direccion:
 *           type: string
 *         capacidad:
 *           type: integer
 *         importe:
 *           type: number
 *     SalonUpdate:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *         direccion:
 *           type: string
 *         capacidad:
 *           type: integer
 *         importe:
 *           type: number
 */
export default router;