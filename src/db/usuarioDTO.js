export default class UsuarioDTO {
    constructor(usuario_id, nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo, creado, modificado) {
        this.usuario_id = usuario_id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombre_usuario = nombre_usuario;
        this.contrasenia = contrasenia;
        this.tipo_usuario = tipo_usuario;
        this.celular = celular;
        this.foto = foto;
        this.activo = activo;
        this.creado = creado;
        this.modificado = modificado;
    }
}