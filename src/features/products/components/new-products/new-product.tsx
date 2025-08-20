import { useState } from "react"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { InputNumber, type InputNumberChangeEvent } from "primereact/inputnumber"
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown"

interface NewProductProps {
    onClose: () => void
}

export default function NewProduct({ onClose }: NewProductProps) {
    const [visible, setVisible] = useState(true)
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        description: '',
        category: '',
        code: '',
        reference: '',
        brand: '',
        categories: '',
        shelfUbication: 0,
        levelUbication: '',
        stock: 0,
        minStock: 0,
        maxStock: 0,
        cost: 0,
        gain: 0
    })

    const brands = [
        { label: 'Toyota', value: 'toyota' },
        { label: 'Ford', value: 'ford' },
        { label: 'Chevrolet', value: 'chevrolet' },
        { label: 'Nissan', value: 'nissan' }
    ]

    const categories = [
        { label: 'Accesorios', value: 'accesories' },
        { label: 'Repuestos', value: 'repairs' },
        { label: 'Motor', value: 'motor' },
        { label: 'Suspensión', value: 'suspension' },
        { label: 'sistema Electrico', value: 'electric_system' },
    ]

    const handleSave = () => {
        console.log('Producto a guardar:', product)
        onClose()
    }

    const handleCancel = () => {
        onClose()
    }

    const footer = (
        <div className="flex justify-end gap-2">
            <Button 
                label="Cancelar" 
                icon="pi pi-times" 
                onClick={handleCancel}
                className="p-button-text"
            />
            <Button 
                label="Guardar" 
                icon="pi pi-check" 
                onClick={handleSave}
                autoFocus
            />
        </div>
    )

    return (
        <>
            
            <Dialog 
                header="Agregar Nuevo Producto" 
                visible={visible} 
                onHide={onClose}
                style={{ width: '50vw' }}
                footer={footer}
                modal
                className="p-fluid"
            >
                    <div className="grid gap-6 p-6">
                        {/* INFORMACIÓN BÁSICA - 2 COLUMNAS */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Información Básica</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Nombre del Producto *
                                    </label>
                                    <InputText
                                        id="name"
                                        value={product.name}
                                        onChange={(e) => setProduct({...product, name: e.target.value})}
                                        placeholder="Ingrese el nombre del producto"
                                        className="w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="code" className="block text-sm font-medium mb-2">
                                        Código Interno *
                                    </label>
                                    <InputText
                                        id="code"
                                        value={product.code}
                                        onChange={(e) => setProduct({...product, code: e.target.value})} 
                                        placeholder="Ingrese el código interno"
                                        className="w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="reference" className="block text-sm font-medium mb-2">
                                        Referencia Original *
                                    </label>
                                    <InputText
                                        id="reference"
                                        value={product.reference}
                                        onChange={(e) => setProduct({...product, reference: e.target.value})}
                                        placeholder="Ingrese la referencia original"
                                        className="w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                                        Descripción *
                                    </label>
                                    <InputText
                                        id="description"
                                        value={product.description}
                                        onChange={(e) => setProduct({...product, description: e.target.value})}
                                        placeholder="Ingrese la descripción"
                                        className="w-full"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CLASIFICACIÓN - 1 COLUMNA CON BOTONES */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Clasificación</h3>
                            <div className="grid gap-4">
                                <div className="flex gap-2 items-end">
                                    <div className="flex-1">
                                        <label htmlFor="brand" className="block text-sm font-medium mb-2">
                                            Marca del Vehículo *
                                        </label>
                                        <Dropdown
                                            id="brand"
                                            value={product.brand}
                                            options={brands}
                                            optionLabel="label"
                                            optionValue="value"
                                            onChange={(e) => setProduct({...product, brand: e.value})}
                                            placeholder="Seleccione la marca"
                                            className="w-full"
                                            required
                                        />
                                    </div>
                                    <Button 
                                        icon="pi pi-plus" 
                                        className="h-10"
                                        tooltip="Agregar nueva marca"
                                        tooltipOptions={{position: 'top'}}
                                    />
                                </div>
                                <div className="flex gap-2 items-end">
                                    <div className="flex-1">
                                        <label htmlFor="categories" className="block text-sm font-medium mb-2">
                                            Categoría *
                                        </label>
                                        <Dropdown
                                            id="categories"
                                            value={product.categories}
                                            options={categories}
                                            optionLabel="label"
                                            optionValue="value"
                                            onChange={(e) => setProduct({...product, categories: e.value})}
                                            placeholder="Seleccione la categoría"
                                            className="w-full"
                                            required
                                        />
                                    </div>
                                    <Button 
                                        icon="pi pi-plus" 
                                        className="h-10"
                                        tooltip="Agregar nueva categoría"
                                        tooltipOptions={{position: 'top'}}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* UBICACIÓN FÍSICA - 2 COLUMNAS */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Ubicación Física</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="shelfUbication" className="block text-sm font-medium mb-2">
                                        Número de Estante *
                                    </label>
                                    <InputNumber    
                                        id="shelfUbication"      
                                        value={product.shelfUbication}
                                        onChange={(e) => setProduct({...product, shelfUbication: e.value || 0})}
                                        placeholder="Ej: 15"
                                        className="w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="levelUbication" className="block text-sm font-medium mb-2">
                                        Nivel de Estante *
                                    </label>
                                    <InputText
                                        id="levelUbication"
                                        value={product.levelUbication}
                                        onChange={(e) => setProduct({...product, levelUbication: e.target.value})}
                                        placeholder="Ej: A, B, Alto, Medio"
                                        className="w-full"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* INFORMACIÓN DE STOCK - 3 COLUMNAS */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Información de Stock</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium mb-2">
                                        Cantidad Actual *
                                    </label>
                                    <InputNumber
                                        id="stock"
                                        value={product.stock}
                                        onChange={(e) => setProduct({...product, stock: e.value || 0})}
                                        placeholder="Unidades disponibles"
                                        className="w-full"
                                        min={0}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="minStock" className="block text-sm font-medium mb-2">
                                        Stock Mínimo *
                                    </label>
                                    <InputNumber
                                        id="minStock"
                                        value={product.minStock}
                                        onChange={(e) => setProduct({...product, minStock: e.value || 0})}
                                        placeholder="Mínimo"
                                        className="w-full"
                                        min={0}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="maxStock" className="block text-sm font-medium mb-2">
                                        Stock Máximo *
                                    </label>
                                    <InputNumber
                                        id="maxStock"
                                        value={product.maxStock}
                                        onChange={(e) => setProduct({...product, maxStock: e.value || 0})}
                                        placeholder="Máximo"
                                        className="w-full"
                                        min={0}
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* INDICADOR VISUAL DE STOCK */}
                            <div className="mt-3 p-3 bg-white rounded border">
                                <div className="flex justify-between text-sm">
                                    <span className="text-red-600">Mín: {product.minStock}</span>
                                    <span className="font-medium">Actual: {product.stock}</span>
                                    <span className="text-green-600">Máx: {product.maxStock}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div 
                                        className={`h-2 rounded-full ${
                                            product.stock <= product.minStock ? 'bg-red-500' :
                                            product.stock >= product.maxStock ? 'bg-green-500' : 'bg-yellow-500'
                                        }`}
                                        style={{
                                            width: `${Math.min(100, (product.stock / Math.max(product.maxStock, 1)) * 100)}%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* INFORMACIÓN DE PRECIOS - 3 COLUMNAS CON CÁLCULO */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Información de Precios</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="cost" className="block text-sm font-medium mb-2">
                                        Costo del Producto *
                                    </label>
                                    <InputNumber
                                        id="cost"  
                                        value={product.cost}  
                                        onChange={(e) => setProduct({...product, cost: e.value || 0})}
                                        placeholder="Costo"
                                        mode="currency"  
                                        currency="COP"   
                                        locale="es-CO"   
                                        minFractionDigits={0}
                                        className="w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium mb-2">
                                        Precio de Venta *
                                    </label>
                                    <InputNumber
                                        id="price"
                                        value={product.price}  
                                        onChange={(e) => setProduct({...product, price: e.value || 0})}
                                        placeholder="Precio"
                                        mode="currency"  
                                        currency="COP"   
                                        locale="es-CO"   
                                        minFractionDigits={0}
                                        className="w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gain" className="block text-sm font-medium mb-2">
                                        Ganancia
                                    </label>
                                    <InputText
                                        id="gain"
                                        value={new Intl.NumberFormat('es-CO', {
                                            style: 'currency',
                                            currency: 'COP',
                                            minimumFractionDigits: 0
                                        }).format(product.price - product.cost)}         
                                        disabled
                                        className="w-full bg-green-50 text-green-700 font-medium"
                                    />
                                </div>
                            </div>
                            
                            {/* INDICADORES DE MARGEN */}
                            <div className="mt-3 p-3 bg-white rounded border">
                                <div className="flex justify-between items-center text-sm">
                                    <span>Margen de ganancia:</span>
                                    <span className={`font-bold ${
                                        ((product.price - product.cost) / product.price * 100) > 30 ? 'text-green-600' :
                                        ((product.price - product.cost) / product.price * 100) > 15 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                        {product.price > 0 ? ((product.price - product.cost) / product.price * 100).toFixed(1) : 0}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
            </Dialog>
        </>
    )
}