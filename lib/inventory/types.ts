export type ProductStyle = 'MINIMALIST' | 'INDUSTRIAL' | 'BOHO' | 'MODERN' | 'VINTAGE' | 'CONTEMPORARY' | 'TRADITIONAL'

export type ProductCategory = 
  | 'bed sets'
  | 'seating'
  | 'tables' 
  | 'storage'
  | 'lighting'
  | 'textiles'
  | 'decor'

export type ProductSubcategory = 
  | 'chairs'
  | 'sofas'
  | 'benches'
  | 'bed-sets'
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

export type RoomType = 'Living Room' | 'Bedroom' | 'Kitchen' | 'Home Office' | 'Dining Room' | 'Dining Area' | 'Guest Room' | 'Bathroom' | 'Kid\'s Room' | 'Entryway/Foyer' | 'Patio/Deck' | 'Master/Primary Suite'

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
  | 'contemporary'
  | 'eclectic'
  | 'natural'
  | 'urban'
  | 'edgy'

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
  | 'functional'

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

// Enhanced types for MVP improvements
export type FurniturePriority = 'essential' | 'recommended' | 'optional'

export type RoomCompatibility = {
  isCompatible: boolean
  priority: FurniturePriority
  placementContext: string[]
  replacementFor: string[]
}

export type SpatialContext = {
  placementPriority: 'primary' | 'secondary' | 'accent'
  spaceRequirement: 'small' | 'medium' | 'large'
  roomZones: string[]
}

export type StyleCoherence = {
  dominantStyle: ProductStyle
  secondaryStyles: ProductStyle[]
  colorHarmony: ColorTag[]
  materialHarmony: MaterialTag[]
}

export type Product = {
  id: string
  name: string
  style: ProductStyle
  category: ProductCategory
  subcategory: ProductSubcategory
  description: string
  price: number
  imageUrl: string
  inStock: boolean
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  weight?: number
  materials: MaterialTag[]
  styleAttributes: StyleTag[]
  colors: ColorTag[]
  functionality: FunctionalTag[]
  environmentTags: EnvironmentTag[]
  
  // Enhanced room compatibility (MVP improvement)
  roomCompatibility: {
    'Living Room': RoomCompatibility
    'Bedroom': RoomCompatibility
    'Kitchen': RoomCompatibility
    'Home Office': RoomCompatibility
    'Dining Room': RoomCompatibility
    'Bathroom': RoomCompatibility
  }
  
  // Spatial intelligence
  spatialContext: SpatialContext
  
  // Style coherence for AI matching
  styleCoherence: StyleCoherence
  
  // Lifestyle tags for enhanced matching
  lifestyleTags?: string[]
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