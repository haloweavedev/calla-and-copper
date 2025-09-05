export type Product = {
  id: number
  name: string
  style: 'SCANDINAVIAN' | 'INDUSTRIAL' | 'BOHO' | 'MODERN' | 'VINTAGE'
  category: string
  description: string
  tags: string[]
  price: number
  imageUrl: string
}

export const productCatalog: Product[] = [
  // Scandinavian
  {
    id: 1,
    name: 'Asgeir Oak Chair',
    style: 'SCANDINAVIAN',
    category: 'chairs',
    description:
      'A minimalist chair with clean lines and a natural oak finish, perfect for light and airy rooms.',
    tags: ['wood', 'minimal', 'light-tone', 'seating', 'living-room'],
    price: 250,
    imageUrl: '/images/products/scandi-chair.png',
  },
  {
    id: 7,
    name: 'Fjord Linen Pillow',
    style: 'SCANDINAVIAN',
    category: 'pillows',
    description:
      'A cozy, neutral-toned linen pillow that adds texture and comfort to sofas and beds.',
    tags: ['cozy', 'natural-fiber', 'minimal', 'textiles', 'beige'],
    price: 50,
    imageUrl: '/images/products/scandi-pillow.png',
  },
  {
    id: 8,
    name: 'Hygge Wool Rug',
    style: 'SCANDINAVIAN',
    category: 'rugs',
    description:
      'A soft, high-pile wool rug in a cream color to anchor your space in warmth.',
    tags: ['cozy', 'soft', 'light-tone', 'flooring', 'white-walls'],
    price: 450,
    imageUrl: '/images/products/scandi-rug.png',
  },

  // Industrial
  {
    id: 2,
    name: 'Artisan Coffee Table',
    style: 'INDUSTRIAL',
    category: 'Tables',
    description:
      'A raw, sturdy coffee table with a reclaimed wood top and forged steel legs.',
    tags: ['metal', 'urban', 'raw-finish', 'wood', 'living-room'],
    price: 350,
    imageUrl: '/images/products/industrial-table-2.png',
  },
  {
    id: 6,
    name: 'Edison Cage Pendant Light',
    style: 'INDUSTRIAL',
    category: 'Lighting',
    description:
      'An exposed Edison bulb in a black metal cage, perfect for moody, focused lighting.',
    tags: ['lighting', 'metal', 'exposed-bulb', 'dark-tone', 'urban'],
    price: 120,
    imageUrl: '/images/products/industrial-light.png',
  },
  {
    id: 9,
    name: 'Riveted Iron Bookshelf',
    style: 'INDUSTRIAL',
    category: 'Storage',
    description:
      'A tall, open-back bookshelf made from riveted iron and distressed wood planks.',
    tags: ['metal', 'storage', 'raw-finish', 'urban', 'bookshelf'],
    price: 750,
    imageUrl: '/images/products/industrial-shelf.png',
  },

  // Boho
  {
    id: 3,
    name: 'Woven Macrame Wall Art',
    style: 'BOHO',
    category: 'Decor',
    description:
      'A large, hand-woven macrame piece that adds texture and an eclectic feel to any wall.',
    tags: ['textured', 'natural-fiber', 'eclectic', 'wall-art', 'handmade'],
    price: 80,
    imageUrl: '/images/products/boho-macrame.png',
  },
  {
    id: 10,
    name: 'Rattan Peacock Chair',
    style: 'BOHO',
    category: 'Chairs',
    description:
      'An iconic, high-backed peacock chair made from natural rattan as a statement piece.',
    tags: ['rattan', 'natural-fiber', 'seating', 'eclectic', 'statement-piece'],
    price: 400,
    imageUrl: '/images/products/boho-chair.png',
  },
  {
    id: 13,
    name: 'Jute Area Rug',
    style: 'BOHO',
    category: 'Rugs',
    description:
      'A durable jute rug that adds earthy texture and warmth to floors.',
    tags: ['natural-fiber', 'textured', 'flooring', 'earthy'],
    price: 220,
    imageUrl: '/images/products/boho-rug.png',
  },

  // Modern
  {
    id: 4,
    name: 'Gloss White Sideboard',
    style: 'MODERN',
    category: 'Storage',
    description:
      'A sleek, handleless sideboard with a high-gloss finish for a contemporary space.',
    tags: ['sleek', 'contemporary', 'storage', 'minimal', 'white-walls'],
    price: 600,
    imageUrl: '/images/products/modern-sideboard.png',
  },
  {
    id: 11,
    name: 'Abstract Chrome Floor Lamp',
    style: 'MODERN',
    category: 'Lighting',
    description:
      'A sculptural floor lamp with a chrome finish and an abstract form.',
    tags: ['lighting', 'metal', 'sleek', 'contemporary', 'statement-piece'],
    price: 320,
    imageUrl: '/images/products/modern-lamp.png',
  },
  {
    id: 14,
    name: 'Low-Profile Modular Sofa',
    style: 'MODERN',
    category: 'Sofas',
    description:
      'A modular, low-profile sofa with clean geometry and performance fabric.',
    tags: ['seating', 'minimal', 'sleek', 'modular'],
    price: 1400,
    imageUrl: '/images/products/modern-sofa.png',
  },

  // Vintage
  {
    id: 5,
    name: 'Emerald Velvet Sofa',
    style: 'VINTAGE',
    category: 'Sofas',
    description:
      'A classic Chesterfield sofa upholstered in rich, emerald green velvet.',
    tags: ['classic', 'cozy', 'upholstered', 'velvet', 'dark-tone'],
    price: 1200,
    imageUrl: '/images/products/vintage-sofa.png',
  },
  {
    id: 12,
    name: 'Ornate Gilt Mirror',
    style: 'VINTAGE',
    category: 'Decor',
    description:
      'A large, rectangular mirror with an ornate, gold-gilt frame for a touch of classic elegance.',
    tags: ['classic', 'wall-art', 'statement-piece', 'gold-accent'],
    price: 280,
    imageUrl: '/images/products/vintage-mirror.png',
  },
  {
    id: 15,
    name: 'Walnut Record Console',
    style: 'VINTAGE',
    category: 'Storage',
    description:
      'A mid-century inspired walnut console perfect for records and media.',
    tags: ['wood', 'storage', 'mid-century', 'classic'],
    price: 680,
    imageUrl: '/images/products/vintage-console.png',
  },
]

