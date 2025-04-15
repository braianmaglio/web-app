// src/NuevaVenta.jsx
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export default function NuevaVenta() {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    async function cargarProductos() {
      const { data } = await supabase.from("productos").select("*");
      setProductos(data);
    }
    cargarProductos();
  }, []);

  const agregarProducto = (producto) => {
    const existente = seleccionados.find((p) => p.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
      setSeleccionados([...seleccionados]);
    } else {
      setSeleccionados([...seleccionados, { ...producto, cantidad: 1 }]);
    }
  };

  const calcularTotal = () =>
    seleccionados.reduce(
      (total, prod) => total + prod.precio * prod.cantidad,
      0
    );

  const guardarVenta = async () => {
    const total = calcularTotal();
    const detalle = seleccionados.map(({ id, nombre, precio, cantidad }) => ({
      id,
      nombre,
      precio,
      cantidad,
    }));

    await supabase.from("ventas").insert([{ total, detalle }]);
    setSeleccionados([]);
    alert("Venta registrada");
  };

  return (
    <div>
      <h2>Nueva Venta</h2>

      <h4>Productos disponibles:</h4>
      <table className="table-auto w-full text-left border">
      <tbody>
        {productos.map((p) => (
          <tr key={p.id}>
            <td className="p-2 border">{p.nombre}</td>
            <td className="p-2 border">{p.precio}</td>
               
            <td className="p-2 border"><button onClick={() => agregarProducto(p)}>Agregar</button></td>
          </tr>
        ))}
      </tbody>

      <h4>Detalle de la venta:</h4>
      <ul>
        {seleccionados.map((p) => (
          <li key={p.id}>
            {p.nombre} x{p.cantidad} = ${p.precio * p.cantidad}
          </li>
        ))}
      </ul>
      </table>

      <p><strong>Total:</strong> ${calcularTotal()}</p>
      <button onClick={guardarVenta}>Guardar Venta</button>
    </div>
  );
}
