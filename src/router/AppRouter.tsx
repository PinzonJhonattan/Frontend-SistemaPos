import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../shell/Layout'
import Dashboard from '../features/dashboard/pages/Dashboard'
import ProductsPage from '../features/products/pages/ProductsPage'
import SalesPage from '../features/sales/pages/salesPage'

export default function AppRouter() {
  return (
    <Routes>
      {/* Público como /login vendrá después; por ahora todo bajo Layout */}
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/sales" element={<SalesPage />} />
        {/* Rutas placeholder para que el PanelMenu no falle si haces click */}
 
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
