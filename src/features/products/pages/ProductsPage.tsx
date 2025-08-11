import Products from '../components/products/products'

export default function ProductsPage() {
  console.log('ProductsPage renderizado!')
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-theme-primary">Gestión de Productos</h1>
        <p className="text-theme-muted mt-2">Administra tu inventario de productos</p>
      </div>
      
      <Products />
    </div>
  )
}
