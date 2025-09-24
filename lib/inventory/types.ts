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

// New types for enhanced product matching
export type PlacementPriority = 'primary' | 'secondary' | 'accent'
export type SpaceRequirement = 'small' | 'medium' | 'large'
export type RoomZone = 'seating' | 'storage' | 'lighting' | 'decorative' | 'functional'
export type FurniturePriority = 'essential' | 'recommended' | 'optional'

export type RoomCompatibility = {
  isCompatible: boolean
  priority: FurniturePriority
  placementContext: string[]
  replacementFor: string[]
}

export type SpatialContext = {
  placementPriority: PlacementPriority
  spaceRequirement: SpaceRequirement
  roomZones: RoomZone[]
}

export type StyleCoherence = {
  dominantStyle: ProductStyle
  secondaryStyles: ProductStyle[]
  colorHarmony: ColorTag[]
  materialHarmony: MaterialTag[]
}

export type Product = {
  // Basic Info
  id: string
  name: string
  style: ProductStyle
  category: ProductCategory
  subcategory: ProductSubcategory
  description: string
  price: number
  imageUrl: string
  inStock: boolean
  
  // Physical Properties
  dimensions: {
    width: number    // in inches
    height: number   // in inches  
    depth: number    // in inches
  }
  weight?: number    // in pounds
  
  // Style & Aesthetic Tags
  materials: MaterialTag[]
  styleAttributes: StyleTag[]
  colors: ColorTag[]
  functionality: FunctionalTag[]
  environmentTags: EnvironmentTag[]
  
  // Room Compatibility (Enhanced)
  roomCompatibility: {
    'Living Room': RoomCompatibility
    'Bedroom': RoomCompatibility
    'Bathroom': RoomCompatibility
    'Kitchen': RoomCompatibility
    'Home Office': RoomCompatibility
    'Dining Room': RoomCompatibility
  }
  
  // Spatial Intelligence
  spatialContext: SpatialContext
  
  // Style Coherence (for AI matching)
  styleCoherence: StyleCoherence
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