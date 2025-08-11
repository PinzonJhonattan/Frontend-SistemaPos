import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import SearchProduct from '../search-products/search-product'

interface SearchFilters {
  searchTerm: string
  categories: string[]
  brands: string[]
  status: string | null
  stockStatus: string | null
}

export default function ProductTable() {

    interface Product {
        id: number
        name: string
        category: string
        brand: string // Agregado para los filtros
        price: number
        stock: number
        status: 'active' | 'inactive'
        description?: string // Agregado para la búsqueda
    }

    const mockProducts: Product[] = [
        { id: 1, name: 'Laptop HP Pavilion 15', category: 'Electrónicos', brand: 'HP', price: 899.99, stock: 21, status: 'active', description: 'Laptop potente para trabajo y entretenimiento' },
        { id: 2, name: 'Mouse Inalámbrico Logitech', category: 'Accesorios', brand: 'Logitech', price: 29.99, stock: 5, status: 'active', description: 'Mouse ergonómico inalámbrico' },
        { id: 3, name: 'Teclado Mecánico RGB', category: 'Accesorios', brand: 'Logitech', price: 89.99, stock: 26, status: 'active', description: 'Teclado mecánico con iluminación RGB' },
        { id: 4, name: 'Monitor 24" Samsung', category: 'Electrónicos', brand: 'Samsung', price: 199.99, stock: 9, status: 'inactive', description: 'Monitor Full HD de 24 pulgadas' },
        { id: 5, name: 'Auriculares Sony WH-1000XM4', category: 'Audio', brand: 'Sony', price: 299.99, stock: 12, status: 'active', description: 'Auriculares con cancelación de ruido' },
        { id: 6, name: 'Webcam Logitech C920', category: 'Accesorios', brand: 'Logitech', price: 79.99, stock: 0, status: 'active', description: 'Webcam HD para videoconferencias' },
        { id: 7, name: 'SSD Samsung 500GB', category: 'Almacenamiento', brand: 'Samsung', price: 119.99, stock: 30, status: 'active', description: 'Disco sólido de alta velocidad' },
        { id: 8, name: 'Router TP-Link AC1200', category: 'Redes', brand: 'TP-Link', price: 89.99, stock: 6, status: 'active', description: 'Router inalámbrico de doble banda' },
        { id: 9, name: 'Tablet iPad Air', category: 'Electrónicos', brand: 'Apple', price: 599.99, stock: 17, status: 'active', description: 'Tablet premium con pantalla Retina' },
        { id: 10, name: 'Impresora HP LaserJet', category: 'Oficina', brand: 'HP', price: 149.99, stock: 15, status: 'active', description: 'Impresora láser monocromática' },
        { id: 11, name: 'Smartphone Samsung Galaxy', category: 'Electrónicos', brand: 'Samsung', price: 749.99, stock: 22, status: 'active', description: 'Smartphone Android de gama alta' },
        { id: 12, name: 'Disco Duro Externo 1TB', category: 'Almacenamiento', brand: 'Samsung', price: 89.99, stock: 18, status: 'active', description: 'Almacenamiento portátil de 1TB' },
        { id: 13, name: 'Cámara Canon EOS', category: 'Fotografía', brand: 'Canon', price: 1299.99, stock: 4, status: 'active', description: 'Cámara réflex profesional' },
        { id: 14, name: 'Speakers Bluetooth JBL', category: 'Audio', brand: 'JBL', price: 129.99, stock: 14, status: 'active', description: 'Altavoces inalámbricos portátiles' },
        { id: 15, name: 'Power Bank 20000mAh', category: 'Accesorios', brand: 'Samsung', price: 39.99, stock: 0, status: 'inactive', description: 'Batería externa de alta capacidad' },
    ]

    const [products] = useState<Product[]>(mockProducts)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortField, setSortField] = useState<keyof Product>('id')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [itemsPerPage, setItemsPerPage] = useState(8)
    
    // Estado para los filtros
    const [filters, setFilters] = useState<SearchFilters>({
        searchTerm: '',
        categories: [],
        brands: [],
        status: null,
        stockStatus: null
    })

    const itemsPerPageOptions = [
        { label: '5', value: 5 },
        { label: '8', value: 8 },
        { label: '10', value: 10 },
        { label: '15', value: 15 },
        { label: '20', value: 20 },
    ]

    // Función para manejar cambios en los filtros
    const handleFiltersChange = (newFilters: SearchFilters) => {
        setFilters(newFilters)
        setCurrentPage(1) // Resetear a página 1 cuando cambien los filtros
    }

    // Función de filtrado
    const filterProducts = (products: Product[], filters: SearchFilters): Product[] => {
        return products.filter(product => {
            // Filtro por término de búsqueda
            if (filters.searchTerm) {
                const searchTerm = filters.searchTerm.toLowerCase()
                const matchesSearch = (
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description?.toLowerCase().includes(searchTerm) ||
                    `PRD-${product.id.toString().padStart(4, '0')}`.toLowerCase().includes(searchTerm) ||
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

    // Ordenamiento
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })
  
    // Paginación
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentProducts = sortedProducts.slice(startIndex, endIndex)
  
    const handleSort = (field: keyof Product) => {
      if (sortField === field) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
      } else {
        setSortField(field)
        setSortOrder('asc')
      }
      setCurrentPage(1) // Resetear a página 1 al ordenar
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
      setItemsPerPage(newItemsPerPage)
      setCurrentPage(1) // Resetear a página 1 al cambiar items por página
    }
  
    const StatusBadge = ({ status, stock }: { status: 'active' | 'inactive'; stock: number }) => {
      if (stock === 0) {
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5"></div>
            Sin Stock
          </span>
        )
      }
      
      if (status === 'active') {
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
            Activo
          </span>
        )
      }
      
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></div>
          Inactivo
        </span>
      )
    }
  
    const StockIndicator = ({ stock }: { stock: number }) => {
      let colorClass = 'text-emerald-600 bg-emerald-50'
      
      if (stock === 0) {
        colorClass = 'text-red-600 bg-red-50'
      } else if (stock <= 10) {
        colorClass = 'text-amber-600 bg-amber-50'
      }
  
      return (
        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${colorClass}`}>
          {stock}
        </span>
      )
    }
  
    const SortIcon = ({ field }: { field: keyof Product }) => {
      if (sortField !== field) {
        return <i className="pi pi-sort text-gray-400 ml-1"></i>
      }
      
      return (
        <i className={`ml-1 ${
          sortOrder === 'asc' 
            ? 'pi pi-sort-up text-blue-500' 
            : 'pi pi-sort-down text-blue-500'
        }`}></i>
      )
    }

    // Generar números de página inteligentes
    const getPageNumbers = () => {
      const delta = 2
      const range = []
      const rangeWithDots = []

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i)
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...')
      } else {
        rangeWithDots.push(1)
      }

      rangeWithDots.push(...range)

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages)
      } else {
        rangeWithDots.push(totalPages)
      }

      return rangeWithDots
    }

    // Verificar si hay filtros activos
    const hasActiveFilters = filters.searchTerm || 
                            filters.categories.length > 0 || 
                            filters.brands.length > 0 || 
                            filters.status || 
                            filters.stockStatus
  
    return (
      <div className="space-y-6">
        {/* Componente de filtros */}
        <SearchProduct onFiltersChange={handleFiltersChange} />

        {/* Resultados de búsqueda */}
        {hasActiveFilters && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <i className="pi pi-search text-blue-600 mr-2"></i>
                <span className="text-blue-800 font-medium">
                  {filteredProducts.length === 0 
                    ? 'No se encontraron productos' 
                    : `${filteredProducts.length} producto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`
                  }
                </span>
              </div>
              {filteredProducts.length === 0 && (
                <span className="text-blue-600 text-sm">
                  Intenta ajustar los filtros de búsqueda
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tabla de productos */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header de la tabla */}
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      ID
                      <SortIcon field="id" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Producto
                      <SortIcon field="name" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('category')}
                  >
                    <div className="flex items-center">
                      Categoría
                      <SortIcon field="category" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('brand')}
                  >
                    <div className="flex items-center">
                      Marca
                      <SortIcon field="brand" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center justify-end">
                      Precio
                      <SortIcon field="price" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('stock')}
                  >
                    <div className="flex items-center justify-center">
                      Stock
                      <SortIcon field="stock" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
    
              {/* Cuerpo de la tabla */}
              <tbody className="bg-white divide-y divide-gray-100">
                {currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <i className="pi pi-search text-gray-400 text-4xl mb-4"></i>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No se encontraron productos
                        </h3>
                        <p className="text-gray-500">
                          {hasActiveFilters 
                            ? 'Intenta ajustar los filtros de búsqueda'
                            : 'No hay productos disponibles'
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((product, index) => (
                    <tr 
                      key={product.id} 
                      className="hover:bg-gray-50 transition-colors duration-150 group"
                    >
                      {/* ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 text-sm font-medium">
                            {product.id}
                          </div>
                        </div>
                      </td>
        
                      {/* Producto */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">SKU: PRD-{product.id.toString().padStart(4, '0')}</div>
                          </div>
                        </div>
                      </td>
        
                      {/* Categoría */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          {product.category}
                        </span>
                      </td>

                      {/* Marca */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                          {product.brand}
                        </span>
                      </td>
        
                      {/* Precio */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </div>
                      </td>
        
                      {/* Stock */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <StockIndicator stock={product.stock} />
                      </td>
        
                      {/* Estado */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <StatusBadge status={product.status} stock={product.stock} />
                      </td>
        
                      {/* Acciones */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1 group-hover:opacity-100 transition-opacity duration-200">
                          <Button 
                            icon="pi pi-pencil" 
                            size="small" 
                            text
                            className="text-gray-600 hover:text-green-600 hover:bg-green-50 w-8 h-8 rounded-lg"
                            tooltip="Editar"
                            onClick={() => console.log('Editar producto:', product.id)}
                          />
                          <Button 
                            icon="pi pi-trash" 
                            size="small" 
                            text
                            className="text-gray-600 hover:text-red-600 hover:bg-red-50 w-8 h-8 rounded-lg"
                            tooltip="Eliminar"
                            onClick={() => console.log('Eliminar producto:', product.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
    
          {/* Paginación */}
          {filteredProducts.length > 0 && (
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                
                {/* Selector de items por página */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm">Mostrar:</span>
                    <Dropdown
                        value={itemsPerPage}
                        options={itemsPerPageOptions}
                        onChange={(e) => handleItemsPerPageChange(e.value)}
                        className="w-40 text-sm"
                        panelClassName="text-sm"
                    />
                </div>
                
                <div className="text-sm text-gray-700">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length} productos
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Botón anterior */}
                  <Button
                    icon="pi pi-chevron-left"
                    size="small"
                    text
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="w-8 h-8 rounded-lg disabled:opacity-50 hover:bg-gray-200"
                  />
                  
                  {/* Números de página inteligentes */}
                  {totalPages <= 7 ? (
                    // Si hay pocas páginas, mostrar todas
                    Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        label={page.toString()}
                        size="small"
                        text={currentPage !== page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg ${
                          currentPage === page 
                            ? 'bg-blue-500 text-white' 
                            : 'hover:bg-gray-200 text-gray-700'
                        }`}
                      />
                    ))
                  ) : (
                    // Si hay muchas páginas, mostrar con puntos suspensivos
                    getPageNumbers().map((page, index) => (
                      <span key={index}>
                        {page === '...' ? (
                          <span className="px-2 text-gray-500">...</span>
                        ) : (
                          <Button
                            label={page.toString()}
                            size="small"
                            text={currentPage !== page}
                            onClick={() => setCurrentPage(Number(page))}
                            className={`w-8 h-8 rounded-lg ${
                              currentPage === page 
                                ? 'bg-blue-500 text-white' 
                                : 'hover:bg-gray-200 text-gray-700'
                            }`}
                          />
                        )}
                      </span>
                    ))
                  )}
                  
                  {/* Botón siguiente */}
                  <Button
                    icon="pi pi-chevron-right"
                    size="small"
                    text
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="w-8 h-8 rounded-lg disabled:opacity-50 hover:bg-gray-200"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
}