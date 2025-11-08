import express from "express";
import EncuestasControlador from "../../controllers/encuestasControlador.js";
import {validarCreate, validarId} from '../../middlewares/encuestas_validarCampos.js';
import { verificarTokenEncuesta,esCliente } from '../../middlewares/auth.js';

const encuestasControlador = new EncuestasControlador();
const router = express.Router();


/**
 * @openapi
 * /encuestas:
 *   get:
 *     tags:
 *       - Encuestas
 *     summary: Obtener todas las encuestas
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de encuestas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Encuesta'
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Acceso permitido solo para clientes
 */
router.get("/",[verificarTokenEncuesta, esCliente], encuestasControlador.getAllEncuestas);

/**
 * @openapi
 * /encuestas/{reserva_id}:
 *   get:
 *     tags:
 *       - Encuestas
 *     summary: Obtener encuesta por ID de reserva
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reserva_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva asociada
 *     responses:
 *       '200':
 *         description: Encuesta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Encuesta'
 *       '404':
 *         description: Encuesta no encontrada
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Acceso permitido solo para clientes
 */
router.get("/:reserva_id", [verificarTokenEncuesta, esCliente,validarId], encuestasControlador.getEncuestaId);

/**
 * @openapi
 * /encuestas:
 *   post:
 *     tags:
 *       - Encuestas
 *     summary: Crear nueva encuesta
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EncuestaCreate'
 *     responses:
 *       '201':
 *         description: Encuesta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Encuesta'
 *       '400':
 *         description: Datos inválidos
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Acceso permitido solo para administradores
 */
router.post("/", [verificarTokenEncuesta, esCliente,validarCreate], encuestasControlador.createEncuesta);

/**
 * @openapi
 * components:
 *   schemas:
 *     Encuesta:
 *       type: object
 *       properties:
 *         encuesta_id:
 *           type: integer
 *         reserva_id:
 *           type: integer
 *         puntuacion:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         comentario:
 *           type: string
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *     EncuestaCreate:
 *       type: object
 *       required:
 *         - reserva_id
 *         - puntuacion
 *       properties:
 *         reserva_id:
 *           type: integer
 *           description: ID de la reserva asociada
 *         puntuacion:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Puntuación de 1 a 5 estrellas
 *         comentario:
 *           type: string
 *           description: Comentario opcional del cliente
 */

export default router;