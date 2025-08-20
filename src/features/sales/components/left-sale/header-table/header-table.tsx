
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

interface HeaderTableProps {
    sortField: keyof Product
    sortOrder: 'asc' | 'desc'
    setSortField: (field: keyof Product) => void
    setSortOrder: (order: 'asc' | 'desc') => void
    setCurrentPage: (page: number) => void
}

export default function HeaderTable({ sortField, sortOrder, setSortField, setSortOrder, setCurrentPage }: HeaderTableProps) {
    // Componente SortIcon personalizado
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

    const handleSort = (field: keyof Product) => {
        if (sortField === field) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
          setSortField(field)
          setSortOrder('asc')
        }
        setCurrentPage(1) // Resetear a página 1 al ordenar
      }

    return (
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
            Acciones
        </th>
        </tr>
        </thead>
    )
}