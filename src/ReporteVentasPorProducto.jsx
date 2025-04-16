import React, { useState, useEffect } from "react";
import supabase from "./supabase"; // Asegúrate de tener configurado el supabaseClient correctamente

function ReporteVentasPorProducto() {
  const [reportes, setReportes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchReportes = async () => {
      const { data, error } = await supabase
        .rpc("reporte_ventas_por_producto"); // Este RPC se tiene que crear en Supabase con el SQL de arriba

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
      <h2>Reporte de Ventas por Producto</h2>
      {mensaje && <p>{mensaje}</p>}
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Total Vendido</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte, index) => (
            <tr key={index}>
              <td>{reporte.nombre}</td>
              <td>{reporte.total_vendido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReporteVentasPorProducto;

