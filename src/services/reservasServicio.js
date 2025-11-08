import Reservas from '../db/reservas.js';
import salones from "../db/salones.js";
import servicios from '../db/servicios.js';
import nodemailer from 'nodemailer';


export default class Reservasreserva {
    constructor() {
        this.reservas = new Reservas();
        this.salones = new salones();
        this.servicios = new servicios();
    }
    
    //Busca todas las reservas con sus servicios
    fillAll = async (usuario_tipo,usuario_id) => {
        let tableResults = [];
        if(usuario_tipo=="admin" || usuario_tipo=="empleado"){
            tableResults = await this.reservas.findAll(null);
        }else{            
            tableResults = await this.reservas.findAll(usuario_id);
        }
        if(tableResults.length === 0){
            "No hay reservas registradas";
        }else{
            const map = new Map();
            for (const row of tableResults) {
                const id = row.idReserva;
                if (!map.has(id)) {
                    map.set(id, {                    
                        reserva_id: id,
                        fecha_reserva: row.fechReserva,
                        tematica: row.temaReserva,
                        importe_total: Number(row.importReserva ?? 0),
                        salon: {
                            titulo: row.tituloSalon ?? '',
                            direccion: row.direcSalon ?? '',
                            capacidad: row.cantSalon ?? null,
                            importe: Number(row.importSalon ?? 0)
                        },
                        turno: {
                            orden: row.ordenTurno ?? null,
                            hora_desde: row.horDesdeTurno ?? null,
                            hora_hasta: row.horHastaTurno ?? null
                        },
                        servicios: []
                    });
                }
                if(row.descripServicio!=null){
                // Añadir el servicio actual a la reserva
                    const servicio = {
                        descripcion: row.descripServicio ?? '',
                        importe: Number(row.importServicio ?? 0)
                    };
                    map.get(id).servicios.push(servicio);
                }
        }
        // Devolver como array
        return Array.from(map.values());
        }
    }
    //Crea una reserva con sus servicios 
    create = async (reserva) => {
        const existeSalon = await this.salones.findById(reserva.salon_id);
        if (!existeSalon){
            return "Salon no encontrado";
        }else{
            const importe_salon = parseFloat(existeSalon.importe);
            let importe_total = importe_salon;
            let lista_servicios = [];
            for (let i=0;i<reserva.idservicios.length;i++){
                const servicio = await this.servicios.findById(reserva.idservicios[i]);
                if (servicio) {
                    importe_total += parseFloat(servicio.importe);
                    lista_servicios.push(servicio);
                }else{
                    return "Servicios no encontrados";
                }
            }
            this.reservas = new Reservas(null, reserva.fecha_reserva, reserva.salon_id, reserva.usuario_id, reserva.turno_id, reserva.foto_cumpleaniero, reserva.tematica, importe_salon, importe_total, null, null, null,lista_servicios);
            const row = this.reservas.create();
            /*const transporte = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth:{
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                tls:{
                    rejectUnauthorized: false
                }
            });
            const mensaje = {
                from : process.env.EMAIL_USER,
                to : 'lusfergomez101@gmail.com',
                subject : 'Confirmación de Reserva',
                text : `Su reserva para el salón ha sido confirmada. Detalles:\nFecha: ${reserva.fecha_reserva}\nImporte Total: $${importe_total.toFixed(2)}\n¡Gracias por elegirnos!`
            }
            await transporte.verify();

            const info = await transporte.sendMail(mensaje);
            */
            return row;
        }
    }

    update = async (reserva_id,reserva) => {
        const existing = await this.reservas.findById(reserva_id);
        console.log("RESERVA EXISTENTE:",existing);
        if (!existing){
            return null;
        }else{
            const reservaToUpdate = {
                ...existing[0],
                ...reserva
            }
            return this.reservas.update(reservaToUpdate);
        }
    }
    //Busca una reserva, funcion solamente se llama desde update y delete
    findById = async (id_reserva) => {
        const row = await this.reservas.findById(id_reserva);
        return row ? row : null;
    }

    //Eliminar una reserva
    delete = async (reserva_id) => {
        const existing = await this.reservas.findById(reserva_id);
        if (!existing){
            return null;
        }else{
            const reservaToUpdate = {reserva_id};
            return this.reservas.delete(reservaToUpdate);
        }
    }

}