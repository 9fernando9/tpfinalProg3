export default class TurnoDTO {
    constructor(turno_id,orden,hora_desde,hora_hasta,activo,creado,modificado) {
        this.turno_id = turno_id;
        this.orden = orden;
        this.hora_desde = hora_desde;
        this.hora_hasta = hora_hasta;
        this.activo = activo;
        this.creado = creado;
        this.modificado = modificado;
    }
}