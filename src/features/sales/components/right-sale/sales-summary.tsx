import CustomerData from "./customer-data/customer-data"
import SaleItems from "./sale-items/sale-items"

export default function SalesSummary() {
    return (
        <div className="items-center gap-2">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                    Factura de venta
                </h3>
                <p className="text-sm text-gray-600 mt-1 text-center">
                    Resumen de venta
                </p>
                <hr className="my-4" />
            </div>
            <div className="flex flex-col gap-4">
                <CustomerData />
                <SaleItems />
            </div>
        </div>
    )
}