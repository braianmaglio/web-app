import { useEffect, useState } from "react";
import { supabase } from "./supabase";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const fetchProductos = async () => {
    const { data, error } = await supabase.from("productos").select("*");
    if (error) {
      console.error("Error al cargar productos:", error);
    } else {
      setProductos(data);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleAgregar = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !stock) {
      alert("Completá todos los campos.");
      return;
    }

    const { error } = await supabase.from("productos").insert([
      {
        nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock),
      },
    ]);

    if (error) {
      alert("Error al guardar producto.");
      console.error(error);
    } else {
      setNombre("");
      setPrecio("");
      setStock("");
      fetchProductos(); // actualiza la lista
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 font-bold">Agregar Producto</h2>
      <form onSubmit={handleAgregar} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </form>

      <h2 className="text-xl mb-2 font-bold">Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos cargados.</p>
      ) : (
        <table className="table-auto w-full text-left border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td className="p-2 border">{producto.nombre}</td>
                <td className="p-2 border">${producto.precio}</td>
                <td className="p-2 border">{producto.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Productos;
