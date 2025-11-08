import ReportesServicio from "../services/reportesServicio.js";

export default class ReportesControlador {
    constructor() {
        this.reportesServicio = new ReportesServicio();
    }

    generarReportePDF = async(req, res) => {
      try {
    const pdfBuffer = await this.reportesServicio.generarPDF();
    console.log("aaaaaaa");
    console.log(pdfBuffer);
    if (!pdfBuffer) {
      return res.status(404).json({
        status: false,
        message: "No se encontraron datos para generar el reporte PDF."
      });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=reporte_reservas.pdf");
    res.status(200).send(Buffer.from(pdfBuffer)); // 🔥 Enviar binario
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al generar el reporte PDF.",
      error: error.message
    });
  }
  }
  generarReporteCSV = async(req, res) => {
    try {
    const csvData = await this.reportesServicio.generarCSV();
    if (!csvData) {
      return res.status(404).json({
        status: false,
        message: "No se encontraron datos para generar el reporte CSV."
      });
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=reporte_reservas.csv");
    res.status(200).send(csvData);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al generar el reporte CSV.",
      error: error.message
    });
  }
  }


getEstadisticas = async (req, res) => {
  try {
    const data = await this.reportesServicio.obtenerEstadisticas();

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No hay datos suficientes para generar estadísticas."
      });
    }

    res.status(200).json({
      status: true,
      data
    });
  } catch (error) {
    console.error(" Error al obtener estadísticas:", error);
    res.status(500).json({
      status: false,
      message: "Error al obtener estadísticas.",
      error: error.message
    });
  }
}
}