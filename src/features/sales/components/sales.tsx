import SearchProduct from "./left-sale/search-product"
import ListProducts from "./left-sale/list-products"
import { mockProducts } from "../../products/services/mock-products"
import { useState } from "react"
import SalesSummary from "./right-sale/sales-summary"

interface SearchFilters {
  searchTerm: string
  categories: string[]
  brands: string[]
  status: string | null
  stockStatus: string | null
}

export default function Sales() {
  // Estado de productos y filtros
  const [products] = useState(mockProducts)
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    categories: [],
    brands: [],
    status: null,
    stockStatus: null
  })

  // Función de filtrado
  const filterProducts = (products: any[], filters: SearchFilters): any[] => {
    return products.filter(product => {
      // Filtro por término de búsqueda
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase()
        const matchesSearch = (
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.code.toLowerCase().includes(searchTerm) ||
          product.reference.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)
        )
        if (!matchesSearch) return false
      }

      // Filtro por categorías
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(product.category)) return false
      }

      // Filtro por marcas
      if (filters.brands.length > 0) {
        if (!filters.brands.includes(product.brand)) return false
      }

      // Filtro por estado
      if (filters.status) {
        if (filters.status === 'active' && product.status !== 'active') return false
        if (filters.status === 'inactive' && product.status !== 'inactive') return false
      }

      // Filtro por estado de stock
      if (filters.stockStatus) {
        switch (filters.stockStatus) {
          case 'in-stock':
            if (product.stock <= 10) return false
            break
          case 'low-stock':
            if (product.stock === 0 || product.stock > 10) return false
            break
          case 'out-of-stock':
            if (product.stock > 0) return false
            break
        }
      }

      return true
    })
  }

  // Aplicar filtros
  const filteredProducts = filterProducts(products, filters)

  // Manejar cambios en filtros
  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      
      {/* Columna izquierda - Detalles de la venta */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6 col-span-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center justify-between w-full">
            <div className="items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Detalles de la venta
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Encuentra productos por código, referencia o descripción
              </p>
            </div>
          </div>
        </div>

        {/* Búsqueda General */}
        <div className="mb-6">
          <div className= "mt-4 flex flex-col gap-4">
            <SearchProduct onFiltersChange={handleFiltersChange} />
            <ListProducts products={filteredProducts} />  
          </div>
        </div>
      </div>

      {/* Columna derecha - Datos del comprobante */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6 col-span-1">
        <SalesSummary />
      </div>

    </div>
  )
}