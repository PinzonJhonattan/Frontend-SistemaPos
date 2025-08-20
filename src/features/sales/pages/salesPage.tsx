import Sales from "../components/sales";

export default function SalesPage() {
    return (
        <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-theme-primary">Gestión de Ventas</h1>
          <p className="text-theme-muted mt-2">Administra tus ventas</p>
        </div>
        
        <Sales />    
      </div>
    )
}