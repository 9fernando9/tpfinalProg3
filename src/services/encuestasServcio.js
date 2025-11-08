import Encuesta from "../db/encuestas.js";

export default class EncuestasServicio {

    async listar() {
        const encuestas = new Encuesta();
        const rows = await encuestas.listar();
        return rows;
    }

    async guardar({ reserva_id, puntuacion, comentario }) {
        const encuestas = new Encuesta();
        const result = await encuestas.guardar({ reserva_id, puntuacion, comentario });
        return result;
    }
    async buscarId(reserva_id) {
        const encuestas = new Encuesta();
        const result = await encuestas.buscarId(reserva_id);
        return result;
    }
}