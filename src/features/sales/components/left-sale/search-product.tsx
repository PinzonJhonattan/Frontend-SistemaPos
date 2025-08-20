import { InputText } from "primereact/inputtext"
import { useState } from "react"
import { mockProducts } from "../../../products/services/mock-products"

interface SearchFilters {
  searchTerm: string
  categories: string[]
  brands: string[]
  status: string | null
  stockStatus: string | null
}

interface SearchProductProps {
  onFiltersChange?: (filters: SearchFilters) => void
}

export default function SearchProduct({ onFiltersChange }: SearchProductProps) {
  // Estado local de los filtros
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    categories: [],
    brands: [],
    status: null,
    stockStatus: null
  })

  // Función para actualizar filtros
  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange?.(updatedFilters)
  }

  return (
    <div>
      <div>
        {/* Búsqueda General */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="pi pi-search mr-2"></i>
            Búsqueda General
          </label>

          <div className="relative">
            <InputText 
              value={filters.searchTerm}
              onChange={(e) => updateFilters({ searchTerm: e.target.value })}
              placeholder="Buscar por código, referencia, descripción..." 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Resumen de filtros activos */}
        {filters.searchTerm && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600">
                Filtros activos:
              </span>
              
              {filters.searchTerm && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <i className="pi pi-search mr-1"></i>
                  "{filters.searchTerm}"
                </span>
              )}

              {filters.categories.map((category) => (
                <span key={category} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <i className="pi pi-tag mr-1"></i>
                  {category}
                </span>
              ))}

              {filters.brands.map((brand) => (
                <span key={brand} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <i className="pi pi-bookmark mr-1"></i>
                  {brand}
                </span>
              ))}

              {filters.status && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <i className="pi pi-circle mr-1"></i>
                  {filters.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
              )}

              {filters.stockStatus && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <i className="pi pi-box mr-1"></i>
                  {filters.stockStatus === 'in-stock' ? 'En Stock' : 
                   filters.stockStatus === 'low-stock' ? 'Stock Bajo' : 'Sin Stock'}
                </span>
              )}
            </div>
          </div>
        )}
        {/* Información de resultados */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando {mockProducts.length} de {mockProducts.length} productos
        </div>
      </div>
    </div>
  )
}