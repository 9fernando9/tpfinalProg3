import UsuariosServicio from '../services/usuariosServicio.js';

export default class UsuariosControlador {
    constructor() {
        this.usuariosServicio = new UsuariosServicio();
    }

    getAllUsuarios = async(req, res) => {
        const { body } = req;
        let filters = {};
        let pLimit = 10;
        let pOffset = 0;
        let pOrder = "usuario_id";
        let pAsc = "ASC";
        if(Object.keys(body).length > 0){
            if (Object.prototype.hasOwnProperty.call(body, 'activo')) {
                if (body.activo !== null) filters.activo = body.activo;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'apellido')) {
                if (body.apellido !== null) filters.apellido = body.apellido;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'nombre')) {
                if (body.nombre !== null) filters.nombre = body.nombre;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'nombre_usuario')) {
                if (body.nombre_usuario !== null) filters.nombre_usuario = body.nombre_usuario;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'tipo_usuario')) {
                if (body.tipo_usuario !== null) filters.tipo_usuario = body.tipo_usuario;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'limit')) {
                if (body.limit !== null) pLimit = body.limit ? Number(body.limit) : 10;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'offset')) {
                if (body.offset !== null) pOffset = body.offset ? Number(body.offset) : 0;
            }
            if (Object.prototype.hasOwnProperty.call(body, 'order')) {
                if (body.order !== null) pOrder = body.order || "usuario_id";
            }
            if (Object.prototype.hasOwnProperty.call(body, 'asc')) {                                
                if (body.asc !== null) pAsc = body.asc == "DESC" ? "DESC" : "ASC";
            }
        }
        try {
            const usuarios = await this.usuariosServicio.fillAll(filters, pLimit, pOffset, pOrder, pAsc);
            res.status(200).send({
                status:true,
                data:usuarios
            });
        } catch (error) {
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los usuarios",
                    errorDetails: error.message
                }
            });
        }
    }

    findById = async (req, res) => {
        const usuarioId = req.params.usuarioId;
        try{
            const usuario = await this.usuariosServicio.findById(usuarioId);
            if (!usuario) {
                res.status(404).send({
                    status:false,
                    data: {
                        error: "Usuario no encontrado."
                    }
                });
            }
            res.status(200).send({
                status:true,
                data:usuario
            });
        } catch(error){
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los usuarios",
                    errorDetails: error.message
                }
            });
        }
    }

    create = async (req, res) => {
        const { body } = req;
        try {
            const usuario = {
                nombre: body.nombre,
                apellido: body.apellido,
                nombre_usuario: body.nombre_usuario,
                contrasenia: body.contrasenia,
                tipo_usuario: body.tipo_usuario,
                celular: body.celular,
                foto: body.foto,
            };
            const usuarioCreado = await this.usuariosServicio.create(usuario);
            res.status(201).send({ 
                status:true,
                data: usuarioCreado
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
        const usuarioId = req.params.usuarioId;
        try {
            const usuarioActualizado = await this.usuariosServicio.update(usuarioId, body);
            if (!usuarioActualizado) {
                res.status(404).send({
                    status:false,
                    data: { error: 'Usuario no encontrado' }
                });
            }else{
                res.status(200).send({
                    status:true,
                    data:usuarioActualizado
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
        const usuarioId = req.params.usuarioId;
        try {
            const usuarioActualizado = await this.usuariosServicio.delete(usuarioId);
            res.status(200).send({
                status:true,
                data:usuarioActualizado
            });
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }

}