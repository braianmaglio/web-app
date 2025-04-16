import React, { useEffect, useState } from "react";
import supabase from "./supabase";

function Reportes() {
  const [ventasPorProducto, setVentasPorProducto] = useState([]);
  const [ventasTotales, setVentasTotales] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Reporte por producto
    const { data: rptProd, error: error1 } = await supabase.rpc("reporte_ventas_por_producto");
    if (error1) setMensaje("❌ Error cargando ventas por producto");
    else setVentasPorProducto(rptProd);

    // Reporte total
    const { data: rptTotal, error: error2 } = await supabase.rpc("reporte_ventas_totales");
    if (error2) setMensaje("❌ Error cargando ventas totales");
    else setVentasTotales(rptTotal);

    // Historial
    const { data: ventasHist, error: error3 } = await supabase
      .from("ventas")
      .select("fecha, cantidad, total, productos(nombre)")
      .order("fecha", { ascending: false });

    if (error3) setMensaje("❌ Error cargando historial");
    else setHistorial(ventasHist);
  };

  const resetearHistorialCompleto = async () => {
    const { error } = await supabase.from("ventas").delete().neq("id", 0);
    if (!error) {
      setMensaje("✅ Historial reseteado completamente");
      cargarDatos();
    } else {
      setMensaje("❌ Error al resetear todo el historial");
    }
  };

  const resetearVentasDelMes = async () => {
    const primerDiaMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
    const { error } = await supabase
      .from("ventas")
      .delete()
      .gte("fecha", primerDiaMes);

    if (!error) {
      setMensaje("✅ Ventas del mes reseteadas");
      cargarDatos();
    } else {
      setMensaje("❌ Error al resetear ventas del mes");
    }
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Reportes</h2>
      {mensaje && <p className="text-red-600 font-semibold mb-2">{mensaje}</p>}

      {/* Reporte por producto */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🧾 Ventas por Producto</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 mb-4 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Producto</th>
                <th className="p-2 border">Total Vendido</th>
              </tr>
            </thead>
            <tbody>
              {ventasPorProducto.map((venta, i) => (
                <tr key={i} className="text-center">
                  <td className="p-2 border">{venta.nombre}</td>
                  <td className="p-2 border">${venta.total_vendido}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reporte total */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">💰 Ventas Totales por Día</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 mb-4 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Fecha</th>
                <th className="p-2 border">Total Vendido</th>
              </tr>
            </thead>
            <tbody>
              {ventasTotales.map((venta, i) => (
                <tr key={i} className="text-center">
                  <td className="p-2 border">{venta.fecha}</td>
                  <td className="p-2 border">${venta.total_vendido}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Historial */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📜 Historial Completo</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Fecha</th>
                <th className="p-2 border">Producto</th>
                <th className="p-2 border">Cantidad</th>
                <th className="p-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((venta, i) => (
                <tr key={i} className="text-center">
                  <td className="p-2 border">{new Date(venta.fecha).toLocaleDateString()}</td>
                  <td className="p-2 border">{venta.productos?.nombre || "N/A"}</td>
                  <td className="p-2 border">{venta.cantidad}</td>
                  <td className="p-2 border">${venta.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botones */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            onClick={resetearHistorialCompleto}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            🔴 Resetear Todo
          </button>
          <button
            onClick={resetearVentasDelMes}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
          >
            🟡 Resetear Ventas del Mes
          </button>
        </div>
      </section>
    </div>
  );
}

export default Reportes;
