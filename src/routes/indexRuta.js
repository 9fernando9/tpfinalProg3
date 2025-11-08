import { Router } from 'express';

import { verificarToken, esAdmin } from '../middlewares/auth.js';
import salonesRoutes from './v1/salonesRutas.js';
import usuariosRoutes from './v1/usuariosRutas.js';
import turnosRoutes from './v1/turnosRutas.js';
import serviciosRoutes from './v1/serviciosRutas.js';
import authRoutes from './v1/authRutas.js';
import reservasRutas from './v1/reservasRutas.js';
import reportesRutas from './v1/reportesRutas.js';
import encuestasRutas from './v1/encuestasRutas.js';
import comentariosRutas from './v1/comentariosRutas.js';
import { rutaNoEncontrada } from '../middlewares/rutaNoEncontrada.js';
const router = Router();


/**
 * @openapi
 * tags:
 *   - name: Inicio
 *     description: Ruta principal
 *   - name: Autenticación
 *     description: Endpoints de login y autenticación
 *   - name: Usuarios
 *     description: Gestión de usuarios (solo admin)
 *   - name: Salones
 *     description: Gestión de salones
 *   - name: Turnos
 *     description: Gestión de turnos disponibles
 *   - name: Servicios
 *     description: Gestión de servicios adicionales
 *   - name: Reservas
 *     description: Gestión de reservas de salones
 *   - name: Reportes
 *     description: Generación de reportes (solo admin)
 */

/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *       - Inicio
 *     summary: Página de inicio
 *     description: Muestra mensaje de bienvenida
 *     responses:
 *       '200':
 *         description: Mensaje de bienvenida
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: 'Página de inicio'
 */
router.get('/', (req, res) => res.send('Página de inicio'));

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Token no proporcionado o inválido
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: 'No autorizado'
 *     ForbiddenError:
 *       description: No tiene permisos suficientes
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: 'Requiere rol de administrador'
 *     NotFoundError:
 *       description: Ruta no encontrada
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: 'error'
 *               message:
 *                 type: string
 *                 example: 'Ruta no encontrada: /ruta-invalida'
 */
router.use('/login', authRoutes);
router.use('/salones', salonesRoutes);
router.use('/usuarios', [verificarToken, esAdmin],usuariosRoutes);
router.use('/turnos', turnosRoutes);
router.use('/servicios', serviciosRoutes);
router.use('/reservas', reservasRutas);
router.use('/reportes',[verificarToken, esAdmin], reportesRutas);
router.use('/encuestas', encuestasRutas);
router.use('/comentarios', comentariosRutas);

router.use(rutaNoEncontrada);

export default router;