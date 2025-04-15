
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Inicio from "./Inicio";
import Productos from "./Productos";
import NuevaVenta from "./NuevaVenta";
import Reportes from "./Reportes";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ventas" element={<NuevaVenta />} />
          <Route path="/reportes" element={<Reportes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
 