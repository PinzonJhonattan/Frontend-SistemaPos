import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { MultiSelect } from "primereact/multiselect"
import { Button } from "primereact/button"
import { useState } from "react"

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
  
  // Estado de los filtros
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    categories: [],
    brands: [],
    status: null,
    stockStatus: null
  })

  // Opciones de categorías (basadas en los productos mock)
  const categoryOptions = [
    { label: 'Electrónicos', value: 'Electrónicos' },
    { label: 'Accesorios', value: 'Accesorios' },
    { label: 'Audio', value: 'Audio' },
    { label: 'Almacenamiento', value: 'Almacenamiento' },
    { label: 'Redes', value: 'Redes' },
    { label: 'Oficina', value: 'Oficina' },
    { label: 'Fotografía', value: 'Fotografía' },
    { label: 'Componentes', value: 'Componentes' }
  ]

  // Opciones de marcas (agregando marcas basadas en los productos)
  const brandOptions = [
    { label: 'HP', value: 'HP' },
    { label: 'Logitech', value: 'Logitech' },
    { label: 'Samsung', value: 'Samsung' },
    { label: 'Sony', value: 'Sony' },
    { label: 'Canon', value: 'Canon' },
    { label: 'JBL', value: 'JBL' },
    { label: 'TP-Link', value: 'TP-Link' },
    { label: 'Apple', value: 'Apple' },
  ]

  // Opciones de estado
  const statusOptions = [
    { label: 'Activo', value: 'active' },
    { label: 'Inactivo', value: 'inactive' }
  ]

  // Opciones de estado de stock
  const stockStatusOptions = [
    { label: 'En Stock', value: 'in-stock' },
    { label: 'Stock Bajo (≤10)', value: 'low-stock' },
    { label: 'Sin Stock', value: 'out-of-stock' }
  ]

  // Función para actualizar filtros
  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange?.(updatedFilters)
  }

  // Limpiar todos los filtros
  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      searchTerm: '',
      categories: [],
      brands: [],
      status: null,
      stockStatus: null
    }
    setFilters(clearedFilters)
    onFiltersChange?.(clearedFilters)
  }

  // Verificar si hay filtros activos
  const hasActiveFilters = filters.searchTerm || 
                          filters.categories.length > 0 || 
                          filters.brands.length > 0 || 
                          filters.status || 
                          filters.stockStatus

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Búsqueda y Filtros</h3>
          <p className="text-sm text-gray-600 mt-1">
            Encuentra productos por código, referencia o descripción
          </p>
        </div>
        
        {hasActiveFilters && (
          <Button 
            label="Limpiar Filtros"
            icon="pi pi-times"
            size="small"
            text
            className="text-gray-600 hover:text-red-600"
            onClick={clearFilters}
          />
        )}
      </div>

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
          <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      {/* Filtros en Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Filtro por Categorías */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="pi pi-tags mr-2"></i>
            Categorías
          </label>
          <MultiSelect
            value={filters.categories}
            options={categoryOptions}
            onChange={(e) => updateFilters({ categories: e.value })}
            placeholder="Seleccionar categorías"
            className="w-full"
            display="chip"
            maxSelectedLabels={2}
            selectedItemsLabel="{0} categorías seleccionadas"
          />
        </div>

        {/* Filtro por Marcas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="pi pi-bookmark mr-2"></i>
            Marcas
          </label>
          <MultiSelect
            value={filters.brands}
            options={brandOptions}
            onChange={(e) => updateFilters({ brands: e.value })}
            placeholder="Seleccionar marcas"
            className="w-full"
            display="chip"
            maxSelectedLabels={2}
            selectedItemsLabel="{0} marcas seleccionadas"
          />
        </div>

        {/* Filtro por Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="pi pi-circle mr-2"></i>
            Estado
          </label>
          <Dropdown
            value={filters.status}
            options={statusOptions}
            onChange={(e) => updateFilters({ status: e.value })}
            placeholder="Todos los estados"
            className="w-full"
            showClear
          />
        </div>

        {/* Filtro por Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="pi pi-box mr-2"></i>
            Stock
          </label>
          <Dropdown
            value={filters.stockStatus}
            options={stockStatusOptions}
            onChange={(e) => updateFilters({ stockStatus: e.value })}
            placeholder="Todos los stocks"
            className="w-full"
            showClear
          />
        </div>
      </div>

      {/* Resumen de filtros activos */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-600">Filtros activos:</span>
            
            {filters.searchTerm && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <i className="pi pi-search mr-1"></i>
                "{filters.searchTerm}"
              </span>
            )}
            
            {filters.categories.map(category => (
              <span key={category} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <i className="pi pi-tags mr-1"></i>
                {category}
              </span>
            ))}
            
            {filters.brands.map(brand => (
              <span key={brand} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <i className="pi pi-bookmark mr-1"></i>
                {brand}
              </span>
            ))}
            
            {filters.status && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <i className="pi pi-circle mr-1"></i>
                {statusOptions.find(s => s.value === filters.status)?.label}
              </span>
            )}
            
            {filters.stockStatus && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                <i className="pi pi-box mr-1"></i>
                {stockStatusOptions.find(s => s.value === filters.stockStatus)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}