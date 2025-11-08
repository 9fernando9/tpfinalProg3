import express from "express";
import ComentariosControlador from "../../controllers/comentariosControlador.js";
import {validarCreate, validarId,validarIdComentario} from '../../middlewares/comentarios_validarCampos.js';
import { verificarTokenEncuesta,esEmpleadoOAdmin } from '../../middlewares/auth.js';

const comentariosControlador = new ComentariosControlador();
const router = express.Router();

/**
 * @openapi
 * /comentarios:
 *   get:
 *     tags:
 *       - Comentarios
 *     summary: Obtener todos los comentarios
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Acceso permitido solo para clientes
 */
router.get("/",[verificarTokenEncuesta, esEmpleadoOAdmin], comentariosControlador.getAllComentarios);

/**
 * @openapi
 * /comentarios/{reserva_id}:
 *   get:
 *     tags:
 *       - Comentarios
 *     summary: Obtener comentarios por ID de reserva
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reserva_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     responses:
 *       '200':
 *         description: Comentarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       '404':
 *         description: No se encontraron comentarios
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Acceso permitido solo para clientes
 */
router.get("/:reserva_id", [verificarTokenEncuesta, esEmpleadoOAdmin,validarId], comentariosControlador.getComentarioId);

/**
 * @openapi
 * /comentarios:
 *   post:
 *     tags:
 *       - Comentarios
 *     summary: Crear nuevo comentario
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComentarioCreate'
 *     responses:
 *       '201':
 *         description: Comentario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       '400':
 *         description: Datos inválidos
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Acceso permitido solo para clientes
 */
router.post("/", [verificarTokenEncuesta, esEmpleadoOAdmin,validarCreate], comentariosControlador.createComentario);

/**
 * @openapi
 * /comentarios/{comentario_id}:
 *   delete:
 *     tags:
 *       - Comentarios
 *     summary: Eliminar un comentario
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comentario_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario a eliminar
 *     responses:
 *       '200':
 *         description: Comentario eliminado exitosamente
 *       '404':
 *         description: Comentario no encontrado
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Acceso permitido solo para clientes
 */
router.delete("/:comentario_id", [verificarTokenEncuesta, esEmpleadoOAdmin,validarIdComentario], comentariosControlador.deleteComentario);

/**
 * @openapi
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       properties:
 *         comentario_id:
 *           type: integer
 *         reserva_id:
 *           type: integer
 *         usuario_id:
 *           type: integer
 *         texto:
 *           type: string
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *     ComentarioCreate:
 *       type: object
 *       required:
 *         - reserva_id
 *         - texto
 *       properties:
 *         reserva_id:
 *           type: integer
 *           description: ID de la reserva asociada
 *         texto:
 *           type: string
 *           description: Contenido del comentario
 */

export default router;