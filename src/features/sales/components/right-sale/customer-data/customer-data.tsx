import { InputText } from "primereact/inputtext"
import { useState } from "react"

export default function CustomerData() {
    const [customer, setCustomer] = useState({
        name: '',
        identification: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    })

    const [isExpanded, setIsExpanded] = useState(false)

    // Verificar si hay datos del cliente
    const hasCustomerData = customer.name || customer.identification || customer.email

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Header Clickeable */}
            <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                            Datos del Cliente
                        </h4>
                        {hasCustomerData && !isExpanded && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                ✓ Completado
                            </span>
                        )}
                    </div>
                    {!isExpanded && hasCustomerData && (
                        <p className="text-sm text-gray-600">
                            {customer.name} - {customer.identification}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                        {/* {isExpanded ? 'Ocultar' : 'Editar'} */}
                    </span>
                    <svg 
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Contenido Colapsable */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="border-t border-gray-200 p-6">
                    <p className="text-sm text-gray-600 mb-6">
                        Información del cliente para la facturación
                    </p>

                    {/* Form Fields */}
                    <div className="space-y-6">
                {/* Fila 1: Nombre e Identificación */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre completo *
                        </label>
                        <InputText
                            id="name"
                            value={customer.name}
                            onChange={(e) => setCustomer({...customer, name: e.target.value})} 
                            placeholder="Ingrese el nombre completo"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="identification" className="block text-sm font-medium text-gray-700 mb-2">
                            Identificación *
                        </label>
                        <InputText
                            id="identification"
                            value={customer.identification}
                            onChange={(e) => setCustomer({...customer, identification: e.target.value})} 
                            placeholder="Cédula o NIT"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />   
                    </div>
                </div>

                {/* Fila 2: Email y Teléfono */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico *
                        </label>
                        <InputText
                            id="email"
                            type="email"
                            value={customer.email}
                            onChange={(e) => setCustomer({...customer, email: e.target.value})} 
                            placeholder="correo@ejemplo.com"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono
                        </label>
                        <InputText
                            id="phone"
                            value={customer.phone}
                            onChange={(e) => setCustomer({...customer, phone: e.target.value})} 
                            placeholder="Número de contacto"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Fila 3: Dirección */}
                <div className="flex flex-col">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección
                    </label>
                    <InputText
                        id="address"
                        value={customer.address}
                        onChange={(e) => setCustomer({...customer, address: e.target.value})} 
                        placeholder="Dirección completa"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Fila 4: Ciudad, Departamento/Estado y Código Postal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                            Ciudad
                        </label>
                        <InputText
                            id="city"
                            value={customer.city}
                            onChange={(e) => setCustomer({...customer, city: e.target.value})} 
                            placeholder="Ciudad"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                            Departamento
                        </label>
                        <InputText
                            id="state"
                            value={customer.state}
                            onChange={(e) => setCustomer({...customer, state: e.target.value})} 
                            placeholder="Departamento"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
                            Código Postal
                        </label>
                        <InputText
                            id="zip"
                            value={customer.zip}
                            onChange={(e) => setCustomer({...customer, zip: e.target.value})} 
                            placeholder="Código postal"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}