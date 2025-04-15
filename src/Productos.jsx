// src/Productos.jsx
import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export default function productos() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    async function fetchProductos() {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('creado_en', { ascending: false })

      if (error) console.error('Error cargando productos:', error)
      else setProductos(data)
    }

    fetchProductos()
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Productos</h2>
      <ul className="grid gap-4 md:grid-cols-2">
        {productos.map((producto) => (
          <li key={producto.id} className="border p-4 rounded-xl shadow">
            <h3 className="font-semibold">{producto.nombre}</h3>
            <p>💲 {producto.precio}</p>
            <p>📦 Stock: {producto.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
