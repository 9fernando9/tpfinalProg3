import DbUtils from './dbUtils.js';

export default class Estadisticas {
    constructor() {
    }

    buscarDatosProcedure = async () => {
        const conexion = await DbUtils.initConnection();
        const [rows] = await conexion.execute("CALL estadisticas_reservas();");
        conexion.end();
        return rows;
    }
}
