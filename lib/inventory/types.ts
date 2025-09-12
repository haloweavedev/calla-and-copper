export type ProductStyle = 'SCANDINAVIAN' | 'INDUSTRIAL' | 'BOHO' | 'MODERN' | 'VINTAGE'

export type ProductCategory = 
  | 'seating'
  | 'tables' 
  | 'storage'
  | 'lighting'
  | 'textiles'
  | 'decor'
  | 'beds'

export type ProductSubcategory = 
  | 'chairs'
  | 'sofas'
  | 'benches'
  | 'coffee-tables'
  | 'dining-tables'
  | 'side-tables'
  | 'bookshelves'
  | 'cabinets'
  | 'dressers'
  | 'floor-lamps'
  | 'table-lamps'
  | 'pendant-lights'
  | 'rugs'
  | 'pillows'
  | 'curtains'
  | 'wall-art'
  | 'mirrors'
  | 'plants'
  | 'bed-frames'
  | 'nightstands'

export type RoomType = 'Living Room' | 'Bedroom' | 'Kitchen' | 'Home Office' | 'Dining Room' | 'Bathroom'

// Enhanced tag system for better matching
export type MaterialTag = 
  | 'wood' 
  | 'metal' 
  | 'glass' 
  | 'fabric' 
  | 'leather' 
  | 'rattan' 
  | 'ceramic' 
  | 'marble'

export type StyleTag = 
  | 'minimal' 
  | 'cozy' 
  | 'sleek' 
  | 'rustic' 
  | 'elegant' 
  | 'casual' 
  | 'formal'

export type ColorTag = 
  | 'light-tone' 
  | 'dark-tone' 
  | 'neutral' 
  | 'white' 
  | 'black' 
  | 'beige' 
  | 'brown' 
  | 'gray'

export type FunctionalTag = 
  | 'storage' 
  | 'seating' 
  | 'lighting' 
  | 'decorative' 
  | 'multi-functional'

export type RoomTag = 
  | 'living-room' 
  | 'bedroom' 
  | 'kitchen' 
  | 'home-office' 
  | 'dining-room' 
  | 'bathroom'

export type EnvironmentTag = 
  | 'natural-light' 
  | 'low-light' 
  | 'small-space' 
  | 'large-space' 
  | 'high-ceiling' 
  | 'open-plan'

export type Product = {
  id: number
  name: string
  style: ProductStyle
  category: ProductCategory
  subcategory: ProductSubcategory
  description: string
  materials: MaterialTag[]
  styleAttributes: StyleTag[]
  colors: ColorTag[]
  functionality: FunctionalTag[]
  roomCompatibility: RoomTag[]
  environmentTags: EnvironmentTag[]
  price: number
  imageUrl: string
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  weight?: number
  inStock: boolean
}

export interface ProductFilter {
  style?: ProductStyle[]
  category?: ProductCategory[]
  priceRange?: [number, number]
  materials?: MaterialTag[]
  colors?: ColorTag[]
  roomType?: RoomType
  inStock?: boolean
}