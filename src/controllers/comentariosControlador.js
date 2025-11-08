import ComentariosServicio from '../services/comentariosServicio.js';

export default class ComentariosControlador {
    constructor() {
        this.comentariosServicio = new ComentariosServicio();
    }
    getAllComentarios = async(req, res) => {
        try {
            const comentarios = await this.comentariosServicio.listar();
            if(comentarios){
                res.status(200).send({
                    status:true,
                    data:comentarios
                });
            }else{
                res.status(404).send({
                    status:false,
                    data:{
                        mensaje:"No se encontraron comentarios"
                    }
                });
            }
            
        } catch (error) {
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los comentarios",
                    errorDetails: error.message
                }
            });
        }
    }
    createComentario = async(req, res) => {
        const usuario_id = req.idUsuario;
        const {  reserva_id, comentario } = req.body;
        try {
            const result = await this.comentariosServicio.guardar({ reserva_id, usuario_id, comentario });
            if(result){
                res.status(201).send({
                    status: true,
                    data: "Comentario creado con éxito"
                });
            }else{
                res.status(202).send({
                    status: true,
                    data: "Comentario no registrado"
                });
            }
        } catch (error) {
            res.status(500).send({
                status: false,
                data: {
                    mensaje: "Error al crear el comentario",
                    errorDetails: error.message
                }
            });
        }
    }
    getComentarioId = async(req, res) => {
        const { reserva_id } = req.params;
        try {
            const result = await this.comentariosServicio.buscarId(reserva_id);
            if (result.length === 0) {
                return res.status(404).send({
                    status: false,
                    data: {
                        mensaje: "No se encontraron comentarios"
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
                    mensaje: "Error al buscar los comentarios segun reservas ",
                    errorDetails: error.message
                }
            });
        }
    }

    deleteComentario = async(req, res) => {
        const { comentario_id } = req.params;
        try {
            const result = await this.comentariosServicio.delete(comentario_id);
            if (result.affectedRows === 0) {
                return res.status(404).send({
                    status: false,
                    data: {
                        mensaje: "Comentario no encontrado"
                    }
                });
            } else {
                return res.status(200).send({
                    status: true,
                    data: {
                        mensaje: "Comentario eliminado exitosamente"
                    }
                });
            }
        } catch (error) {
            res.status(500).send({
                status: false,
                data: {
                    mensaje: "Error al eliminar el comentario",
                    errorDetails: error.message
                }
            });
        }
    }
}
