import DbUtils from './dbUtils.js';

export default class Estadisticas {
    constructor() {
    }

    buscarDatos = async (sqlSelect) => {
        const conexion = await DbUtils.initConnection();
        const [rows] = await conexion.execute(sqlSelect, null);
        conexion.end();
        return rows;
    }
}