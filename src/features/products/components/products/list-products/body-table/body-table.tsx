import { Button } from "primereact/button";


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

interface BodyTableProps {
    currentProducts: Product[]
    sortField: keyof Product
    sortOrder: 'asc' | 'desc'
}

export default function BodyTable({ currentProducts, sortField, sortOrder }: BodyTableProps) {
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
    
    return (
        <tbody className="bg-white divide-y divide-gray-100">
    {currentProducts.length === 0 ? (
    <tr>
        <td colSpan={13} className="px-6 py-12 text-center">
        <div className="flex flex-col items-center">
            <i className="pi pi-search text-gray-400 text-4xl mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron productos
            </h3>
                            <p className="text-gray-500">
    No hay productos disponibles
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

        {/* Código */}
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{product.code}</div>
        </td>

        {/* Referencia */}
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-600">{product.reference}</div>
        </td>

        {/* Ubicación */}
        <td className="px-6 py-4 whitespace-nowrap text-center">
            <div className="text-sm text-gray-700">
            <div>Estante {product.shelfUbication}</div>
            <div className="text-xs text-gray-500">Nivel {product.levelUbication}</div>
            </div>
        </td>

        {/* Precio */}
        <td className="px-6 py-4 whitespace-nowrap text-right">
            <div className="text-lg font-bold text-gray-900">
            
            ${product.price.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
        </td>

        {/* Costo/Ganancia */}
        <td className="px-6 py-4 whitespace-nowrap text-center">
            <div className="flex flex-col items-center">
            <div className="text-sm text-gray-600">
                Costo: ${product.cost.toLocaleString('es-CO')}
            </div>
            <div className={`text-sm font-medium ${
                (product.price - product.cost) > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
                Ganancia: ${(product.price - product.cost).toLocaleString('es-CO')}
            </div>
            </div>
        </td>

        {/* Stock */}
        <td className="px-6 py-4 whitespace-nowrap text-center">
            <div className="flex flex-col items-center">
            <StockIndicator stock={product.stock} />
            <div className="text-xs text-gray-500 mt-1">
                <span className="text-red-600">Min: {product.minStock}</span>
                <span className="mx-1">|</span>
                <span className="text-green-600">Max: {product.maxStock}</span>
            </div>
            </div>
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
    )
}