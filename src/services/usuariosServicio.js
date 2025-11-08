import crypto from "crypto";
import UsuarioDTO from '../db/usuarioDTO.js';
import Usuarios from '../db/usuarios.js';

export default class UsuariosServicio {
    constructor() {
        this.usuarios = new Usuarios();
    }
    fillAll = async (filters,limit, offset, order,asc) => {
        const tableResults = await this.usuarios.findAll(filters, limit, offset, order, asc);
        const dtoResults = tableResults.map(row => new UsuarioDTO(row["usuario_id"], row["nombre"], row["apellido"], row["nombre_usuario"], row["contrasenia"], row["tipo_usuario"], row["celular"], row["foto"], row["activo"], row["creado"], row["modificado"]));
        return dtoResults;
    }

    findById = async (id) => {
        const row = await this.usuarios.findById(id);
        if (!row){
            return null;
        }else{
            return new UsuarioDTO(row["usuario_id"], row["nombre"], row["apellido"], row["nombre_usuario"], row["contrasenia"], row["tipo_usuario"], row["celular"], row["foto"], row["activo"], row["creado"], row["modificado"]);
        }
    }

    create = async (usuario) => {
        // 🔒 Encriptar la contraseña con MD5 (como las existentes)
        const md5Pass = crypto.createHash("md5").update(usuario.contrasenia).digest("hex");
        usuario.contrasenia = md5Pass;
        const usuarioToInsert = {
            ...usuario
        }
        return this.usuarios.create(usuarioToInsert);
    }

    update = async (usuario_id, usuario) => {
        const existe = await this.usuarios.findById(usuario_id);
        if (!existe){
            return null;
        }else{
            const usuarioToUpdate = {
            ...existe,
            ...usuario            
        }
        return this.usuarios.update(usuario_id, usuarioToUpdate);
        }
    }
    

    delete = async (usuario_id) => {
        const existe = await this.usuarios.findById(usuario_id);
        if (!existe){
            return "El usuario no existe";
        }else{
            return this.usuarios.delete(usuario_id);
        }
    }

}