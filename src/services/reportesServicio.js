import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { stringify } from "csv-stringify/sync";
import Reportes from "../db/reportes.js";

export default class ReportesServicio {
  
  async generarCSV() {
    const reportes = new Reportes();
    const rows = await reportes.buscarDatosCSV();
    if (!rows || rows.length === 0) return null;
    return stringify(rows, { header: true });
  }

  
  async generarPDF() {
    const reportes = new Reportes();
    const rows = await reportes.buscarDatosPDF();
    console.log(rows);
    if (!rows || rows.length === 0) {
        return null;
    }
    const doc = new jsPDF();

     
      doc.setFontSize(16);
      doc.text("Reporte de Reservas", 14, 20);

      doc.setFontSize(10);
      doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, 28);

      
      const columnas = [
        { header: "ID", dataKey: "reserva_id" },
        { header: "Fecha", dataKey: "fecha" },
        { header: "Cliente", dataKey: "cliente" },
        { header: "Salón", dataKey: "salon" },
        { header: "Turno", dataKey: "turno" },
        { header: "Temática", dataKey: "tematica" },
        { header: "Importe Total", dataKey: "importe_total" },
        { header: "Estado", dataKey: "estado" },
      ];

      autoTable(doc, {
        columns: columnas,
        body: rows,
        startY: 35,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [22, 160, 133] },
      });

      
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(
          `Página ${i} de ${pageCount}`,
          doc.internal.pageSize.width - 40,
          doc.internal.pageSize.height - 10
        );
      }
      return doc.output("arraybuffer");
  }


  async obtenerEstadisticas() {
    const reportes = new Reportes();
    const rows = await reportes.buscarDatosEstadistica();
    return rows;
  }

}