import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../shell/Layout'
import Dashboard from '../features/dashboard/pages/Dashboard'
import ProductsPage from '../features/products/pages/ProductsPage'

export default function AppRouter() {
  return (
    <Routes>
      {/* Público como /login vendrá después; por ahora todo bajo Layout */}
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductsPage />} />
        {/* Rutas placeholder para que el PanelMenu no falle si haces click */}
        <Route path="/sales/new" element={<div>Nueva venta</div>} />
        <Route path="/sales" element={<div>Listado de ventas</div>} />
        <Route path="/sales/returns" element={<div>Devoluciones</div>} />

        <Route path="/inventory/products" element={<div>Productos</div>} />
        <Route path="/inventory/kardex" element={<div>Kardex</div>} />
        <Route path="/inventory/adjustments" element={<div>Ajustes</div>} />

        <Route path="/cash/open-close" element={<div>Apertura/Cierre</div>} />
        <Route path="/cash/movements" element={<div>Movimientos</div>} />

        <Route path="/reports/sales" element={<div>Reporte de ventas</div>} />
        <Route path="/reports/inventory" element={<div>Reporte de inventario</div>} />
        <Route path="/reports/cash" element={<div>Reporte de caja</div>} />

        <Route path="/settings/users" element={<div>Usuarios</div>} />
        <Route path="/settings/roles" element={<div>Roles</div>} />
        <Route path="/settings/taxes" element={<div>Impuestos</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
