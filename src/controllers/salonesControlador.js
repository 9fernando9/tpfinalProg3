import salonesServicio from '../services/salonesServicio.js';

export default class SalonesControlador {
    constructor() {
        this.salonesServicio = new salonesServicio();
    }

    getAllSalones = async(req, res) => {
        const { body } = req;
        let filters = {};
        let pLimit = 10;
        let pOffset = 0;
        let pOrder = "salon_id";
        let pAsc = "ASC";
        if(Object.keys(body).length > 0){
            if (Object.prototype.hasOwnProperty.call(body, 'activo')) {
                if (body.activo !== null) filters.activo = body.activo;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'titulo')) {
                if (body.titulo !== null) filters.titulo = body.titulo;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'capacidad')) {
                if (body.capacidad !== null) filters.capacidad = body.capacidad;
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
            const salones = await this.salonesServicio.fillAll(filters, pLimit, pOffset, pOrder, pAsc);
            res.status(200).send({
                status:true,
                data:salones
            });
        } catch (error) {
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los salones",
                    errorDetails: error.message
                }
            });
        }
    }

    findById = async (req, res) => {
        const salonId = Number(req.params.salonId);
        try{
            const salon = await this.salonesServicio.findById(salonId);
            if (!salon) {
                res.status(404).send({
                    status:false,
                    data: {
                        error: "Salon no encontrado"
                    }
                });
            }
            res.status(200).send({
                status:true,
                data:salon
            });
        } catch(error){
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los salones",
                    errorDetails: error.message
                }
            });
        }
    }

    create = async (req, res) => {
        const { body } = req;
        try {
            const salon = {
                titulo: body.titulo,
                direccion: body.direccion,
                latitud: body.latitud,
                longitud: body.longitud,
                capacidad: body.capacidad,
                importe: body.importe
            };
            const salonCreado = await this.salonesServicio.create(salon);
            res.status(201).send({ 
                status:true,
                data: salonCreado
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
        const salonId = req.params.salonId;
        try {
            const salonActualizado = await this.salonesServicio.update(salonId, body);
            if (!salonActualizado) {
                res.status(404).send({
                    status:false,
                    data: { error: 'Salon no encontrado' }
                });
            }else{
                res.status(200).send({
                    status:true,
                    data:salonActualizado
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
        const salonId = req.params.salonId;
        try {
            const salonActualizado = await this.salonesServicio.delete(salonId);
            res.status(200).send({
                status:true,
                data:salonActualizado
            });
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }
}