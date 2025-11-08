import SalonDTO from '../db/salonDTO.js';
import Salones from '../db/salones.js';

export default class SalonesServicio {
    constructor() {
        this.salones = new Salones();
    }
    fillAll = async (filters,limit, offset, order,asc) => {
        const tableResults = await this.salones.findAll(filters, limit, offset, order, asc);
        const dtoResults = tableResults.map(row => new SalonDTO(row["salon_id"], row["titulo"], row["direccion"], row["latitud"], row["longitud"], row["capacidad"], row["importe"], row["activo"], row["creado"], row["modificado"]));
        return dtoResults;
    }

    findById = async (id) => {
        const row = await this.salones.findById(id);
        if (!row) return null;
        return new SalonDTO(row["salon_id"], row["titulo"], row["direccion"], row["latitud"], row["longitud"], row["capacidad"], row["importe"], row["activo"], row["creado"], row["modificado"]);
    }

    create = async (salon) => {
        const salonToInsert = {
            ...salon
        }
        return this.salones.create(salonToInsert);
    }

    update = async (salon_id, salon) => {
        const row = await this.salones.findById(salon_id);
        if (!row){
            return null;
        }else{
            const existing = {
                titulo: row.titulo,
                direccion: row.direccion,
                latitud: row.latitud,
                longitud: row.longitud,
                capacidad: row.capacidad,
                importe: row.importe,
                activo: row.activo
            };
            const salonToUpdate = {
                ...existing,
                ...salon
            }
            return this.salones.update(salon_id, salonToUpdate);
        }
    }

    delete = async (salon_id) => {
        const existe = await this.salones.findById(salon_id);
        if (!existe){
            return "El salon no existe";
        }else{
            const salonToUpdate = {
            }
            return this.salones.delete(salon_id, salonToUpdate);
        }
    }

}