import { Product } from './types'

export const productCatalog: Product[] = [
  // SCANDINAVIAN SEATING
  {
    id: 1,
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
    id: 7,
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
    id: 8,
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
    id: 2,
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
    id: 6,
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
    id: 9,
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
    id: 3,
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
    id: 10,
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
    id: 13,
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
    id: 4,
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
    id: 11,
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
    id: 14,
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
    id: 5,
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
    id: 12,
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
    id: 15,
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
  }
]