import { Router } from "express";
import { obtenerEstadisticas } from "../../controllers/estadisticasControlador.js";
import { verificarToken } from "../../middlewares/authMiddleware.js";
import { verificarRol } from "../../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", verificarToken, verificarRol(["admin"]), obtenerEstadisticas);

export default router;
