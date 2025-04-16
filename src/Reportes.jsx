import React from "react";
import ReporteVentasTotales from "./ReporteVentasTotales";
import ReporteVentasPorProducto from "./ReporteVentasPorProducto";

function Reportes() {
  return (
    <div>
      <h2 className="reportes-titulo">Reportes</h2>
      <div id="reporte-productos">
        <ReporteVentasPorProducto />
      </div>
      <div id="reporte-totales">
        <ReporteVentasTotales />
      </div>
    </div>
  );
}

export default Reportes;
