import DbUtils from './dbUtils.js';

export default class Reservas_Servicios {
    //Constructor de la clase Reservas_Servicios
    constructor(reserva_servicio_id, reserva_id, servicio_id, importe) {
        this.reserva_servicio_id = reserva_servicio_id;
        this.reserva_id = reserva_id;
        this.servicio_id = servicio_id;
        this.importe = importe;
    }
    //Crea una reserva con sus servicios asociados
    create = async (lista_servicios) => {
        let datos = [];
        let sqlInsert = 'INSERT INTO reservas_servicios (reserva_id, servicio_id, importe) VALUES ';
        for(let i=0;i<lista_servicios.length;i++){
            sqlInsert += '(?, ?, ?),';
            datos.push(this.reserva_id);
            datos.push(lista_servicios[i].servicio_id);
            datos.push(lista_servicios[i].importe);
        }
        sqlInsert = sqlInsert.slice(0,-1)+';';
        const conexion = await DbUtils.initConnection();
        const [rows] = await conexion.execute(sqlInsert, datos);
        conexion.end();
        return rows;
    }
    //Elimina un servicio de una reserva
    eliminar = async () => {
        const sqlDelete = 'DELETE FROM reservas_servicios WHERE servicio_id = ?;';
        const params = [this.servicio_id];
        const conexion = await DbUtils.initConnection();
        const [rows] = await conexion.execute(sqlDelete, params);
        conexion.end();
        return rows;
    }

    crearEliminar = async () => {
        const conexion = await DbUtils.initConnection();
        const sqlUpsert = `
                    INSERT INTO reservas_servicios (reserva_id, servicio_id, importe) 
                    VALUES (?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                    importe = VALUES(importe)
                `;
        await conexion.query(sqlUpsert, [this.reserva_id,this.servicio_id,this.importe]);
        conexion.end();
        return true;
    }
}