import { Product } from './types'

// Helper function to generate unique IDs
let idCounter = 1
export const generateProductId = (): string => {
  return `product_${idCounter++}`
}

// Helper function to add a new product to the catalog
export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const newProduct: Product = {
    ...product,
    id: generateProductId()
  }
  productCatalog.push(newProduct)
  return newProduct
}

export const productCatalog: Product[] = [
  // SCANDINAVIAN SEATING
  {
    id: generateProductId(),
    name: 'Asgeir Oak Chair',
    style: 'SCANDINAVIAN',
    category: 'seating',
    subcategory: 'chairs',
    description: 'A minimalist chair with clean lines and a natural oak finish, perfect for light and airy rooms.',
    materials: ['wood'],
    styleAttributes: ['minimal', 'elegant'],
    colors: ['light-tone', 'neutral'],
    functionality: ['seating'],
    roomCompatibility: ['living-room', 'dining-room', 'home-office'],
    environmentTags: ['natural-light', 'small-space'],
    price: 250,
    imageUrl: '/assets/inventory/seating/chairs/scandinavian-oak-chair.png',
    dimensions: { width: 45, height: 85, depth: 50 },
    inStock: true
  },

  // SCANDINAVIAN TEXTILES
  {
    id: generateProductId(),
    name: 'Fjord Linen Pillow',
    style: 'SCANDINAVIAN',
    category: 'textiles',
    subcategory: 'pillows',
    description: 'A cozy, neutral-toned linen pillow that adds texture and comfort to sofas and beds.',
    materials: ['fabric'],
    styleAttributes: ['cozy', 'minimal'],
    colors: ['beige', 'neutral'],
    functionality: ['decorative'],
    roomCompatibility: ['living-room', 'bedroom'],
    environmentTags: ['natural-light'],
    price: 50,
    imageUrl: '/assets/inventory/textiles/pillows/scandinavian-linen-pillow.png',
    inStock: true
  },

  {
    id: generateProductId(),
    name: 'Hygge Wool Rug',
    style: 'SCANDINAVIAN',
    category: 'textiles',
    subcategory: 'rugs',
    description: 'A soft, high-pile wool rug in a cream color to anchor your space in warmth.',
    materials: ['fabric'],
    styleAttributes: ['cozy'],
    colors: ['light-tone', 'white'],
    functionality: ['decorative'],
    roomCompatibility: ['living-room', 'bedroom'],
    environmentTags: ['natural-light'],
    price: 450,
    imageUrl: '/assets/inventory/textiles/rugs/scandinavian-wool-rug.png',
    dimensions: { width: 200, height: 2, depth: 300 },
    inStock: true
  },

  // INDUSTRIAL TABLES
  {
    id: generateProductId(),
    name: 'Artisan Coffee Table',
    style: 'INDUSTRIAL',
    category: 'tables',
    subcategory: 'coffee-tables',
    description: 'A raw, sturdy coffee table with a reclaimed wood top and forged steel legs.',
    materials: ['metal', 'wood'],
    styleAttributes: ['rustic'],
    colors: ['dark-tone', 'brown'],
    functionality: ['storage'],
    roomCompatibility: ['living-room'],
    environmentTags: ['large-space', 'low-light'],
    price: 350,
    imageUrl: '/assets/inventory/tables/industrial-coffee-table.png',
    dimensions: { width: 120, height: 45, depth: 60 },
    inStock: true
  },

  // INDUSTRIAL LIGHTING
  {
    id: generateProductId(),
    name: 'Edison Cage Pendant Light',
    style: 'INDUSTRIAL',
    category: 'lighting',
    subcategory: 'pendant-lights',
    description: 'An exposed Edison bulb in a black metal cage, perfect for moody, focused lighting.',
    materials: ['metal'],
    styleAttributes: ['rustic'],
    colors: ['black', 'dark-tone'],
    functionality: ['lighting'],
    roomCompatibility: ['kitchen', 'dining-room', 'home-office'],
    environmentTags: ['low-light', 'high-ceiling'],
    price: 120,
    imageUrl: '/assets/inventory/lighting/industrial-pendant-light.png',
    dimensions: { width: 25, height: 35, depth: 25 },
    inStock: true
  },

  // INDUSTRIAL STORAGE
  {
    id: generateProductId(),
    name: 'Riveted Iron Bookshelf',
    style: 'INDUSTRIAL',
    category: 'storage',
    subcategory: 'bookshelves',
    description: 'A tall, open-back bookshelf made from riveted iron and distressed wood planks.',
    materials: ['metal', 'wood'],
    styleAttributes: ['rustic'],
    colors: ['dark-tone', 'brown'],
    functionality: ['storage'],
    roomCompatibility: ['living-room', 'home-office'],
    environmentTags: ['large-space', 'high-ceiling'],
    price: 750,
    imageUrl: '/assets/inventory/storage/industrial-bookshelf.png',
    dimensions: { width: 80, height: 200, depth: 35 },
    inStock: true
  },

  // BOHO DECOR
  {
    id: generateProductId(),
    name: 'Woven Macrame Wall Art',
    style: 'BOHO',
    category: 'decor',
    subcategory: 'wall-art',
    description: 'A large, hand-woven macrame piece that adds texture and an eclectic feel to any wall.',
    materials: ['fabric'],
    styleAttributes: ['casual'],
    colors: ['neutral', 'beige'],
    functionality: ['decorative'],
    roomCompatibility: ['living-room', 'bedroom'],
    environmentTags: ['natural-light'],
    price: 80,
    imageUrl: '/assets/inventory/decor/boho-macrame-wall-art.png',
    dimensions: { width: 60, height: 90, depth: 5 },
    inStock: true
  },

  // BOHO SEATING
  {
    id: generateProductId(),
    name: 'Rattan Peacock Chair',
    style: 'BOHO',
    category: 'seating',
    subcategory: 'chairs',
    description: 'An iconic, high-backed peacock chair made from natural rattan as a statement piece.',
    materials: ['rattan'],
    styleAttributes: ['casual'],
    colors: ['neutral', 'brown'],
    functionality: ['seating'],
    roomCompatibility: ['living-room', 'bedroom'],
    environmentTags: ['natural-light', 'large-space'],
    price: 400,
    imageUrl: '/assets/inventory/seating/chairs/boho-rattan-chair.png',
    dimensions: { width: 75, height: 120, depth: 65 },
    inStock: true
  },

  // BOHO TEXTILES
  {
    id: generateProductId(),
    name: 'Jute Area Rug',
    style: 'BOHO',
    category: 'textiles',
    subcategory: 'rugs',
    description: 'A durable jute rug that adds earthy texture and warmth to floors.',
    materials: ['fabric'],
    styleAttributes: ['casual', 'rustic'],
    colors: ['neutral', 'brown'],
    functionality: ['decorative'],
    roomCompatibility: ['living-room', 'bedroom'],
    environmentTags: ['natural-light'],
    price: 220,
    imageUrl: '/assets/inventory/textiles/rugs/boho-jute-rug.png',
    dimensions: { width: 180, height: 2, depth: 250 },
    inStock: true
  },

  // MODERN STORAGE
  {
    id: generateProductId(),
    name: 'Gloss White Sideboard',
    style: 'MODERN',
    category: 'storage',
    subcategory: 'cabinets',
    description: 'A sleek, handleless sideboard with a high-gloss finish for a contemporary space.',
    materials: ['wood'],
    styleAttributes: ['sleek', 'minimal'],
    colors: ['white', 'light-tone'],
    functionality: ['storage'],
    roomCompatibility: ['living-room', 'dining-room'],
    environmentTags: ['natural-light', 'open-plan'],
    price: 600,
    imageUrl: '/assets/inventory/storage/modern-white-sideboard.png',
    dimensions: { width: 160, height: 75, depth: 45 },
    inStock: true
  },

  // MODERN LIGHTING
  {
    id: generateProductId(),
    name: 'Abstract Chrome Floor Lamp',
    style: 'MODERN',
    category: 'lighting',
    subcategory: 'floor-lamps',
    description: 'A sculptural floor lamp with a chrome finish and an abstract form.',
    materials: ['metal'],
    styleAttributes: ['sleek', 'elegant'],
    colors: ['neutral', 'gray'],
    functionality: ['lighting'],
    roomCompatibility: ['living-room', 'home-office'],
    environmentTags: ['natural-light', 'large-space'],
    price: 320,
    imageUrl: '/assets/inventory/lighting/modern-chrome-floor-lamp.png',
    dimensions: { width: 35, height: 150, depth: 35 },
    inStock: true
  },

  // MODERN SEATING
  {
    id: generateProductId(),
    name: 'Low-Profile Modular Sofa',
    style: 'MODERN',
    category: 'seating',
    subcategory: 'sofas',
    description: 'A modular, low-profile sofa with clean geometry and performance fabric.',
    materials: ['fabric'],
    styleAttributes: ['sleek', 'minimal'],
    colors: ['neutral', 'gray'],
    functionality: ['seating', 'multi-functional'],
    roomCompatibility: ['living-room'],
    environmentTags: ['natural-light', 'open-plan'],
    price: 1400,
    imageUrl: '/assets/inventory/seating/sofas/modern-modular-sofa.png',
    dimensions: { width: 220, height: 75, depth: 90 },
    inStock: true
  },

  // VINTAGE SEATING
  {
    id: generateProductId(),
    name: 'Emerald Velvet Sofa',
    style: 'VINTAGE',
    category: 'seating',
    subcategory: 'sofas',
    description: 'A classic Chesterfield sofa upholstered in rich, emerald green velvet.',
    materials: ['fabric'],
    styleAttributes: ['elegant', 'formal'],
    colors: ['dark-tone'],
    functionality: ['seating'],
    roomCompatibility: ['living-room'],
    environmentTags: ['low-light', 'large-space'],
    price: 1200,
    imageUrl: '/assets/inventory/seating/sofas/vintage-velvet-sofa.png',
    dimensions: { width: 200, height: 85, depth: 95 },
    inStock: true
  },

  // VINTAGE DECOR
  {
    id: generateProductId(),
    name: 'Ornate Gilt Mirror',
    style: 'VINTAGE',
    category: 'decor',
    subcategory: 'mirrors',
    description: 'A large, rectangular mirror with an ornate, gold-gilt frame for a touch of classic elegance.',
    materials: ['glass', 'metal'],
    styleAttributes: ['elegant', 'formal'],
    colors: ['neutral'],
    functionality: ['decorative'],
    roomCompatibility: ['living-room', 'bedroom', 'bathroom'],
    environmentTags: ['natural-light'],
    price: 280,
    imageUrl: '/assets/inventory/decor/vintage-gilt-mirror.png',
    dimensions: { width: 80, height: 120, depth: 5 },
    inStock: true
  },

  // VINTAGE STORAGE
  {
    id: generateProductId(),
    name: 'Walnut Record Console',
    style: 'VINTAGE',
    category: 'storage',
    subcategory: 'cabinets',
    description: 'A mid-century inspired walnut console perfect for records and media.',
    materials: ['wood'],
    styleAttributes: ['elegant'],
    colors: ['brown', 'dark-tone'],
    functionality: ['storage'],
    roomCompatibility: ['living-room'],
    environmentTags: ['natural-light', 'large-space'],
    price: 680,
    imageUrl: '/assets/inventory/storage/vintage-walnut-console.png',
    dimensions: { width: 150, height: 70, depth: 45 },
    inStock: true
  },

  // NEW MODERN CLEAN PRODUCTS (16-20)
  {
    id: generateProductId(),
    name: 'Linear White Dining Table',
    style: 'MODERN',
    category: 'tables',
    subcategory: 'dining-tables',
    description: 'Modern clean dining table with rectangular white lacquer finish and minimal steel legs.',
    materials: ['wood', 'metal'],
    styleAttributes: ['sleek', 'minimal'],
    colors: ['white', 'light-tone'],
    functionality: ['multi-functional'],
    roomCompatibility: ['dining-room', 'kitchen'],
    environmentTags: ['natural-light', 'open-plan'],
    price: 890,
    imageUrl: '/assets/inventory/tables/dining-tables/modern-linear-white-dining-table.png',
    dimensions: { width: 180, height: 75, depth: 90 },
    inStock: true
  },

  {
    id: generateProductId(),
    name: 'Geometric Accent Bench',
    style: 'MODERN',
    category: 'seating',
    subcategory: 'benches',
    description: 'Modern clean bench with geometric form, white upholstery, and chrome metal base.',
    materials: ['metal', 'fabric'],
    styleAttributes: ['sleek', 'minimal'],
    colors: ['white', 'neutral'],
    functionality: ['seating'],
    roomCompatibility: ['living-room', 'bedroom'],
    environmentTags: ['natural-light', 'small-space'],
    price: 420,
    imageUrl: '/assets/inventory/seating/benches/modern-geometric-accent-bench.png',
    dimensions: { width: 100, height: 45, depth: 40 },
    inStock: true
  },

  {
    id: generateProductId(),
    name: 'Sphere Table Lamp',
    style: 'MODERN',
    category: 'lighting',
    subcategory: 'table-lamps',
    description: 'Modern clean table lamp with white ceramic sphere base and fabric drum shade.',
    materials: ['ceramic', 'fabric'],
    styleAttributes: ['sleek', 'minimal'],
    colors: ['white', 'neutral'],
    functionality: ['lighting'],
    roomCompatibility: ['living-room', 'bedroom', 'home-office'],
    environmentTags: ['natural-light', 'small-space'],
    price: 180,
    imageUrl: '/assets/inventory/lighting/table-lamps/modern-sphere-table-lamp.png',
    dimensions: { width: 30, height: 50, depth: 30 },
    inStock: true
  },

  {
    id: generateProductId(),
    name: 'Ceramic Planter Set',
    style: 'MODERN',
    category: 'decor',
    subcategory: 'plants',
    description: 'Modern clean white ceramic planters in different geometric shapes with green plants.',
    materials: ['ceramic'],
    styleAttributes: ['minimal'],
    colors: ['white', 'neutral'],
    functionality: ['decorative'],
    roomCompatibility: ['living-room', 'bedroom', 'home-office'],
    environmentTags: ['natural-light'],
    price: 150,
    imageUrl: '/assets/inventory/decor/plants/modern-ceramic-planter-set.png',
    dimensions: { width: 25, height: 35, depth: 25 },
    inStock: true
  },

  {
    id: generateProductId(),
    name: 'Float Nightstand',
    style: 'MODERN',
    category: 'storage',
    subcategory: 'nightstands',
    description: 'Modern clean floating nightstand with white lacquer finish and hidden mounting.',
    materials: ['wood'],
    styleAttributes: ['sleek', 'minimal'],
    colors: ['white', 'light-tone'],
    functionality: ['storage'],
    roomCompatibility: ['bedroom'],
    environmentTags: ['small-space'],
    price: 320,
    imageUrl: '/assets/inventory/storage/nightstands/modern-float-nightstand.png',
    dimensions: { width: 50, height: 15, depth: 35 },
    inStock: true
  },

  // NEW COZY TRADITIONAL PRODUCTS (21-23)
  {
    id: generateProductId(),
    name: 'Wingback Reading Chair',
    style: 'VINTAGE',
    category: 'seating',
    subcategory: 'chairs',
    description: 'Cozy traditional wingback chair with rich burgundy leather upholstery and mahogany frame.',
    materials: ['leather', 'wood'],
    styleAttributes: ['elegant', 'formal', 'cozy'],
    colors: ['dark-tone', 'brown'],
    functionality: ['seating'],
    roomCompatibility: ['living-room', 'home-office'],
    environmentTags: ['low-light', 'large-space'],
    price: 850,
    imageUrl: '/assets/inventory/seating/chairs/vintage-wingback-reading-chair.png',
    dimensions: { width: 85, height: 110, depth: 85 },
    inStock: true
  },

  {
    id: generateProductId(),
    name: 'Antique Side Table',
    style: 'VINTAGE',
    category: 'tables',
    subcategory: 'side-tables',
    description: 'Cozy traditional side table with dark walnut wood and ornate carved details.',
    materials: ['wood'],
    styleAttributes: ['elegant', 'formal'],
    colors: ['dark-tone', 'brown'],
    functionality: ['storage'],
    roomCompatibility: ['living-room', 'bedroom'],
    environmentTags: ['low-light'],
    price: 380,
    imageUrl: '/assets/inventory/tables/side-tables/vintage-antique-side-table.png',
    dimensions: { width: 50, height: 65, depth: 35 },
    inStock: true
  },

  {
    id: generateProductId(),
    name: 'Traditional Floor Lamp',
    style: 'VINTAGE',
    category: 'lighting',
    subcategory: 'floor-lamps',
    description: 'Cozy traditional floor lamp with brass base and cream fabric shade.',
    materials: ['metal', 'fabric'],
    styleAttributes: ['elegant', 'cozy'],
    colors: ['neutral', 'beige'],
    functionality: ['lighting'],
    roomCompatibility: ['living-room', 'bedroom'],
    environmentTags: ['low-light'],
    price: 290,
    imageUrl: '/assets/inventory/lighting/floor-lamps/vintage-traditional-floor-lamp.png',
    dimensions: { width: 35, height: 160, depth: 35 },
    inStock: true
  },

  // NEW WARM MINIMALIST PRODUCTS (24-27)
  {
    id: generateProductId(),
    name: 'Natural Oak Bed Frame',
    style: 'SCANDINAVIAN',
    category: 'beds',
    subcategory: 'bed-frames',
    description: 'Warm minimalist bed frame with natural light oak wood and simple clean lines.',
    materials: ['wood'],
    styleAttributes: ['minimal', 'cozy'],
    colors: ['light-tone', 'neutral'],
    functionality: ['seating'],
    roomCompatibility: ['bedroom'],
    environmentTags: ['natural-light'],
    price: 740,
    imageUrl: '/assets/inventory/beds/bed-frames/scandinavian-natural-oak-bed-frame.png',
    dimensions: { width: 160, height: 85, depth: 210 },
    inStock: true
  },

  {
    id: generateProductId(),
    name: 'Linen Panel Curtains',
    style: 'SCANDINAVIAN',
    category: 'textiles',
    subcategory: 'curtains',
    description: 'Warm minimalist curtain panels with natural beige linen fabric and simple hem.',
    materials: ['fabric'],
    styleAttributes: ['minimal', 'cozy'],
    colors: ['beige', 'neutral'],
    functionality: ['decorative'],
    roomCompatibility: ['living-room', 'bedroom'],
    environmentTags: ['natural-light'],
    price: 120,
    imageUrl: '/assets/inventory/textiles/curtains/scandinavian-linen-panel-curtains.png',
    dimensions: { width: 140, height: 250, depth: 2 },
    inStock: true
  },

  {
    id: generateProductId(),
    name: 'Oak Chest Drawers',
    style: 'SCANDINAVIAN',
    category: 'storage',
    subcategory: 'dressers',
    description: 'Warm minimalist chest of drawers with light oak wood and clean Scandinavian design.',
    materials: ['wood'],
    styleAttributes: ['minimal', 'cozy'],
    colors: ['light-tone', 'neutral'],
    functionality: ['storage'],
    roomCompatibility: ['bedroom'],
    environmentTags: ['natural-light'],
    price: 580,
    imageUrl: '/assets/inventory/storage/dressers/scandinavian-oak-chest-drawers.png',
    dimensions: { width: 80, height: 95, depth: 45 },
    inStock: true
  },

  {
    id: generateProductId(),
    name: 'Round Oak Mirror',
    style: 'SCANDINAVIAN',
    category: 'decor',
    subcategory: 'mirrors',
    description: 'Warm minimalist round mirror with light oak wood frame and simple Scandinavian design.',
    materials: ['wood', 'glass'],
    styleAttributes: ['minimal', 'cozy'],
    colors: ['light-tone', 'neutral'],
    functionality: ['decorative'],
    roomCompatibility: ['bedroom', 'bathroom'],
    environmentTags: ['natural-light'],
    price: 190,
    imageUrl: '/assets/inventory/decor/mirrors/scandinavian-round-oak-mirror.png',
    dimensions: { width: 60, height: 60, depth: 5 },
    inStock: true
  },

  // NEW Industrial loft PRODUCTS (28-30)
  {
    id: generateProductId(),
    name: 'Leather Industrial Sofa',
    style: 'INDUSTRIAL',
    category: 'seating',
    subcategory: 'sofas',
    description: 'Industrial loft sofa with distressed brown leather and black metal frame.',
    materials: ['leather', 'metal'],
    styleAttributes: ['rustic'],
    colors: ['brown', 'dark-tone'],
    functionality: ['seating'],
    roomCompatibility: ['living-room'],
    environmentTags: ['low-light', 'large-space'],
    price: 1650,
    imageUrl: '/assets/inventory/seating/sofas/industrial-leather-industrial-sofa.png',
    dimensions: { width: 200, height: 80, depth: 90 },
    inStock: true
  },

  {
    id: generateProductId(),
    name: 'Pipe Side Table',
    style: 'INDUSTRIAL',
    category: 'tables',
    subcategory: 'side-tables',
    description: 'Industrial loft side table with black iron pipe base and reclaimed wood top.',
    materials: ['metal', 'wood'],
    styleAttributes: ['rustic'],
    colors: ['dark-tone', 'brown'],
    functionality: ['storage'],
    roomCompatibility: ['living-room', 'home-office'],
    environmentTags: ['low-light'],
    price: 240,
    imageUrl: '/assets/inventory/tables/side-tables/industrial-pipe-side-table.png',
    dimensions: { width: 45, height: 55, depth: 35 },
    inStock: true
  },

  {
    id: generateProductId(),
    name: 'Edison Desk Lamp',
    style: 'INDUSTRIAL',
    category: 'lighting',
    subcategory: 'table-lamps',
    description: 'Industrial loft desk lamp with black metal arm, Edison bulb, and adjustable joint.',
    materials: ['metal'],
    styleAttributes: ['rustic'],
    colors: ['black', 'dark-tone'],
    functionality: ['lighting'],
    roomCompatibility: ['home-office'],
    environmentTags: ['low-light'],
    price: 160,
    imageUrl: '/assets/inventory/lighting/table-lamps/industrial-edison-desk-lamp.png',
    dimensions: { width: 25, height: 45, depth: 35 },
    inStock: true
  }
]