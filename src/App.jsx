import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Productos from "./productos"; // 👈 ¡Asegurate que el nombre del archivo tenga la P mayúscula!

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function fetchProductos() {
      const { data, error } = await supabase.from("productos").select("*");
      if (error) {
        console.error("Error al cargar productos:", error);
      } else {
        setProductos(data);
      }
    }

    fetchProductos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Productos</h1>
      <Productos productos={productos} />
    </div>
  );
}

export default App;
