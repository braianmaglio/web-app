
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/ventas">Nueva Venta</Link></li>
        <li><Link to="/reportes">Reportes</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
