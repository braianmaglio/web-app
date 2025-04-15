// src/Reportes.jsx
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Reportes() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    async function cargarVentas() {
      const { data } = await supabase.from("ventas").select("*").order("fecha", { ascending: false });
      setVentas(data);
    }
    cargarVentas();
  }, []);

  return (
    <div>
      <h2>Reporte de Ventas</h2>
      {ventas.map((venta) => (
        <div key={venta.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleString()}</p>
          <p><strong>Total:</strong> ${venta.total}</p>
          <ul>
            {venta.detalle.map((item, index) => (
              <li key={index}>
                {item.nombre} x{item.cantidad} = ${item.precio * item.cantidad}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
