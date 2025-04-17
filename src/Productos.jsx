import React, { useState, useEffect } from "react";
import supabase from "./supabase";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [orden, setOrden] = useState("nombre");
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      const { data } = await supabase
        .from("productos")
        .select("*")
        .ilike("nombre", `%${filtro}%`)
        .order(orden, { ascending: true });

      setProductos(data || []);
    };

    fetchProductos();
  }, [orden, filtro]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border p-2 w-full sm:w-1/2"
        />

        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="border p-2"
        >
          <option value="nombre">Ordenar por nombre</option>
          <option value="precio">Ordenar por precio</option>
          <option value="stock">Ordenar por stock</option>
        </select>
      </div>

      <table className="w-full border">
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

export default Productos;
