import Productos from './productos'

function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Catálogo de Insumos Eléctricos</h1>
        <Productos />
      </div>
    </main>
  )
}
export default App