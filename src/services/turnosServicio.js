import TurnoDTO from '../db/turnoDTO.js';
import Turnos from '../db/turnos.js';

export default class TurnosServicio {
    constructor() {
        this.turnos = new Turnos();
    }
    fillAll = async (filters,limit, offset, order,asc) => {
        const tableResults = await this.turnos.findAll(filters, limit, offset, order, asc);
        const dtoResults = tableResults.map(row => new TurnoDTO(row["turno_id"], row["orden"], row["hora_desde"], row["hora_hasta"], row["activo"], row["creado"], row["modificado"]));
        return dtoResults;
    }

    findById = async (id) => {
        const row = await this.turnos.findById(id);
        if (!row) return null;
        return new TurnoDTO(row["turno_id"], row["orden"], row["hora_desde"], row["hora_hasta"], row["activo"], row["creado"], row["modificado"]);
    }

    create = async (turno) => {
        const turnoToInsert = {
            ...turno
        }
        return this.turnos.create(turnoToInsert);
    }

    update = async (turno_id, turno) => {
        const row = await this.turnos.findById(turno_id);
        if (!row){
            return null;
        }else{
            const existing = {
                orden: row.orden,
                hora_desde: row.hora_desde,
                hora_hasta: row.hora_hasta
            };
            const turnoToUpdate = {
                ...existing,
                ...turno
            }
            return this.turnos.update(turno_id, turnoToUpdate);
        }
    }
     
    delete = async (turno_id) => {
        const existe = await this.turnos.findById(turno_id);
        if (!existe){
            return "El turno no existe";
        }else{
            const turnoToUpdate = {
            }
            return this.turnos.delete(turno_id, turnoToUpdate);
        }
    }

}