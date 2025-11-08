import { Router } from "express";
import ReportesControlador from '../../controllers/reportesControlador.js';

const reportesControlador = new ReportesControlador();

const router = Router();

/**
 * @openapi
 * /reportes/pdf:
 *   get:
 *     tags:
 *       - Reportes
 *     summary: Generar reporte en formato PDF
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: PDF generado exitosamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       '401':
 *         description: No autorizado
 *       '500':
 *         description: Error al generar el PDF
 */
router.get("/pdf", reportesControlador.generarReportePDF);

/**
 * @openapi
 * /reportes/csv:
 *   get:
 *     tags:
 *       - Reportes
 *     summary: Generar reporte en formato CSV
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: CSV generado exitosamente
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       '401':
 *         description: No autorizado
 *       '500':
 *         description: Error al generar el CSV
 */
router.get("/csv", reportesControlador.generarReporteCSV);

/**
 * @openapi
 * /reportes/estadisticas:
 *   get:
 *     tags:
 *       - Reportes
 *     summary: Obtener estadísticas generales
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Estadísticas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalReservas:
 *                   type: integer
 *                   description: Total de reservas realizadas
 *                 reservasPorMes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       mes:
 *                         type: string
 *                       cantidad:
 *                         type: integer
 *                 ingresoTotal:
 *                   type: number
 *                   description: Suma total de ingresos
 *       '401':
 *         description: No autorizado
 *       '500':
 *         description: Error al obtener estadísticas
 */
router.get("/estadisticas", reportesControlador.getEstadisticas);

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
