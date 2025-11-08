import { Router } from 'express';
import AuthControlador from '../../controllers/authControlador.js';
import { validarLogin } from '../../middlewares/login_validarCampos.js';

const authControlador = new AuthControlador();
const router = Router();

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Iniciar sesión
 *     description: Valida credenciales y devuelve token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - password
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: Nombre de usuario o email
 *                 example: "juan.perez@email.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "miClave123"
 *     responses:
 *       '200':
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del usuario
 *                     nombre:
 *                       type: string
 *                       description: Nombre completo
 *                     nombre_usuario:
 *                       type: string
 *                       description: Username
 *                     rol:
 *                       type: string
 *                       description: Rol del usuario (admin, empleado, cliente)
 *       '400':
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario y contraseña son requeridos"
 *       '401':
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario o contraseña incorrectos"
 *       '500':
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/",[validarLogin], authControlador.verificarAcceso);

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export default router;
