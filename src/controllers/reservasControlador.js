import ReservasServicio from '../services/reservasServicio.js';

export default class ReservasControlador {
    constructor() {
        this.reservasServicio = new ReservasServicio();
    }
    getAllReservas = async(req, res) => {
        const usuario_tipo = req.tipoUsuario;
        const usuario_id = req.idUsuario;
        try {
            const reservas = await this.reservasServicio.fillAll(usuario_tipo, usuario_id);
            res.status(200).send({
                status:true,
                data:reservas
            });
        } catch (error) {
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los reservas",
                    errorDetails: error.message
                }
            });
        }
    }
    create = async (req, res) => {
        const { body } = req;
        if (Object.prototype.hasOwnProperty.call(body, 'foto_cumpleaniero')) {
            if (body.foto_cumpleaniero !== null) filters.foto_cumpleaniero = body.foto_cumpleaniero;
        }else{
            body.foto_cumpleaniero = null;
        }
        try {
            const reserva = {
                fecha_reserva: body.fecha_reserva,
                salon_id: body.salon_id,
                usuario_id: req.idUsuario,
                turno_id: body.turno_id,
                foto_cumpleaniero: body.foto_cumpleaniero,
                tematica: body.tematica,
                idservicios: body.idservicios
            };
            const reservaCreada = await this.reservasServicio.create(reserva);
            res.status(201).send({ 
                status:true,
                data: reservaCreada
            });
        } catch (error) {
            res.status(error?.status || 500).send({ 
                    status:false,
                    data: { error: error?.message || error,errorDetails: error.message }
                });
        }
    }
    
    update = async (req, res) => {
        const body = req.body;
        const reservaId = req.params.reservaId;
        try {
            const reservaActualizado = await this.reservasServicio.update(reservaId, body);
            if (!reservaActualizado) {
                res.status(404).send({
                    status:false,
                    data: { error: 'Reserva no encontrada' }
                });
            }else{
                res.status(200).send({
                    status:true,
                    data:reservaActualizado
                });
            }
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }

    delete = async (req, res) => {        
        const reservaId = req.params.reservaId;
        try {
            const reservaEliminada = await this.reservasServicio.delete(reservaId);
            if (!reservaEliminada) {
                res.status(404).send({
                    status:false,
                    data: { error: 'Reserva no encontrada' }
                });
            }else{
                res.status(200).send({
                    status:true,
                    data:{ mensaje: 'Reserva eliminada correctamente' }
                });
            }
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }
}