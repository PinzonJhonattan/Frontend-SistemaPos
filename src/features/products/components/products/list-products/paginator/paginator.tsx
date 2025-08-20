import { Dropdown } from "primereact/dropdown";
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
}

interface PaginatorProps {
    sortedProducts: Product[]   
    currentPage: number
    setCurrentPage: (page: number) => void
    itemsPerPage: number
    setItemsPerPage: (newItemsPerPage: number) => void
    totalPages: number
    startIndex: number
    endIndex: number
}

export default function Paginator({ 
    sortedProducts, 
    currentPage, 
    setCurrentPage, 
    itemsPerPage, 
    setItemsPerPage,
    totalPages,
    startIndex,
    endIndex
}: PaginatorProps) { 

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

    const itemsPerPageOptions = [
        { label: '5', value: 5 },
        { label: '8', value: 8 },
        { label: '10', value: 10 },
        { label: '15', value: 15 },
        { label: '20', value: 20 },
    ]

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1) // Resetear a página 1 al cambiar items por página
    }

    if (sortedProducts.length === 0) {
        return null
    }

    return (
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
                    Mostrando {startIndex + 1} a {Math.min(endIndex, sortedProducts.length)} de {sortedProducts.length} productos
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
    )
}