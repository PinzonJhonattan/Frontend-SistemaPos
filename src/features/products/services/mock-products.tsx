interface Product {
    id: number
    name: string
    code: string
    reference: string
    description: string
    brand: string
    category: string    
    shelfUbication: number
    levelUbication: string
    stock: number
    minStock: number
    maxStock: number
    cost: number
    price: number
    status: 'active' | 'inactive'
  }
  
  export const mockProducts: Product[] = [
    { 
      id: 1, 
      name: 'Pastillas de Freno Delanteras', 
      code: 'PFD-001', 
      reference: 'BP1234-FRT', 
      description: 'Pastillas de freno cerámicas para vehículos compactos Toyota/Nissan', 
      brand: 'Toyota', 
      category: 'Frenos', 
      shelfUbication: 15, 
      levelUbication: 'A', 
      stock: 21, 
      minStock: 5, 
      maxStock: 50, 
      cost: 65000, 
      price: 85000, 
      status: 'active' 
    },
    { 
      id: 2, 
      name: 'Filtro de Aceite Universal', 
      code: 'FAU-002', 
      reference: 'OF-4593', 
      description: 'Filtro de aceite para motores 1.3L a 1.8L gasolina', 
      brand: 'Chevrolet', 
      category: 'Motor', 
      shelfUbication: 8, 
      levelUbication: 'B', 
      stock: 45, 
      minStock: 10, 
      maxStock: 100, 
      cost: 18000, 
      price: 25000, 
      status: 'active' 
    },
    { 
      id: 3, 
      name: 'Amortiguador Trasero Monroe', 
      code: 'ATM-003', 
      reference: 'MON-58640', 
      description: 'Amortiguador hidráulico para eje trasero Mazda 3/6', 
      brand: 'Mazda', 
      category: 'Suspensión', 
      shelfUbication: 22, 
      levelUbication: 'C', 
      stock: 8, 
      minStock: 3, 
      maxStock: 25, 
      cost: 140000, 
      price: 180000, 
      status: 'active' 
    },
    { 
      id: 4, 
      name: 'Batería MAC 60Ah', 
      code: 'BAT-004', 
      reference: 'MAC-60AH', 
      description: 'Batería libre de mantenimiento 12V 60Ah para arranque', 
      brand: 'Hyundai', 
      category: 'Eléctrico', 
      shelfUbication: 5, 
      levelUbication: 'Bajo', 
      stock: 12, 
      minStock: 4, 
      maxStock: 30, 
      cost: 260000, 
      price: 320000, 
      status: 'active' 
    },
    { 
      id: 5, 
      name: 'Kit Bujías NGK Platino', 
      code: 'BUJ-005', 
      reference: 'NGK-PTR5A', 
      description: 'Set de 4 bujías de platino para motores 1.6L', 
      brand: 'Honda', 
      category: 'Motor', 
      shelfUbication: 12, 
      levelUbication: 'A', 
      stock: 30, 
      minStock: 8, 
      maxStock: 60, 
      cost: 32000, 
      price: 45000, 
      status: 'active' 
    },
    { 
      id: 6, 
      name: 'Disco de Freno Brembo', 
      code: 'DFB-006', 
      reference: 'BRM-09A394', 
      description: 'Disco de freno ventilado delantero para Honda Civic', 
      brand: 'Honda', 
      category: 'Frenos', 
      shelfUbication: 18, 
      levelUbication: 'B', 
      stock: 0, 
      minStock: 2, 
      maxStock: 20, 
      cost: 95000, 
      price: 120000, 
      status: 'active' 
    },
    { 
      id: 7, 
      name: 'Aceite Mobil 15W40 4L', 
      code: 'ACE-007', 
      reference: 'MOB-15W40', 
      description: 'Aceite mineral para motores diesel y gasolina', 
      brand: 'Universal', 
      category: 'Lubricantes', 
      shelfUbication: 3, 
      levelUbication: 'Bajo', 
      stock: 25, 
      minStock: 10, 
      maxStock: 80, 
      cost: 48000, 
      price: 65000, 
      status: 'active' 
    },
    { 
      id: 8, 
      name: 'Alternador Bosch 90A', 
      code: 'ALT-008', 
      reference: 'BSH-0124515', 
      description: 'Alternador 90 amperios remanufacturado para Kia Rio', 
      brand: 'Kia', 
      category: 'Eléctrico', 
      shelfUbication: 25, 
      levelUbication: 'Alto', 
      stock: 6, 
      minStock: 2, 
      maxStock: 15, 
      cost: 350000, 
      price: 450000, 
      status: 'active' 
    },
    { 
      id: 9, 
      name: 'Llanta Michelin 185/65 R15', 
      code: 'LLN-009', 
      reference: 'MCH-185650', 
      description: 'Llanta radial para automóviles compactos', 
      brand: 'Universal', 
      category: 'Llantas', 
      shelfUbication: 30, 
      levelUbication: 'Bajo', 
      stock: 16, 
      minStock: 4, 
      maxStock: 40, 
      cost: 220000, 
      price: 280000, 
      status: 'active' 
    },
    { 
      id: 10, 
      name: 'Filtro Aire K&N Deportivo', 
      code: 'FAD-010', 
      reference: 'KN-33-2070', 
      description: 'Filtro de aire deportivo lavable para mayor flujo', 
      brand: 'Subaru', 
      category: 'Motor', 
      shelfUbication: 14, 
      levelUbication: 'A', 
      stock: 18, 
      minStock: 5, 
      maxStock: 35, 
      cost: 72000, 
      price: 95000, 
      status: 'active' 
    }
  ]