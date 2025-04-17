import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import "./estilos.css";
function NuevaVenta() {
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mensaje, setMensaje] = useState("");

  const generarVenta = async () => {
    if (!producto || !cantidad) {
      setMensaje("Completa todos los campos.");
      return;
    }
  
    const cantidadInt = parseInt(cantidad);
  
    // Buscar producto actual
    const { data: datosProducto } = await supabase
      .from("productos")
      .select("*")
      .eq("nombre", producto)
      .single();
  
    if (!datosProducto) {
      setMensaje("Producto no encontrado.");
      return;
    }
  
    if (cantidadInt > datosProducto.stock) {
      setMensaje("No hay suficiente stock.");
      return;
    }
  
    // Registrar venta
    const { data: ventaData, error: ventaError } = await supabase
      .from("ventas")
      .insert([
        {
          fecha: new Date().toISOString(),
          total: cantidadInt * datosProducto.precio,
        }
      ])
      .select();
  
    if (ventaError) {
      setMensaje("❌ Hubo un error al registrar la venta.");
      return;
    }
  
    const ventaId = ventaData[0].id; // Obtener el id de la venta registrada
  
    // Registrar detalle de la venta
    const { error: detalleError } = await supabase
      .from("detalle_ventas")
      .insert([
        {
          venta_id: ventaId,  // Relacionamos el detalle con la venta
          producto_id: datosProducto.id,
          cantidad: cantidadInt,
          precio_unitario: datosProducto.precio,
        }
      ]);
  
    // Actualizar stock
    const { error: stockError } = await supabase
      .from("productos")
      .update({ stock: datosProducto.stock - cantidadInt })
      .eq("id", datosProducto.id);
  
    if (!ventaError && !detalleError && !stockError) {
      setMensaje("✅ Venta registrada exitosamente.");
    } else {
      setMensaje("❌ Hubo un error al guardar la venta.");
    }
  
    setProducto("");
    setCantidad("");
  };
  
  

  return (
    <div className="nuevaVenta-container">
        <div>
        <h2>Nueva Venta</h2>
        <input
          type="text"
          placeholder="Producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button className="genera-venta" onClick={generarVenta}>Generar Venta</button>
        {mensaje && <p>{mensaje}</p>}
      </div>
    </div>
  );

}

export default NuevaVenta;