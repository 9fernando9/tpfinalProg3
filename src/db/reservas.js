import DbUtils from './dbUtils.js';
import Reservas_Servicios from './reservas_servicios.js';

export default class Reservas {
    //Constructor de la clase Reservas
    constructor(reserva_id,fecha_reserva,salon_id,usuario_id,turno_id,foto_cumpleaniero,tematica,importe_salon,importe_total,activo,creado,modificado,lista_servicios=[]) {
        this.reserva_id = reserva_id;
        this.fecha_reserva = fecha_reserva;
        this.salon_id = salon_id;
        this.usuario_id = usuario_id;
        this.turno_id = turno_id;
        this.foto_cumpleaniero = foto_cumpleaniero;
        this.tematica = tematica;
        this.importe_salon = importe_salon;
        this.importe_total = importe_total;
        this.activo = activo;
        this.creado = creado;
        this.modificado = modificado;
        this.lista_servicios = lista_servicios;
    }
    //Obtiene todas las reservas, o las de un usuario en particular
    findAll = async (usuario_id) => {
        let sqlSelect = "";
        let params = null;
        if(usuario_id){
            sqlSelect = "SELECT r.reserva_id AS idReserva,r.fecha_reserva AS fechReserva,r.tematica AS temaReserva,r.importe_total AS importReserva,"+
                    "s.titulo AS tituloSalon,s.direccion AS direcSalon,s.capacidad AS cantSalon,s.importe AS importSalon,"+
                    "t.orden AS ordenTurno,t.hora_desde AS horDesdeTurno, t.hora_hasta AS horHastaTurno,"+
                    "se.descripcion AS descripServicio,se.importe AS importServicio "+
                    "FROM reservas r "+
                    "INNER JOIN salones s ON r.salon_id = s.salon_id "+
                    "INNER JOIN turnos t ON r.turno_id = t.turno_id "+
                    "LEFT JOIN reservas_servicios rs ON r.reserva_id = rs.reserva_id "+
                    "LEFT JOIN servicios se ON se.servicio_id = rs.servicio_id "+
                    "WHERE r.activo=1  AND r.usuario_id = ?;";
            params= [usuario_id];
        }else{
            sqlSelect = "SELECT r.reserva_id AS idReserva,r.fecha_reserva AS fechReserva,r.tematica AS temaReserva,r.importe_total AS importReserva,"+
                    "s.titulo AS tituloSalon,s.direccion AS direcSalon,s.capacidad AS cantSalon,s.importe AS importSalon,"+
                    "t.orden AS ordenTurno,t.hora_desde AS horDesdeTurno, t.hora_hasta AS horHastaTurno,"+
                    "se.descripcion AS descripServicio,se.importe AS importServicio "+
                    "FROM reservas r "+
                    "INNER JOIN salones s ON r.salon_id = s.salon_id "+
                    "INNER JOIN turnos t ON r.turno_id = t.turno_id "+
                    "LEFT JOIN reservas_servicios rs ON r.reserva_id = rs.reserva_id "+                    
                    "LEFT JOIN servicios se ON se.servicio_id = rs.servicio_id "+
                    "WHERE r.activo=1;";
        }
        const conexion = await DbUtils.initConnection();
        const [rows] = await conexion.execute(sqlSelect, params);
        conexion.end();
        return rows;
    }
    //Crea una reserva con sus servicios asociados
    create = async () => {
        const sqlInsert = 'INSERT INTO reservas (fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
        const campos = [
            this.fecha_reserva,
            this.salon_id,
            this.usuario_id,
            this.turno_id,
            this.foto_cumpleaniero,
            this.tematica,
            this.importe_salon,
            this.importe_total
        ];
        const conexion = await DbUtils.initConnection();
        const [rows] = await conexion.execute(sqlInsert, campos);
        const idReservaInsert = rows.insertId;
        if(this.lista_servicios.length>0){
            const reservas_servicios = new Reservas_Servicios(null, idReservaInsert, null, null, null, null);
            await reservas_servicios.create(this.lista_servicios);
        }
        return this.findById(idReservaInsert);
    }
    //Buscar una reserva con sus servicios
    findById = async (reserva_id) => {
        // Defino el string de consulta
        const sqlSelect = "SELECT r.reserva_id,r.fecha_reserva,r.salon_id,r.turno_id,"+
                    "r.foto_cumpleaniero,r.tematica,r.importe_salon,r.importe_total,r.creado,"+
                    "rs.reserva_servicio_id,rs.servicio_id,rs.importe,rs.creado "+
                    "FROM reservas r "+
                    "LEFT JOIN reservas_servicios rs ON r.reserva_id = rs.reserva_id "+
                    "WHERE r.activo=1 AND r.reserva_id= ? ORDER BY rs.servicio_id;";
        const params = [reserva_id];
        const conexion = await DbUtils.initConnection();
        const [reserva_buscada] = await conexion.execute(sqlSelect, params);
        conexion.end();
        if(reserva_buscada.length>0){
            let reserva_ = null;
            let lista_servicios = [];
            for(const fila  of reserva_buscada){
                if(!reserva_){
                    reserva_ = {
                        reserva_id : fila.reserva_id,
                        fecha_reserva : fila.fecha_reserva,
                        salon_id : fila.salon_id,
                        turno_id : fila.turno_id,
                        foto_cumpleaniero : fila.foto_cumpleaniero,
                        tematica : fila.tematica,
                        importe_salon : fila.importe_salon,
                        importe_total : fila.importe_total,
                        creado : fila.creado
                    };
                }
                if(fila.servicio_id){
                    lista_servicios.push({
                        reserva_servicio : fila.reserva_servicio,
                        servicio_id : fila.servicio_id,
                        importe : fila.importe,
                        creado : fila.creado,
                        activo : 1
                    });
                }
            }
            return [reserva_,lista_servicios];    
        }else{
            return null;
        };
        
    }

    //Modifica una reserva
    update = async (reservaUpdate) => {
        const sqlUpdate = 'UPDATE reservas SET fecha_reserva = ?, salon_id = ?,tematica = ?, turno_id = ?, foto_cumpleaniero = ?,importe_salon = ?, importe_total = ? WHERE reserva_id = ?';
        const params = [reservaUpdate.fecha_reserva,
            reservaUpdate.salon_id,
            reservaUpdate.tematica,
            reservaUpdate.turno_id,
            reservaUpdate.foto_cumpleaniero,
            reservaUpdate.importe_salon,
            reservaUpdate.importe_total,
            reservaUpdate.reserva_id
        ];
        const conexion = await DbUtils.initConnection();
        await conexion.query(sqlUpdate, params);
        for(let i = 0; i < this.lista_servicios.length; i++){
            if(this.lista_servicios[i].estado=='eliminar'){
                const reservas_servicios = new Reservas_Servicios(this.lista_servicios[i].servicio_id, null, null, null, null, null);
                await reservas_servicios.eliminar();
            }else{
                // Insertar o actualizar servicio
                const reservas_servicios = new Reservas_Servicios(null, reservaUpdate.reserva_id, this.lista_servicios[i].servicio_id, this.lista_servicios[i].importe);
                await reservas_servicios.crearEliminar();
            }
        }
        conexion.end();
        return this.findById(reservaUpdate.reserva_id);
    }

     //Eliminar una reserva
    delete = async (reservaDelete) => {
        const sqlUpdate = 'UPDATE reservas SET activo = 0 WHERE reserva_id = ?';
        const params = [reservaDelete.reserva_id];
        const conexion = await DbUtils.initConnection();
        await conexion.query(sqlUpdate, params);
        conexion.end();
        return true;
    }
}