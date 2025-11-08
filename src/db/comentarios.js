import DbUtils from './dbUtils.js';

export default class Comentarios {
    constructor() {
    }

    listar = async () => {
        const conexion = await DbUtils.initConnection();
        const sqlSelect = 
             `SELECT rc.*, u.nombre, u.apellido, r.reserva_id
       FROM reservas_comentarios rc
       JOIN usuarios u ON rc.usuario_id = u.usuario_id
       JOIN reservas r ON rc.reserva_id = r.reserva_id
       ORDER BY rc.fecha_comentario DESC`;
        const [rows] = await conexion.execute(sqlSelect);
        conexion.end();
        return rows;
    }

    guardar = async ({reserva_id, usuario_id, comentario}) => {
        const conexion = await DbUtils.initConnection();
        const sql = "INSERT INTO reservas_comentarios (reserva_id, usuario_id, comentario) VALUES (?, ?, ?)";
        const [result] = await conexion.query(sql, [reserva_id, usuario_id, comentario]);
        conexion.end();
        return result;
    }
    buscarId = async (reserva_id) => {
        const conexion = await DbUtils.initConnection();
        const [results] = await conexion.query(
          `SELECT rc.*, u.nombre, u.apellido
       FROM reservas_comentarios rc
       JOIN usuarios u ON rc.usuario_id = u.usuario_id
       WHERE rc.reserva_id = ?
       ORDER BY rc.fecha_comentario DESC`,
          [reserva_id]
        );
        conexion.end();
        return results;
    }

    delete = async (comentario_id) => {
        const conexion = await DbUtils.initConnection();
        const sqlDelete = "DELETE FROM reservas_comentarios WHERE comentario_id = ?";
        const [result] = await conexion.execute(sqlDelete, [comentario_id]);
        conexion.end();
        return result;
    }
}