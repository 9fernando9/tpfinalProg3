import turnosServicio from '../services/turnosServicio.js';

export default class TurnosControlador {
    constructor() {
        this.turnosServicio = new turnosServicio();
    }

    getAllTurnos = async(req, res) => {
        const { body } = req;
        let filters = {};
        let pLimit = 10;
        let pOffset = 0;
        let pOrder = "turno_id";
        let pAsc = "ASC";
        if(Object.keys(body).length > 0){
            if (Object.prototype.hasOwnProperty.call(body, 'activo')) {
                if (body.activo !== null) filters.activo = body.activo;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'orden')) {
                if (body.orden !== null) filters.orden = body.orden;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'hora_desde')) {
                if (body.hora_desde !== null) filters.hora_desde = body.hora_desde;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'hora_hasta')) {
                if (body.hora_hasta !== null) filters.hora_hasta = body.hora_hasta;
            }
            
            if (Object.prototype.hasOwnProperty.call(body, 'limit')) {
                if (body.limit !== null) pLimit = body.limit ? Number(body.limit) : 10;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'offset')) {
                if (body.offset !== null) pOffset = body.offset ? Number(body.offset) : 0;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'order')) {
                if (body.order !== null) pOrder = body.order || "turno_id";
            }
            if (Object.prototype.hasOwnProperty.call(body, 'asc')) {                                
                if (body.asc !== null) pAsc = body.asc == "DESC" ? "DESC" : "ASC";
            }
        }
        try {
            const turnos = await this.turnosServicio.fillAll(filters, pLimit, pOffset, pOrder, pAsc);
            res.status(200).send({
                status:true,
                data:turnos
            });
        } catch (error) {
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los turnos",
                    errorDetails: error.message
                }
            });
        }
    }

    findById = async (req, res) => {
        const turnoId = req.params.turnoId;
        try{
            const turno = await this.turnosServicio.findById(turnoId);
            if (!turno) {
                res.status(404).send({
                    status:false,
                    data: {
                        error: "Turno no encontrado."
                    }
                });
            }
            res.status(200).send({
                status:true,
                data:turno
            });
        } catch(error){
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los turnos",
                    errorDetails: error.message
                }
            });
        }
    }

    create = async (req, res) => {
        const { body } = req;
        try {
            const turno = {
                orden: body.orden,
                hora_desde: body.hora_desde,
                hora_hasta: body.hora_hasta,
            };
            const turnoCreado = await this.turnosServicio.create(turno);
            res.status(201).send({ 
                status:true,
                data: turnoCreado
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
        const turnoId = req.params.turnoId;
        try {
            const turnoActualizado = await this.turnosServicio.update(turnoId, body);
            if (!turnoActualizado) {
                res.status(404).send({
                    status:false,
                    data: { error: 'Turno no encontrado' }
                });
            }else{
                res.status(200).send({
                    status:true,
                    data:turnoActualizado
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
        const turnoId = req.params.turnoId;
        try {
            const turnoEliminado = await this.turnosServicio.delete(turnoId);
            res.status(200).send({
                status:true,
                data:turnoEliminado
            });
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }
}