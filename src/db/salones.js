import DbUtils from './dbUtils.js';

export default class Salones {
    
    findAll = async (filters = null,limit = 10, offset = 0, order = "salon_id",asc= "ASC") => {
        let sql = 'SELECT * FROM salones';
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

    findById = async (salonId) => {
        // Defino el string de consulta
        const strSql = `SELECT * FROM salones WHERE salon_id = ? AND activo= 1`;

        const conexion = await DbUtils.initConnection();

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [salonId]);

        conexion.end();

        return (rows.length > 0)? rows[0] : null;
    }

    create = async ({ titulo, direccion, latitud, longitud, capacidad, importe, activo, creado, modificado }) => {
        const strSql = 'INSERT INTO salones (titulo, direccion, latitud, longitud, capacidad, importe) VALUES (?, ?, ?, ?, ?, ?);';

        const conexion = await DbUtils.initConnection();

        await conexion.query(strSql, [titulo, direccion, latitud, longitud, capacidad, importe]);

        const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS salon_id');

        conexion.end();

        return this.findById(rows[0].salon_id);
    }

    update = async (salon_id, { titulo, direccion, latitud, longitud, capacidad, importe}) => {
        const strSql = 'UPDATE salones SET titulo = ?, direccion = ?, latitud = ?, longitud = ?, capacidad = ?, importe = ? WHERE salon_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [titulo, direccion, latitud, longitud, capacidad, importe, salon_id]);
        conexion.end();
        return this.findById(salon_id);
    };

    delete = async (salon_id) => {
        const strSql = 'UPDATE salones SET activo = 0 WHERE salon_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [salon_id]);
        conexion.end();
        return "Salon eliminado correctamente";
    }

}