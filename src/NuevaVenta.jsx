// Dentro de NuevaVenta.jsx
import React, { useState, useEffect } from "react";
import supabase from "./supabase";

function NuevaVenta() {
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase.from("productos").select("*");
      if (!error) setProductos(data);
    };
    fetchProductos();
  }, []);

  const generarVenta = async () => {
    try {
      if (!producto || !cantidad) {
        setMensaje("Completa todos los campos.");
        return;
      }
  
      const cantidadInt = parseInt(cantidad);
      const { data: datosProducto, error: errorProducto } = await supabase
        .from("productos")
        .select("*")
        .eq("nombre", producto)
        .single();
  
      if (errorProducto || !datosProducto) {
        console.error("Error buscando producto:", errorProducto);
        setMensaje("Producto no encontrado.");
        return;
      }
  
      if (cantidadInt > datosProducto.stock) {
        setMensaje("No hay suficiente stock.");
        return;
      }
  
      // Generar la venta
      const detalleVenta = {
        producto_id: datosProducto.id,
        nombre: datosProducto.nombre,
        cantidad: cantidadInt,
        precio_unitario: datosProducto.precio
      };
      
      const { error: ventaError } = await supabase.from("ventas").insert({
        total: cantidadInt * datosProducto.precio,
        fecha: new Date().toISOString(),
        detalle: detalleVenta
      });
      
  
      // Actualizar stock
      const { error: stockError } = await supabase
        .from("productos")
        .update({ stock: datosProducto.stock - cantidadInt })
        .eq("id", datosProducto.id);
  
      if (ventaError || stockError) {
        console.error("Error en venta o actualización:", ventaError, stockError);
        setMensaje("Hubo un error al guardar la venta.");
        return;
      }
  
      setMensaje("✅ Venta registrada exitosamente.");
      setProducto("");
      setCantidad("");
    } catch (err) {
      console.error("Error general al generar venta:", err);
      setMensaje("Error inesperado.");
    }
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Nueva Venta</h2>

      {mensaje && <p className="mb-4 text-red-500">{mensaje}</p>}

      <input
        type="text"
        placeholder="Producto"
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={generarVenta}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generar Venta
      </button>

      <h3 className="mt-6 text-lg font-semibold">Productos Disponibles</h3>
      <table className="w-full border mt-2">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">{p.nombre}</td>
              <td className="p-2 border">${p.precio}</td>
              <td className="p-2 border">{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NuevaVenta;
