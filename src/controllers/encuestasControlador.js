import EncuestasServicio from '../services/encuestasServcio.js';

export default class EncuestasControlador {
    constructor() {
        this.encuestasServicio = new EncuestasServicio();
    }
    getAllEncuestas = async(req, res) => {
        try {
            const encuestas = await this.encuestasServicio.listar();
            if(encuestas){
                res.status(200).send({
                    status:true,
                    data:encuestas
                });
            }else{
                res.status(404).send({
                    status:false,
                    data:{
                        mensaje:"No se encontraron encuestas"
                    }
                });
            }
            
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
    createEncuesta = async(req, res) => {
        const { reserva_id, puntuacion, comentario } = req.body;
        try {
            const result = await this.encuestasServicio.guardar({ reserva_id, puntuacion, comentario });
            if(result){
                res.status(201).send({
                    status: true,
                    data: "Encuesta creada con éxito"
                });
            }else{
                res.status(202).send({
                    status: true,
                    data: "Encuesta no registrada"
                });
            }
        } catch (error) {
            res.status(500).send({
                status: false,
                data: {
                    mensaje: "Error al crear la encuesta",
                    errorDetails: error.message
                }
            });
        }
    }
    getEncuestaId = async(req, res) => {
        const { reserva_id } = req.params;
        try {
            const result = await this.encuestasServicio.buscarId(reserva_id);
            if (result.length === 0) {
                return res.status(404).send({
                    status: false,
                    data: {
                        mensaje: "No se encontraron encuestas"
                    }
                });
            }else{
                return res.status(200).send({
                    status: true,
                    data: {
                        reserva: result
                    }
                });
            }
        } catch (error) {
            res.status(500).send({
                status: false,
                data: {
                    mensaje: "Error al buscar las encuestas segun reservas ",
                    errorDetails: error.message
                }
            });
        }
    }
}
