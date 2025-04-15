import { useState } from "react";

export default function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Cable 1,5mm²", price: 300, stock: 100 },
    { id: 2, name: "Lámpara LED 10W", price: 1250, stock: 50 },
  ]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Punto de Venta</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>Precio: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => addToCart(product)}
            >
              Agregar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Carrito</h2>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
            <li className="font-bold flex justify-between border-t pt-2">
              <span>Total</span>
              <span>${total}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
