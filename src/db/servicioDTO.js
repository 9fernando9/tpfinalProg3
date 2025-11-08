export default class ServicioDTO {
    constructor(servicio_id,descripcion,importe,activo,creado,modificado) {
        this.servicio_id = servicio_id;
        this.descripcion = descripcion;
        this.importe = importe;
        this.activo = activo;
        this.creado = creado;
        this.modificado = modificado;
    }
}