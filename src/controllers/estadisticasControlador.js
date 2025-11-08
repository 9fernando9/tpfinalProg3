import EstadiscasServicio from "../services/estadisticasServicio.js";

export default class EstadisticasControlador {
    constructor() {
        this.estadisticasServicio = new EstadiscasServicio();
    }

    generarEstadisticaProcedure = async(req, res) => {
      try {
    const datos = await this.estadisticasServicio.obtenerEstadisticas();
    res.status(200).json({
      status: true,
      data: datos
    });
    
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al generar la estadistica.",
      error: error.message
    });
  }
  }
}
