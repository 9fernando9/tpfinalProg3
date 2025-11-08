import Comentarios from "../db/comentarios.js";

export default class ComentariosServicio {

    async listar() {
        const comentarios = new Comentarios();
        const rows = await comentarios.listar();
        return rows;
    }

    async guardar({ reserva_id, usuario_id, comentario }) {
        const comentarios = new Comentarios();
        const result = await comentarios.guardar({ reserva_id, usuario_id, comentario });
        return result;
    }
    async buscarId(reserva_id) {
        const comentarios = new Comentarios();
        const result = await comentarios.buscarId(reserva_id);
        return result;
    }

    async delete(comentario_id) {
        const comentarios = new Comentarios();
        const result = await comentarios.delete(comentario_id);
        return result;
    }
}