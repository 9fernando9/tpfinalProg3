import DbUtils from './dbUtils.js';

export default class Encuestas {
    constructor() {
    }

    listar = async () => {
        const conexion = await DbUtils.initConnection();
        const sqlSelect = `
            SELECT e.encuesta_id, e.reserva_id, e.puntuacion, e.comentario, e.fecha_encuesta,
             u.nombre AS cliente, s.titulo AS salon, r.fecha_reserva
              FROM encuestas e
              JOIN reservas r ON e.reserva_id = r.reserva_id
              JOIN usuarios u ON r.usuario_id = u.usuario_id
              JOIN salones s ON r.salon_id = s.salon_id
              ORDER BY e.fecha_encuesta DESC
            `;
        const [rows] = await conexion.execute(sqlSelect);
        conexion.end();
        return rows;
    }

    guardar = async ({reserva_id, puntuacion, comentario}) => {
        const conexion = await DbUtils.initConnection();
        const sql = "INSERT INTO encuestas (reserva_id, puntuacion, comentario) VALUES (?, ?, ?)";
        const [result] = await conexion.query(sql, [ reserva_id, puntuacion, comentario ]);
        conexion.end();
        return result;
    }
    buscarId = async (reserva_id) => {
        const conexion = await DbUtils.initConnection();
        const [results] = await conexion.query(
          `SELECT r.reserva_id, u.nombre AS cliente, s.titulo AS salon, r.fecha_reserva
           FROM reservas r
           JOIN usuarios u ON r.usuario_id = u.usuario_id
           JOIN salones s ON r.salon_id = s.salon_id
           WHERE r.reserva_id = ?`,
          [reserva_id]
        );
        conexion.end();
        return results;
    }
}