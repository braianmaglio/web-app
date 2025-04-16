import './estilos.css';
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div className="inicio-contenedor">
      <h1 className="titulo-principal">Panel de Control</h1>

      <div className="opciones-principales">
        <Link to="/productos" className="opcion-card">
          <span className="icono">📦</span>
          <span>Productos</span>
        </Link>
        <Link to="/ventas" className="opcion-card">
          <span className="icono">💰</span>
          <span>Nueva Venta</span>
        </Link>
        <Link to="/reportes" className="opcion-card">
          <span className="icono">📊</span>
          <span>Reportes</span>
        </Link>
      </div>

      <div className="opcion-secundaria">
        <Link to="/configuracion" className="opcion-card secundaria">
          <span className="icono">⚙️</span>
          <span>Configuración</span>
        </Link>
      </div>
    </div>
  );
}

export default Inicio;