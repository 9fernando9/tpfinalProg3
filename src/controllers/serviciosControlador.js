import servicioServicio from '../services/serviciosServicio.js';

export default class ServicioControlador {
    constructor() {
        this.servicioServicio = new servicioServicio();
    }

    getAllServicios = async(req, res) => {
        const { body } = req;
        let filters = {};
        let pLimit = 10;
        let pOffset = 0;
        let pOrder = "servicio_id";
        let pAsc = "ASC";
        if(Object.keys(body).length > 0){
            if (Object.prototype.hasOwnProperty.call(body, 'activo')) {
                if (body.activo !== null) filters.activo = body.activo;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'descripcion')) {
                if (body.descripcion !== null) filters.descripcion = body.descripcion;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'importe')) {
                if (body.importe !== null) filters.importe = body.importe;
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
            const servicios = await this.servicioServicio.fillAll(filters, pLimit, pOffset, pOrder, pAsc);
            res.status(200).send({
                status:true,
                data:servicios
            });
        } catch (error) {
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los servicios",
                    errorDetails: error.message
                }
            });
        }
    }

    findById = async (req, res) => {
        const servicioId = req.params.servicioId;
        try{
            const servicio = await this.servicioServicio.findById(servicioId);
            if (!servicio) {
                res.status(404).send({
                    status:false,
                    data: {
                        error: "Servicio no encontrado."
                    }
                });
            }
            res.status(200).send({
                status:true,
                data:servicio
            });
        } catch(error){
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los servicios",
                    errorDetails: error.message
                }
            });
        }
    }

    create = async (req, res) => {
        const { body } = req;
        try {
            const servicio = {
                descripcion: body.descripcion,
                importe: body.importe,
            };
            const servicioCreado = await this.servicioServicio.create(servicio);
            res.status(201).send({ 
                status:true,
                data: servicioCreado
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
        const servicioId = req.params.servicioId;
        try {
            const servicioActualizado = await this.servicioServicio.update(servicioId, body);
            if (!servicioActualizado) {
                res.status(404).send({
                    status:false,
                    data: { error: 'Servicio no encontrado' }
                });
            }else{
                res.status(200).send({
                    status:true,
                    data:servicioActualizado
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
        const servicioId = req.params.servicioId;
        try {
            const servicioEliminado = await this.servicioServicio.delete(servicioId);
            res.status(200).send({
                status:true,
                data:servicioEliminado
            });
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }
}