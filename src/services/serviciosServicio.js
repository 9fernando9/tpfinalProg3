import servicioDTO from '../db/servicioDTO.js';
import servicios from '../db/servicios.js';

export default class serviciosServicio {
    constructor() {
        this.servicios = new servicios();
    }
    fillAll = async (filters,limit, offset, order,asc) => {
        const tableResults = await this.servicios.findAll(filters, limit, offset, order, asc);
        const dtoResults = tableResults.map(row => new servicioDTO(row["servicio_id"],row["descripcion"],row["importe"],row["importe"],row["activo"],row["creado"],row["modificado"]));
        return dtoResults;
    }

    findById = async (id) => {
        const row = await this.servicios.findById(id);
        if (!row) return null;
        return new servicioDTO(row["servicio_id"], row["descripcion"], row["importe"], row["activo"], row["creado"], row["modificado"]);
    }

    create = async (servicio) => {
        const servicioToInsert = {
            ...servicio
        }
        return this.servicios.create(servicioToInsert);
    }

    update = async (servicio_id, servicio) => {
        const row = await this.servicios.findById(servicio_id);
        if (!row){
            return null;
        }else{
            const existing = {
                descripcion: row.descripcion,
                importe: row.importe,
                activo: row.activo
            };
            const servicioToUpdate = {
                ...existing,
                ...servicio
            }
            return this.servicios.update(servicio_id, servicioToUpdate);
        }
    }
     
    delete = async (servicio_id) => {
        const existe = await this.servicios.findById(servicio_id);
        if (!existe){
            return "El servicio no existe";
        }else{
            const servicioToUpdate = {
            }
            return this.servicios.delete(servicio_id, servicioToUpdate);
        }
    }

}