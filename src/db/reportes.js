import DbUtils from './dbUtils.js';

export default class Reportes {
    constructor() {
    }

    buscarDatosCSV = async () => {
        const sqlSelect = `
            SELECT 
              r.reserva_id,
              r.fecha_reserva,
              CONCAT(u.nombre, ' ', u.apellido) AS cliente,
              s.titulo AS salon,
              CONCAT(t.hora_desde, ' - ', t.hora_hasta) AS turno,
              r.tematica,
              r.importe_total,
              r.activo
            FROM reservas r
            JOIN usuarios u ON r.usuario_id = u.usuario_id
            JOIN salones s ON r.salon_id = s.salon_id
            JOIN turnos t ON r.turno_id = t.turno_id
            ORDER BY r.fecha_reserva DESC;
          `;
        const conexion = await DbUtils.initConnection();
        const [rows] = await conexion.execute(sqlSelect, null);
        conexion.end();
        return rows;
    }

    buscarDatosPDF = async () => {
        const sqlSelect = `
                SELECT 
                  r.reserva_id,
                  DATE_FORMAT(r.fecha_reserva, '%d/%m/%Y') AS fecha,
                  CONCAT(u.nombre, ' ', u.apellido) AS cliente,
                  s.titulo AS salon,
                  CONCAT(t.hora_desde, ' - ', t.hora_hasta) AS turno,
                  r.tematica,
                  r.importe_total,
                  IF(r.activo = 1, 'Activo', 'Inactivo') AS estado
                FROM reservas r
                JOIN usuarios u ON r.usuario_id = u.usuario_id
                JOIN salones s ON r.salon_id = s.salon_id
                JOIN turnos t ON r.turno_id = t.turno_id
                ORDER BY r.fecha_reserva DESC;
              `;
        const conexion = await DbUtils.initConnection();
        const [rows] = await conexion.execute(sqlSelect);
        conexion.end();
        return rows;
    }


    buscarDatosEstadistica = async () => {
        const sqlSelect = ` SELECT 
            s.titulo AS salon,
            COUNT(r.reserva_id) AS cantidad_reservas,
            SUM(r.importe_total) AS total_recaudado
          FROM reservas r
          JOIN salones s ON r.salon_id = s.salon_id
          GROUP BY s.salon_id;
        `;
        const conexion = await DbUtils.initConnection();
        const [rows] = await conexion.execute(sqlSelect, null);
        conexion.end();
        return rows;
    }

}
