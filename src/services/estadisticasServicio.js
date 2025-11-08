import Estadisticas from "../db/estadisticas.js";

export default class EstadiscasServicio {

async obtenerEstadisticas() {
    const reportes = new Estadisticas();
    const rows = await reportes.buscarDatosProcedure();
    return rows;
  }
}
