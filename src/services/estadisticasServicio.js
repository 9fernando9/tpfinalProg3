import Estadisticas from "../db/estadisticas.js";

export default class EstadiscasServicio {

async obtenerEstadisticas() {
    const sqlSelect = `
        SELECT 
              s.titulo AS salon,
          COUNT(r.reserva_id) AS cantidad_reservas,
          SUM(r.importe_total) AS total_recaudado
        FROM reservas r
        JOIN salones s ON r.salon_id = s.salon_id
        GROUP BY s.salon_id;
      `;
    const reportes = new Estadisticas();
    const rows = await reportes.buscarDatos(sqlSelect);
  }
}