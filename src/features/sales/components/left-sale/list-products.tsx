import { useState } from 'react'
import Paginator from './paginator/paginator'
import HeaderTable from './header-table/header-table'
import BodyTable from './body-table/body-table'


interface Product {
    id: number
    name: string
    category: string
    brand: string
    code: string
    reference: string
    description: string
    shelfUbication: number
    levelUbication: string
    price: number
    cost: number
    stock: number
    minStock: number
    maxStock: number
    status: 'active' | 'inactive'
}

interface ListProductsProps {
    products: Product[]
    
}

export default function ListProducts({ products}: ListProductsProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortField, setSortField] = useState<keyof Product>('id')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [itemsPerPage, setItemsPerPage] = useState(3)
    
    // Ordenamiento
    const sortedProducts = [...products].sort((a, b) => {
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
  




    return (
      <div className="space-y-6">

        {/* Tabla de productos */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <HeaderTable sortField={sortField} sortOrder={sortOrder} setSortField={setSortField} setSortOrder={setSortOrder} setCurrentPage={setCurrentPage} />
              <BodyTable currentProducts={currentProducts} sortField={sortField} sortOrder={sortOrder} />
            </table>
          </div>
          <Paginator 
            sortedProducts={sortedProducts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
          />

        </div>
      </div>
    )
}