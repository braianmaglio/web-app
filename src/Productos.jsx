// src/Productos.jsx
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./estilos.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nombre: "", precio: "", stock: "" });
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", precio: "", stock: "" });

  async function cargarProductos() {
    const { data } = await supabase.from("productos").select("*");
    setProductos(data);
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  const eliminarProducto = async (id) => {
    const confirmacion = confirm("¿Estás seguro que querés eliminar este producto?");
    if (!confirmacion) return;

    await supabase.from("productos").delete().eq("id", id);
    await cargarProductos();
  };

  const iniciarEdicion = (producto) => {
    setEditando(producto.id);
    setForm({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
    });
  };

  const guardarCambios = async () => {
    await supabase.from("productos").update(form).eq("id", editando);
    setEditando(null);
    await cargarProductos();
  };

  const cancelarEdicion = () => {
    setEditando(null);
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Función para agregar un nuevo producto
  const agregarProducto = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.stock) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const { data, error } = await supabase.from("productos").insert([
      { nombre: nuevoProducto.nombre, precio: nuevoProducto.precio, stock: nuevoProducto.stock },
    ]);

    if (error) {
      console.error("Error al agregar producto:", error);
    } else {
      setNuevoProducto({ nombre: "", precio: "", stock: "" });  // Limpiar el formulario
      await cargarProductos();  // Recargar los productos
    }
  };

  return (
    <div className="productos-container">
      <h2>Lista de Productos</h2>
    
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />

     
 
      {/* Tabla de productos */}
      <table className="productos-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.id}>
              {editando === producto.id ? (
                <>
                  <td>
                    <input
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      placeholder="Nombre"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={form.precio}
                      onChange={(e) => setForm({ ...form, precio: e.target.value })}
                      placeholder="Precio"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: e.target.value })}
                      placeholder="Stock"
                    />
                  </td>
                  <td>
                    <button onClick={guardarCambios}>💾 Guardar</button>
                    <button onClick={cancelarEdicion}>❌ Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.stock}</td>
                  <td>
                    <button onClick={() => iniciarEdicion(producto)}>✏️ Editar</button>
                    <button onClick={() => eliminarProducto(producto.id)}>🗑️ Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para agregar un nuevo producto */}
      <div className="form-agregar">
        <h3>Agregar Producto</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={nuevoProducto.stock}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
        />
        <button onClick={agregarProducto}>🆕 Agregar Producto</button>
      </div>
    </div>
  );
}
