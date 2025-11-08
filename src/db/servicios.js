import DbUtils from './dbUtils.js';

export default class Servicios {

    findAll = async (filters = null,limit = 0, offset = 0, order = "servicio_id",asc= "ASC") => {
        let sql = 'SELECT * FROM servicios';
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

    findById = async (servicio_id) => {
        // Defino el string de consulta
        const strSql = `SELECT * FROM servicios WHERE servicio_id = ? AND activo= 1`;
        const conexion = await DbUtils.initConnection();
        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [servicio_id]);
        conexion.end();
        return (rows.length > 0)? rows[0] : null;
    }

    create = async ({ descripcion,importe }) => {
        const strSql = 'INSERT INTO servicios (descripcion,importe) VALUES (?, ?);';

        const conexion = await DbUtils.initConnection();

        await conexion.query(strSql, [descripcion,importe]);

        const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS servicio_id');

        conexion.end();

        return this.findById(rows[0].servicio_id);
    }

    update = async (servicio_id, { descripcion, importe}) => {
        const strSql = 'UPDATE servicios SET descripcion = ?, importe = ? WHERE servicio_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [descripcion, importe, servicio_id]);
        conexion.end();
        return this.findById(servicio_id);
    };

    delete = async (servicio_id) => {
        const strSql = 'UPDATE servicios SET activo = 0 WHERE servicio_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [servicio_id]);
        conexion.end();
        return "Servicio eliminado correctamente";
    }

}