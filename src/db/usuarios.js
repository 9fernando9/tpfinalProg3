import DbUtils from './dbUtils.js';

export default class Usuarios {

    findAll = async (filters = null,limit = 0, offset = 0, order = "usuario_id",asc= "ASC") => {
        let sql = 'SELECT * FROM usuarios';
        const params = [];
        if (filters && !Array.isArray(filters) && typeof filters === 'object') {
            filters = Object.keys(filters).map(k => ({ [k]: filters[k] }));
        }
        if (Array.isArray(filters) && filters.length > 0) {
            sql += ' WHERE ';
            for (const filter of filters) {
                for (const key of Object.keys(filter)) {
                    sql += `${key} = ? AND `;
                    params.push(filter[key]);
                }
            }
            sql = sql.slice(0, sql.length - 5);
        }
        if (order) {
            sql += ` ORDER BY ${order} ${asc}`;
        }
        if (Number(limit) > 0) {
            sql += ` LIMIT ? OFFSET ?`;
            params.push(Number(limit), Number(offset || 0));
        }
        const conexion = await DbUtils.initConnection();
        const [rows] = await conexion.execute(sql, params);
        conexion.end();
        return rows;
    }

    findById = async (usuarioId) => {
        // Defino el string de consulta
        const strSql = `SELECT * FROM usuarios WHERE usuario_id = ? AND activo = 1`;
        const conexion = await DbUtils.initConnection();
        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [usuarioId]);
        conexion.end();
        return (rows.length > 0)? rows[0] : null;
    }

    create = async ({ nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto }) => {
        const strSql = 'INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto) VALUES (?, ?, ?, ?, ?, ?, ?);';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto]);
        const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS usuario_id');
        conexion.end();
        return this.findById(rows[0].usuario_id);
    }

    update = async (usuario_id, { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo }) => {
        const strSql = 'UPDATE usuarios SET nombre = ?, apellido = ?, nombre_usuario = ?, contrasenia = ?, tipo_usuario = ?, celular = ?, foto = ?, activo = ? WHERE usuario_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo, usuario_id]);
        conexion.end();
        return this.findById(usuario_id);
    };

    delete = async (usuario_id) => {
        const strSql = 'UPDATE usuarios SET activo = 0 WHERE usuario_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [usuario_id]);
        conexion.end();
        return "Usuario eliminado correctamente";
    }

    buscarUsuarioAcceso = async(usuario)=>{
        // Defino el string de consulta
        const strSql = `SELECT usuario_id,nombre,apellido,nombre_usuario,contrasenia,tipo_usuario,celular,foto FROM usuarios WHERE nombre_usuario = ? AND activo = 1`;
        const conexion = await DbUtils.initConnection();
        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [usuario]);
        conexion.end();
        return (rows.length > 0)? rows[0] : null;
    }

     buscarCorreos = async(usuario_id)=>{
        // Defino el string de consulta
        const strSql = `SELECT nombre_usuario FROM usuarios WHERE usuario_id = ? OR tipo_usuario = 1 OR tipo_usuario = 2 AND activo = 1`;
        const conexion = await DbUtils.initConnection();
        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [usuario_id]);
        conexion.end();
        const correos = rows.map(r=>r.nombre_usuario);
        return correos;
    }
}
