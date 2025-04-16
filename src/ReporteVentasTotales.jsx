import React, { useState, useEffect } from "react";
import supabase from "./supabase"; // Asegúrate de tener configurado el supabaseClient correctamente

function ReporteVentasTotales() {
  const [reportes, setReportes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchReportes = async () => {
      const { data, error } = await supabase
        .rpc("reporte_ventas_totales"); // Este RPC se tiene que crear en Supabase con el SQL de arriba

      if (error) {
        setMensaje("Error al cargar los reportes");
        return;
      }

      setReportes(data);
    };

    fetchReportes();
  }, []);

  return (
    <div className="reporte-container">
      <h2>Reporte de Ventas Totales</h2>
      {mensaje && <p>{mensaje}</p>}
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Total Vendido</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte, index) => (
            <tr key={index}>
              <td>{reporte.fecha}</td>
              <td>{reporte.total_vendido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReporteVentasTotales;
