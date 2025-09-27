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
  ///////////////////////////////
  // LIVING ROOM PRODUCTS
  ///////////////////////////////

  ///////////////////////////////
  // MODERN CLEAN - LIVING ROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "modern-clean-sofa-001",
    "name": "Milan Contemporary Sectional",
    "style": "MODERN",
    "category": "seating",
    "subcategory": "sofas",
    "description": "A sleek L-shaped sectional with clean geometric lines and premium light gray performance fabric, featuring low-profile chrome legs for a floating effect.",
    "price": 1850,
    "imageUrl": "/images/products/modern-clean/milan-contemporary-sectional.png",
    "inStock": true,
    "dimensions": {
      "width": 102,
      "height": 30,
      "depth": 64
    },
    "weight": 185,
    "materials": ["fabric", "metal"],
    "styleAttributes": ["sleek", "minimal", "contemporary"],
    "colors": ["light-tone", "neutral", "gray"],
    "functionality": ["seating", "multi-functional"],
    "environmentTags": ["natural-light", "open-plan", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center", "floating"],
        "replacementFor": ["sofa", "sectional", "loveseat"]
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["seating"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MINIMALIST", "CONTEMPORARY"],
      "colorHarmony": ["neutral", "white", "gray", "black"],
      "materialHarmony": ["metal", "fabric", "glass"]
    },
    "lifestyleTags": ["Minimalist", "Natural light lover", "Large space", "Modern living"]
  },
  {
    "id": "modern-clean-table-001",
    "name": "Axiom Glass Coffee Table",
    "style": "MODERN",
    "category": "tables",
    "subcategory": "coffee-tables",
    "description": "An architectural glass coffee table with a sleek steel base featuring clean intersecting lines and a clear tempered glass top.",
    "price": 680,
    "imageUrl": "/images/products/modern-clean/axiom-glass-coffee-table.png",
    "inStock": true,
    "dimensions": {
      "width": 48,
      "height": 16,
      "depth": 24
    },
    "weight": 75,
    "materials": ["glass", "metal"],
    "styleAttributes": ["sleek", "minimal", "elegant"],
    "colors": ["neutral", "light-tone"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["natural-light", "open-plan", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["coffee-table", "center-table", "ottoman"]
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["center"],
        "replacementFor": ["side-table"]
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "medium",
      "roomZones": ["seating", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MINIMALIST", "CONTEMPORARY"],
      "colorHarmony": ["neutral", "white", "light-tone"],
      "materialHarmony": ["glass", "metal", "fabric"]
    },
    "lifestyleTags": ["Minimalist", "Natural light lover", "Modern living", "Sleek aesthetic"]
  },
  {
    "id": "modern-clean-lamp-001",
    "name": "Nexus Arc Floor Lamp",
    "style": "MODERN",
    "category": "lighting",
    "subcategory": "floor-lamps",
    "description": "A sculptural arc floor lamp with brushed steel finish and integrated LED lighting, featuring a sleek marble base for stability.",
    "price": 425,
    "imageUrl": "/images/products/modern-clean/nexus-arc-floor-lamp.png",
    "inStock": true,
    "dimensions": {
      "width": 20,
      "height": 70,
      "depth": 50
    },
    "weight": 35,
    "materials": ["metal", "marble"],
    "styleAttributes": ["sleek", "minimal", "elegant"],
    "colors": ["neutral", "light-tone", "white"],
    "functionality": ["lighting"],
    "environmentTags": ["natural-light", "open-plan", "large-space", "high-ceiling"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner", "wall"],
        "replacementFor": ["floor-lamp", "table-lamp", "accent-lighting"]
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["corner"],
        "replacementFor": ["bedside-lamp", "reading-light"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner", "wall"],
        "replacementFor": ["desk-lamp", "task-lighting"]
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["corner"],
        "replacementFor": ["accent-lighting"]
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["lighting", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MINIMALIST", "CONTEMPORARY"],
      "colorHarmony": ["neutral", "white", "light-tone"],
      "materialHarmony": ["metal", "marble", "glass"]
    },
    "lifestyleTags": ["Minimalist", "Natural light lover", "Modern living", "Sleek aesthetic"]
  },

  {
    "id": "modern-clean-rug-001",
    "name": "Metro Geometric Area Rug",
    "style": "MODERN",
    "category": "textiles",
    "subcategory": "rugs",
    "description": "A sophisticated area rug featuring subtle geometric patterns in neutral tones with a premium low-pile construction for modern living spaces.",
    "price": 340,
    "imageUrl": "/images/products/modern-clean/metro-geometric-rug.png",
    "inStock": true,
    "dimensions": {
      "width": 96,
      "height": 1,
      "depth": 120
    },
    "weight": 25,
    "materials": ["fabric"],
    "styleAttributes": ["minimal", "sleek", "contemporary"],
    "colors": ["neutral", "light-tone", "beige", "gray"],
    "functionality": ["decorative"],
    "environmentTags": ["natural-light", "open-plan", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["area-rug", "carpet", "floor-covering"]
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["center"],
        "replacementFor": ["bedroom-rug", "bedside-rug"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["center"],
        "replacementFor": ["office-rug"]
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["dining-rug"]
      }
    },
    "spatialContext": {
      "placementPriority": "accent",
      "spaceRequirement": "large",
      "roomZones": ["decorative", "seating"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MINIMALIST", "CONTEMPORARY"],
      "colorHarmony": ["neutral", "beige", "gray", "light-tone"],
      "materialHarmony": ["fabric", "metal", "glass"]
    },
    "lifestyleTags": ["Minimalist", "Natural light lover", "Modern living", "Clean aesthetic"]
  },
  ///////////////////////////////
  // COZY TRADITIONAL - LIVING ROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "cozy-traditional-sofa-001",
    "name": "Heritage Tufted Chesterfield Sofa",
    "style": "VINTAGE",
    "category": "seating",
    "subcategory": "sofas",
    "description": "A classic three-seat Chesterfield sofa with deep button tufting, rolled arms, and rich cognac leather upholstery, featuring solid mahogany wood accents.",
    "price": 1950,
    "imageUrl": "/images/products/cozy-traditional/heritage-chesterfield-sofa.png",
    "inStock": true,
    "dimensions": {
      "width": 84,
      "height": 32,
      "depth": 38
    },
    "weight": 165,
    "materials": ["leather", "wood"],
    "styleAttributes": ["elegant", "cozy", "formal"],
    "colors": ["dark-tone", "brown"],
    "functionality": ["seating"],
    "environmentTags": ["low-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center", "wall"],
        "replacementFor": ["sofa", "sectional", "loveseat"]
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["wall"],
        "replacementFor": ["office-seating"]
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["seating"]
    },
    "styleCoherence": {
      "dominantStyle": "VINTAGE",
      "secondaryStyles": ["TRADITIONAL"],
      "colorHarmony": ["dark-tone", "brown", "beige", "neutral"],
      "materialHarmony": ["leather", "wood", "fabric"]
    },
    "lifestyleTags": ["Cozy homebody", "Traditional living", "Formal entertaining", "Quality craftsmanship"]
  },
  {
    "id": "cozy-traditional-table-001",
    "name": "Ashford Mahogany Coffee Table",
    "style": "VINTAGE",
    "category": "tables",
    "subcategory": "coffee-tables",
    "description": "An elegant mahogany coffee table with carved details, antiqued brass hardware, and a lower shelf for storage, finished in rich cherry stain.",
    "price": 850,
    "imageUrl": "/images/products/cozy-traditional/ashford-mahogany-coffee-table.png",
    "inStock": true,
    "dimensions": {
      "width": 48,
      "height": 18,
      "depth": 28
    },
    "weight": 85,
    "materials": ["wood", "metal"],
    "styleAttributes": ["elegant", "cozy", "formal"],
    "colors": ["dark-tone", "brown"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["low-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["coffee-table", "center-table", "ottoman"]
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["center"],
        "replacementFor": ["side-table"]
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "medium",
      "roomZones": ["seating", "storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "VINTAGE",
      "secondaryStyles": ["TRADITIONAL"],
      "colorHarmony": ["dark-tone", "brown", "beige"],
      "materialHarmony": ["wood", "leather", "metal"]
    },
    "lifestyleTags": ["Cozy homebody", "Storage seeker", "Traditional living", "Quality craftsmanship"]
  },
  {
    "id": "cozy-traditional-lamp-001",
    "name": "Westminster Brass Torchiere Lamp",
    "style": "VINTAGE",
    "category": "lighting",
    "subcategory": "floor-lamps",
    "description": "A stately torchiere floor lamp with antiqued brass finish, fluted column design, and warm fabric shade with gold lining for ambient lighting.",
    "price": 380,
    "imageUrl": "/images/products/cozy-traditional/westminster-brass-torchiere.png",
    "inStock": true,
    "dimensions": {
      "width": 18,
      "height": 72,
      "depth": 18
    },
    "weight": 28,
    "materials": ["metal", "fabric"],
    "styleAttributes": ["elegant", "cozy", "formal"],
    "colors": ["dark-tone", "beige", "neutral"],
    "functionality": ["lighting"],
    "environmentTags": ["low-light", "large-space", "high-ceiling"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner", "wall"],
        "replacementFor": ["floor-lamp", "table-lamp", "accent-lighting"]
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["corner"],
        "replacementFor": ["bedside-lamp", "reading-light"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner", "wall"],
        "replacementFor": ["desk-lamp", "task-lighting"]
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["corner"],
        "replacementFor": ["accent-lighting"]
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["lighting", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "VINTAGE",
      "secondaryStyles": ["TRADITIONAL"],
      "colorHarmony": ["dark-tone", "beige", "neutral", "brown"],
      "materialHarmony": ["metal", "fabric", "wood"]
    },
    "lifestyleTags": ["Cozy homebody", "Traditional living", "Warm lighting", "Quality craftsmanship"]
  },
  {
    "id": "cozy-traditional-rug-001",
    "name": "Kensington Persian Area Rug",
    "style": "VINTAGE",
    "category": "textiles",
    "subcategory": "rugs",
    "description": "A luxurious Persian-inspired area rug with intricate traditional patterns in rich burgundy, gold, and cream tones, featuring a dense pile construction.",
    "price": 680,
    "imageUrl": "/images/products/cozy-traditional/kensington-persian-rug.png",
    "inStock": true,
    "dimensions": {
      "width": 96,
      "height": 1,
      "depth": 132
    },
    "weight": 45,
    "materials": ["fabric"],
    "styleAttributes": ["elegant", "cozy", "formal"],
    "colors": ["dark-tone", "brown", "beige", "neutral"],
    "functionality": ["decorative"],
    "environmentTags": ["low-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["area-rug", "carpet", "floor-covering"]
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["center"],
        "replacementFor": ["bedroom-rug", "bedside-rug"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["center"],
        "replacementFor": ["office-rug"]
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["dining-rug"]
      }
    },
    "spatialContext": {
      "placementPriority": "accent",
      "spaceRequirement": "large",
      "roomZones": ["decorative", "seating"]
    },
    "styleCoherence": {
      "dominantStyle": "VINTAGE",
      "secondaryStyles": ["TRADITIONAL"],
      "colorHarmony": ["dark-tone", "brown", "beige", "neutral"],
      "materialHarmony": ["fabric", "wood", "leather"]
    },
    "lifestyleTags": ["Cozy homebody", "Traditional living", "Luxury comfort", "Quality craftsmanship"]
  },
  ///////////////////////////////
  // BOHO ECLECTIC - LIVING ROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "boho-eclectic-sofa-001",
    "name": "Marrakech Rattan Sectional",
    "style": "BOHO",
    "category": "seating",
    "subcategory": "sofas",
    "description": "A stunning L-shaped sectional with natural rattan frame and plush terracotta-colored cushions, featuring organic curves and handwoven details.",
    "price": 1650,
    "imageUrl": "/images/products/boho-eclectic/marrakech-rattan-sectional.png",
    "inStock": true,
    "dimensions": {
      "width": 94,
      "height": 34,
      "depth": 68
    },
    "weight": 145,
    "materials": ["rattan", "fabric"],
    "styleAttributes": ["casual", "cozy", "eclectic"],
    "colors": ["neutral", "brown", "beige"],
    "functionality": ["seating", "multi-functional"],
    "environmentTags": ["natural-light", "large-space", "open-plan"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center", "corner"],
        "replacementFor": ["sofa", "sectional", "loveseat"]
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["seating"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["MODERN", "MINIMALIST"],
      "colorHarmony": ["neutral", "brown", "beige", "dark-tone"],
      "materialHarmony": ["rattan", "fabric", "wood"]
    },
    "lifestyleTags": ["Natural light lover", "Eco-conscious", "Artistic living", "Casual comfort"]
  },
  {
    "id": "boho-eclectic-table-001",
    "name": "Sahara Live Edge Coffee Table",
    "style": "BOHO",
    "category": "tables",
    "subcategory": "coffee-tables",
    "description": "A captivating live edge acacia wood coffee table with natural grain patterns and hairpin metal legs, celebrating organic imperfections and artisanal craftsmanship.",
    "price": 580,
    "imageUrl": "/images/products/boho-eclectic/sahara-live-edge-table.png",
    "inStock": true,
    "dimensions": {
      "width": 44,
      "height": 16,
      "depth": 24
    },
    "weight": 65,
    "materials": ["wood", "metal"],
    "styleAttributes": ["casual", "eclectic", "rustic"],
    "colors": ["brown", "neutral", "dark-tone"],
    "functionality": ["decorative", "functional"],
    "environmentTags": ["natural-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["coffee-table", "center-table", "ottoman"]
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["center"],
        "replacementFor": ["side-table"]
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "medium",
      "roomZones": ["seating", "functional", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["brown", "neutral", "beige"],
      "materialHarmony": ["wood", "rattan", "metal"]
    },
    "lifestyleTags": ["Natural light lover", "Eco-conscious", "Artistic living", "Organic materials"]
  },
  {
    "id": "boho-eclectic-lamp-001",
    "name": "Casablanca Macrame Floor Lamp",
    "style": "BOHO",
    "category": "lighting",
    "subcategory": "floor-lamps",
    "description": "An artistic floor lamp featuring handwoven macrame shade with fringe details, natural wood tripod base, and warm ambient lighting for bohemian spaces.",
    "price": 295,
    "imageUrl": "/images/products/boho-eclectic/casablanca-macrame-lamp.png",
    "inStock": true,
    "dimensions": {
      "width": 22,
      "height": 58,
      "depth": 22
    },
    "weight": 18,
    "materials": ["fabric", "wood"],
    "styleAttributes": ["casual", "cozy", "eclectic"],
    "colors": ["neutral", "beige", "brown"],
    "functionality": ["lighting", "decorative"],
    "environmentTags": ["natural-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner", "wall"],
        "replacementFor": ["floor-lamp", "table-lamp", "accent-lighting"]
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner"],
        "replacementFor": ["bedside-lamp", "reading-light"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["corner"],
        "replacementFor": ["accent-lighting"]
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["corner"],
        "replacementFor": ["accent-lighting"]
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["lighting", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["neutral", "beige", "brown"],
      "materialHarmony": ["fabric", "wood", "rattan"]
    },
    "lifestyleTags": ["Natural light lover", "Eco-conscious", "Artistic living", "Handcrafted items"]
  },
  {
    "id": "boho-eclectic-rug-001",
    "name": "Oasis Kilim Area Rug",
    "style": "BOHO",
    "category": "textiles",
    "subcategory": "rugs",
    "description": "A vibrant flat-weave kilim rug featuring bold geometric patterns in sunset colors of terracotta, mustard, and cream with vintage-inspired tribal motifs.",
    "price": 420,
    "imageUrl": "/images/products/boho-eclectic/oasis-kilim-rug.png",
    "inStock": true,
    "dimensions": {
      "width": 96,
      "height": 1,
      "depth": 120
    },
    "weight": 32,
    "materials": ["fabric"],
    "styleAttributes": ["casual", "eclectic", "cozy"],
    "colors": ["neutral", "brown", "beige"],
    "functionality": ["decorative"],
    "environmentTags": ["natural-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["area-rug", "carpet", "floor-covering"]
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["bedroom-rug", "bedside-rug"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["office-rug"]
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["dining-rug"]
      }
    },
    "spatialContext": {
      "placementPriority": "accent",
      "spaceRequirement": "large",
      "roomZones": ["decorative", "seating"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["VINTAGE", "MODERN"],
      "colorHarmony": ["neutral", "brown", "beige"],
      "materialHarmony": ["fabric", "wood", "rattan"]
    },
    "lifestyleTags": ["Natural light lover", "Eco-conscious", "Artistic living", "Vibrant patterns"]
  },
  ///////////////////////////////
  // WARM MINIMALIST - LIVING ROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "warm-minimalist-sofa-001",
    "name": "Zen Curved Boucle Sectional",
    "style": "MINIMALIST",
    "category": "seating",
    "subcategory": "sofas",
    "description": "A gracefully curved sectional in soft cream boucle fabric with organic rounded edges and natural oak legs, embodying serene minimalist comfort.",
    "price": 1720,
    "imageUrl": "/images/products/warm-minimalist/zen-curved-boucle-sectional.png",
    "inStock": true,
    "dimensions": {
      "width": 88,
      "height": 31,
      "depth": 62
    },
    "weight": 155,
    "materials": ["fabric", "wood"],
    "styleAttributes": ["minimal", "cozy", "natural"],
    "colors": ["light-tone", "neutral", "beige"],
    "functionality": ["seating", "multi-functional"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center", "floating"],
        "replacementFor": ["sofa", "sectional", "loveseat"]
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["seating"]
    },
    "styleCoherence": {
      "dominantStyle": "MINIMALIST",
      "secondaryStyles": ["MODERN", "BOHO"],
      "colorHarmony": ["light-tone", "neutral", "beige", "white"],
      "materialHarmony": ["fabric", "wood", "rattan"]
    },
    "lifestyleTags": ["Minimalist", "Natural light lover", "Small space living", "Cozy homebody"]
  },
  {
    "id": "warm-minimalist-table-001",
    "name": "Harmony Oval Oak Coffee Table",
    "style": "MINIMALIST",
    "category": "tables",
    "subcategory": "coffee-tables",
    "description": "An elegant oval coffee table crafted from solid white oak with gentle rounded edges and a smooth natural finish that celebrates the wood's organic grain patterns.",
    "price": 620,
    "imageUrl": "/images/products/warm-minimalist/harmony-oval-oak-table.png",
    "inStock": true,
    "dimensions": {
      "width": 48,
      "height": 15,
      "depth": 28
    },
    "weight": 68,
    "materials": ["wood"],
    "styleAttributes": ["minimal", "natural", "cozy"],
    "colors": ["light-tone", "beige", "neutral"],
    "functionality": ["decorative", "functional"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["coffee-table", "center-table", "ottoman"]
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["center"],
        "replacementFor": ["side-table"]
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "medium",
      "roomZones": ["seating", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MINIMALIST",
      "secondaryStyles": ["MODERN", "BOHO"],
      "colorHarmony": ["light-tone", "beige", "neutral"],
      "materialHarmony": ["wood", "fabric", "rattan"]
    },
    "lifestyleTags": ["Minimalist", "Natural light lover", "Eco-conscious", "Cozy homebody"]
  },
  {
    "id": "warm-minimalist-lamp-001",
    "name": "Serenity Paper Floor Lamp",
    "style": "MINIMALIST",
    "category": "lighting",
    "subcategory": "floor-lamps",
    "description": "A serene floor lamp with handcrafted paper shade and natural ash wood base, creating soft diffused lighting perfect for peaceful minimalist spaces.",
    "price": 240,
    "imageUrl": "/images/products/warm-minimalist/serenity-paper-floor-lamp.png",
    "inStock": true,
    "dimensions": {
      "width": 16,
      "height": 56,
      "depth": 16
    },
    "weight": 12,
    "materials": ["wood", "fabric"],
    "styleAttributes": ["minimal", "cozy", "natural"],
    "colors": ["light-tone", "neutral", "white"],
    "functionality": ["lighting", "decorative"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner", "wall"],
        "replacementFor": ["floor-lamp", "table-lamp", "accent-lighting"]
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner"],
        "replacementFor": ["bedside-lamp", "reading-light"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner", "wall"],
        "replacementFor": ["task-lighting", "accent-lighting"]
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["corner"],
        "replacementFor": ["accent-lighting"]
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["lighting", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "MINIMALIST",
      "secondaryStyles": ["MODERN", "BOHO"],
      "colorHarmony": ["light-tone", "neutral", "white", "beige"],
      "materialHarmony": ["wood", "fabric", "rattan"]
    },
    "lifestyleTags": ["Minimalist", "Natural light lover", "Cozy homebody", "Peaceful living"]
  },
  {
    "id": "warm-minimalist-rug-002",
    "name": "Hygge Plush Shag Area Rug",
    "style": "MINIMALIST",
    "category": "textiles",
    "subcategory": "rugs",
    "description": "A luxuriously soft high-pile shag rug in warm cream tones, bringing cozy texture and tactile comfort to minimalist spaces while maintaining serene neutrality.",
    "price": 380,
    "imageUrl": "/images/products/warm-minimalist/hygge-plush-shag-rug.png",
    "inStock": true,
    "dimensions": {
      "width": 96,
      "height": 2,
      "depth": 120
    },
    "weight": 35,
    "materials": ["fabric"],
    "styleAttributes": ["cozy", "minimal", "natural"],
    "colors": ["light-tone", "neutral", "beige"],
    "functionality": ["decorative"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["area-rug", "carpet", "floor-covering"]
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["bedroom-rug", "bedside-rug"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["office-rug"]
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["center"],
        "replacementFor": ["dining-rug"]
      }
    },
    "spatialContext": {
      "placementPriority": "accent",
      "spaceRequirement": "large",
      "roomZones": ["decorative", "seating"]
    },
    "styleCoherence": {
      "dominantStyle": "MINIMALIST",
      "secondaryStyles": ["MODERN", "BOHO"],
      "colorHarmony": ["light-tone", "neutral", "beige", "white"],
      "materialHarmony": ["fabric", "wood", "rattan"]
    },
    "lifestyleTags": ["Minimalist", "Natural light lover", "Cozy homebody", "Tactile comfort"]
  },
  ///////////////////////////////
  // INDUSTRIAL - LIVING ROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "industrial-loft-sofa-001",
    "name": "Brooklyn Steel Frame Sectional",
    "style": "INDUSTRIAL",
    "category": "seating",
    "subcategory": "sofas",
    "description": "A commanding L-shaped sectional with exposed black steel frame and distressed charcoal leather cushions, embodying raw urban sophistication.",
    "price": 1875,
    "imageUrl": "/images/products/industrial-loft/brooklyn-steel-sectional.png",
    "inStock": true,
    "dimensions": {
      "width": 98,
      "height": 30,
      "depth": 66
    },
    "weight": 195,
    "materials": ["leather", "metal"],
    "styleAttributes": ["urban", "edgy", "minimal"],
    "colors": ["dark-tone", "black", "gray"],
    "functionality": ["seating", "multi-functional"],
    "environmentTags": ["high-ceiling", "large-space", "open-plan"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center", "floating"],
        "replacementFor": ["sofa", "sectional", "loveseat"]
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["wall"],
        "replacementFor": ["office-seating"]
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["seating"]
    },
    "styleCoherence": {
      "dominantStyle": "INDUSTRIAL",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["dark-tone", "black", "gray", "neutral"],
      "materialHarmony": ["metal", "leather", "wood"]
    },
    "lifestyleTags": ["Urban living", "High ceiling spaces", "Modern living", "Edgy aesthetic"]
  },
  {
    "id": "industrial-loft-table-001",
    "name": "Foundry Reclaimed Wood Coffee Table",
    "style": "INDUSTRIAL",
    "category": "tables",
    "subcategory": "coffee-tables",
    "description": "A striking coffee table featuring thick reclaimed barn wood top with visible grain and weathering, supported by heavy black iron pipe legs with industrial joints.",
    "price": 720,
    "imageUrl": "/images/products/industrial-loft/foundry-reclaimed-coffee-table.png",
    "inStock": true,
    "dimensions": {
      "width": 50,
      "height": 18,
      "depth": 26
    },
    "weight": 95,
    "materials": ["wood", "metal"],
    "styleAttributes": ["urban", "rustic", "edgy"],
    "colors": ["dark-tone", "brown", "black"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["high-ceiling", "large-space", "open-plan"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["coffee-table", "center-table", "ottoman"]
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["center"],
        "replacementFor": ["side-table"]
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "medium",
      "roomZones": ["seating", "functional", "storage"]
    },
    "styleCoherence": {
      "dominantStyle": "INDUSTRIAL",
      "secondaryStyles": ["VINTAGE", "MODERN"],
      "colorHarmony": ["dark-tone", "brown", "black"],
      "materialHarmony": ["wood", "metal", "leather"]
    },
    "lifestyleTags": ["Urban living", "High ceiling spaces", "Storage seeker", "Raw materials"]
  },
  {
    "id": "industrial-loft-lamp-001",
    "name": "Forge Edison Tripod Floor Lamp",
    "style": "INDUSTRIAL",
    "category": "lighting",
    "subcategory": "floor-lamps",
    "description": "A bold tripod floor lamp with black iron pipe construction, exposed Edison bulb, and industrial-grade metal finish, creating dramatic ambient lighting.",
    "price": 350,
    "imageUrl": "/images/products/industrial-loft/forge-edison-tripod-lamp.png",
    "inStock": true,
    "dimensions": {
      "width": 24,
      "height": 62,
      "depth": 24
    },
    "weight": 32,
    "materials": ["metal"],
    "styleAttributes": ["urban", "edgy", "minimal"],
    "colors": ["dark-tone", "black"],
    "functionality": ["lighting"],
    "environmentTags": ["high-ceiling", "large-space", "open-plan"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner", "wall"],
        "replacementFor": ["floor-lamp", "table-lamp", "accent-lighting"]
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["corner"],
        "replacementFor": ["bedside-lamp", "reading-light"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner", "wall"],
        "replacementFor": ["task-lighting", "accent-lighting"]
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["corner"],
        "replacementFor": ["accent-lighting"]
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["lighting", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "INDUSTRIAL",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["dark-tone", "black", "gray"],
      "materialHarmony": ["metal", "wood", "leather"]
    },
    "lifestyleTags": ["Urban living", "High ceiling spaces", "Edgy aesthetic", "Dramatic lighting"]
  },
  {
    "id": "industrial-loft-rug-001",
    "name": "Warehouse Distressed Area Rug",
    "style": "INDUSTRIAL",
    "category": "textiles",
    "subcategory": "rugs",
    "description": "A bold area rug with distressed leather-look pattern in charcoal and black tones, featuring urban-inspired geometric designs and weathered textures.",
    "price": 480,
    "imageUrl": "/images/products/industrial-loft/warehouse-distressed-rug.png",
    "inStock": true,
    "dimensions": {
      "width": 96,
      "height": 1,
      "depth": 120
    },
    "weight": 38,
    "materials": ["fabric"],
    "styleAttributes": ["urban", "edgy", "rustic"],
    "colors": ["dark-tone", "black", "gray"],
    "functionality": ["decorative"],
    "environmentTags": ["high-ceiling", "large-space", "open-plan"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["area-rug", "carpet", "floor-covering"]
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["center"],
        "replacementFor": ["bedroom-rug", "bedside-rug"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["office-rug"]
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "optional",
        "placementContext": ["center"],
        "replacementFor": ["dining-rug"]
      }
    },
    "spatialContext": {
      "placementPriority": "accent",
      "spaceRequirement": "large",
      "roomZones": ["decorative", "seating"]
    },
    "styleCoherence": {
      "dominantStyle": "INDUSTRIAL",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["dark-tone", "black", "gray"],
      "materialHarmony": ["fabric", "metal", "leather"]
    },
    "lifestyleTags": ["Urban living", "High ceiling spaces", "Edgy aesthetic", "Bold patterns"]
  },
  ///////////////////////////////
  // DINING ROOM PRODUCTS
  ///////////////////////////////

  ///////////////////////////////
  // MODERN CLEAN - DINING ROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "modern-clean-table-003",
    "name": "Prism Glass Extension Dining Table",
    "style": "MODERN",
    "category": "tables",
    "subcategory": "dining-tables",
    "description": "A stunning rectangular dining table with clear tempered glass top and polished steel pedestal base, featuring clean lines and a sophisticated extension mechanism.",
    "price": 1380,
    "imageUrl": "/images/products/modern-clean/dining-room/prism-glass-extension-dining-table.png",
    "inStock": true,
    "dimensions": {
      "width": 72,
      "height": 30,
      "depth": 42
    },
    "weight": 145,
    "materials": ["glass", "metal"],
    "styleAttributes": ["sleek", "minimal", "elegant"],
    "colors": ["neutral", "light-tone"],
    "functionality": ["multi-functional"],
    "environmentTags": ["natural-light", "open-plan", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["dining-table", "formal-table"]
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MINIMALIST", "CONTEMPORARY"],
      "colorHarmony": ["neutral", "white", "light-tone"],
      "materialHarmony": ["glass", "metal", "fabric"]
    },
    "lifestyleTags": ["Frequent entertainer", "Minimalist", "Natural light lover", "Open plan living"]
  },
  {
    "id": "modern-clean-light-001",
    "name": "Nexus Geometric Pendant Light",
    "style": "MODERN",
    "category": "lighting",
    "subcategory": "pendant-lights",
    "description": "A striking geometric pendant light with brushed steel frame and integrated LED panels, featuring adjustable height and contemporary angular design for modern kitchens.",
    "price": 285,
    "imageUrl": "/images/products/modern-clean/dining-room/nexus-geometric-pendant-light.png",
    "inStock": true,
    "dimensions": {
      "width": 18,
      "height": 12,
      "depth": 18
    },
    "weight": 8,
    "materials": ["metal"],
    "styleAttributes": ["sleek", "minimal", "contemporary"],
    "colors": ["neutral", "light-tone"],
    "functionality": ["lighting"],
    "environmentTags": ["natural-light", "open-plan", "high-ceiling"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["center"],
        "replacementFor": ["chandelier", "dining-light"]
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "small",
      "roomZones": ["lighting", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MINIMALIST", "CONTEMPORARY"],
      "colorHarmony": ["neutral", "white", "light-tone"],
      "materialHarmony": ["metal", "glass", "fabric"]
    },
    "lifestyleTags": ["Task lighting", "Modern living", "Energy efficient", "Open plan living"]
  },
  ///////////////////////////////
  // COZY TRADITIONAL - DINING ROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "cozy-traditional-table-002",
    "name": "Windsor Mahogany Dining Table",
    "style": "VINTAGE",
    "category": "tables",
    "subcategory": "dining-tables",
    "description": "An elegant oval dining table crafted from solid mahogany with a carved pedestal base and rich cherry finish, featuring timeless traditional proportions and expandable design.",
    "price": 1650,
    "imageUrl": "/images/products/cozy-traditional/dining-room/windsor-mahogany-dining-table.png",
    "inStock": true,
    "dimensions": {
      "width": 76,
      "height": 30,
      "depth": 44
    },
    "weight": 185,
    "materials": ["wood"],
    "styleAttributes": ["elegant", "cozy", "formal"],
    "colors": ["dark-tone", "brown"],
    "functionality": ["multi-functional"],
    "environmentTags": ["low-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["dining-table", "formal-table"]
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["functional"]
    },
    "styleCoherence": {
      "dominantStyle": "VINTAGE",
      "secondaryStyles": ["TRADITIONAL"],
      "colorHarmony": ["dark-tone", "brown", "beige"],
      "materialHarmony": ["wood", "leather", "metal"]
    },
    "lifestyleTags": ["Frequent entertainer", "Traditional elegance", "Family gatherings", "Formal dining"]
  },
  {
    "id": "cozy-traditional-light-001",
    "name": "Versailles Crystal Chandelier",
    "style": "VINTAGE",
    "category": "lighting",
    "subcategory": "pendant-lights",
    "description": "A magnificent crystal chandelier with antiqued brass frame and cascading crystal drops, featuring six candelabra-style lights for elegant traditional dining rooms.",
    "price": 850,
    "imageUrl": "/images/products/cozy-traditional/dining-room/versailles-crystal-chandelier.png",
    "inStock": true,
    "dimensions": {
      "width": 28,
      "height": 24,
      "depth": 28
    },
    "weight": 35,
    "materials": ["metal", "glass"],
    "styleAttributes": ["elegant", "formal", "cozy"],
    "colors": ["neutral", "beige"],
    "functionality": ["lighting", "decorative"],
    "environmentTags": ["low-light", "large-space", "high-ceiling"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["chandelier", "dining-light", "pendant-light"]
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["lighting", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "VINTAGE",
      "secondaryStyles": ["TRADITIONAL"],
      "colorHarmony": ["neutral", "beige", "dark-tone"],
      "materialHarmony": ["metal", "glass", "wood"]
    },
    "lifestyleTags": ["Frequent entertainer", "Traditional elegance", "Luxury seeker", "Formal dining"]
  },
  ///////////////////////////////
  // BOHO ECLECTIC - DINING ROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "boho-eclectic-table-002",
    "name": "Nomad Reclaimed Teak Dining Table",
    "style": "BOHO",
    "category": "tables",
    "subcategory": "dining-tables",
    "description": "A captivating rectangular dining table featuring reclaimed teak wood top with natural grain variations and a handcrafted black iron hairpin base, celebrating global artisan traditions.",
    "price": 1420,
    "imageUrl": "/images/products/boho-eclectic/dining-room/nomad-reclaimed-teak-dining-table.png",
    "inStock": true,
    "dimensions": {
      "width": 72,
      "height": 30,
      "depth": 36
    },
    "weight": 155,
    "materials": ["wood", "metal"],
    "styleAttributes": ["casual", "eclectic", "rustic"],
    "colors": ["brown", "neutral", "dark-tone"],
    "functionality": ["multi-functional"],
    "environmentTags": ["natural-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["dining-table", "farmhouse-table"]
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["functional"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["brown", "neutral", "beige"],
      "materialHarmony": ["wood", "rattan", "metal"]
    },
    "lifestyleTags": ["Eco-conscious", "Global traveler", "Casual dining", "Natural living"]
  },
  {
    "id": "boho-eclectic-light-001",
    "name": "Bali Woven Rattan Pendant Light",
    "style": "BOHO",
    "category": "lighting",
    "subcategory": "pendant-lights",
    "description": "An artistic oversized pendant light with handwoven natural rattan shade in organic bell shape, creating warm filtered lighting and global bohemian ambiance.",
    "price": 320,
    "imageUrl": "/images/products/boho-eclectic/dining-room/bali-woven-rattan-pendant-light.png",
    "inStock": true,
    "dimensions": {
      "width": 24,
      "height": 18,
      "depth": 24
    },
    "weight": 12,
    "materials": ["rattan"],
    "styleAttributes": ["casual", "eclectic", "cozy"],
    "colors": ["neutral", "brown", "beige"],
    "functionality": ["lighting", "decorative"],
    "environmentTags": ["natural-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["pendant-light", "dining-light", "chandelier"]
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "medium",
      "roomZones": ["lighting", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["neutral", "brown", "beige"],
      "materialHarmony": ["rattan", "wood", "fabric"]
    },
    "lifestyleTags": ["Global traveler", "Natural living", "Handcrafted appreciation", "Casual dining"]
  },
  ///////////////////////////////
  // WARM MINIMALIST - DINING ROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "warm-minimalist-table-002",
    "name": "Zen White Oak Dining Table",
    "style": "MINIMALIST",
    "category": "tables",
    "subcategory": "dining-tables",
    "description": "A serene rectangular dining table crafted from solid white oak with gentle rounded edges and a natural matte finish, embodying Japandi minimalism and organic warmth.",
    "price": 1180,
    "imageUrl": "/images/products/warm-minimalist/dining-room/zen-white-oak-dining-table.png",
    "inStock": true,
    "dimensions": {
      "width": 72,
      "height": 29,
      "depth": 36
    },
    "weight": 135,
    "materials": ["wood"],
    "styleAttributes": ["minimal", "natural", "cozy"],
    "colors": ["light-tone", "beige", "neutral"],
    "functionality": ["multi-functional"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["dining-table", "minimalist-table"]
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "medium",
      "roomZones": ["functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MINIMALIST",
      "secondaryStyles": ["MODERN", "BOHO"],
      "colorHarmony": ["light-tone", "beige", "neutral"],
      "materialHarmony": ["wood", "fabric", "rattan"]
    },
    "lifestyleTags": ["Minimalist", "Natural living", "Mindful dining", "Small space living"]
  },
  {
    "id": "warm-minimalist-light-001",
    "name": "Akari Organic Paper Pendant Light",
    "style": "MINIMALIST",
    "category": "lighting",
    "subcategory": "pendant-lights",
    "description": "A sculptural pendant light with handcrafted white paper shade in organic teardrop form and natural ash wood accent, creating soft diffused lighting for serene dining spaces.",
    "price": 180,
    "imageUrl": "/images/products/warm-minimalist/dining-room/akari-organic-paper-pendant-light.png",
    "inStock": true,
    "dimensions": {
      "width": 16,
      "height": 20,
      "depth": 16
    },
    "weight": 4,
    "materials": ["fabric", "wood"],
    "styleAttributes": ["minimal", "cozy", "natural"],
    "colors": ["light-tone", "neutral", "white"],
    "functionality": ["lighting", "decorative"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["pendant-light", "dining-light", "minimalist-lighting"]
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "small",
      "roomZones": ["lighting", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "MINIMALIST",
      "secondaryStyles": ["MODERN", "BOHO"],
      "colorHarmony": ["light-tone", "neutral", "white", "beige"],
      "materialHarmony": ["fabric", "wood", "rattan"]
    },
    "lifestyleTags": ["Minimalist", "Natural living", "Soft lighting lover", "Mindful dining"]
  },
  ///////////////////////////////
  // INDUSTRIAL - DINING ROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "industrial-loft-table-002",
    "name": "Foundry Steel & Wood Dining Table",
    "style": "INDUSTRIAL",
    "category": "tables",
    "subcategory": "dining-tables",
    "description": "A commanding rectangular dining table featuring thick reclaimed barn wood top with raw edges and a heavy black steel I-beam base, celebrating industrial heritage and urban sophistication.",
    "price": 1580,
    "imageUrl": "/images/products/industrial-loft/dining-room/foundry-steel-reclaimed-wood-dining-table.png",
    "inStock": true,
    "dimensions": {
      "width": 84,
      "height": 30,
      "depth": 42
    },
    "weight": 220,
    "materials": ["wood", "metal"],
    "styleAttributes": ["urban", "edgy", "rustic"],
    "colors": ["dark-tone", "brown", "black"],
    "functionality": ["multi-functional"],
    "environmentTags": ["high-ceiling", "large-space", "open-plan"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center"],
        "replacementFor": ["dining-table", "industrial-table"]
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["functional"]
    },
    "styleCoherence": {
      "dominantStyle": "INDUSTRIAL",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["dark-tone", "brown", "black"],
      "materialHarmony": ["wood", "metal", "leather"]
    },
    "lifestyleTags": ["Urban living", "Industrial aesthetic", "Loft dwelling", "Bold entertaining"]
  },
  ///////////////////////////////
  // BEDROOM PRODUCTS
  ///////////////////////////////

  ///////////////////////////////
  // MODERN CLEAN - BEDROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "modern-clean-bedding-001",
    "name": "Milan Platform Bed Set",
    "style": "MODERN",
    "category": "bed sets",
    "subcategory": "bed-sets",
    "description": "A sleek platform bed set with low-profile walnut frame, premium white cotton bedding, and geometric accent pillows, embodying contemporary minimalist bedroom design.",
    "price": 1680,
    "imageUrl": "/images/products/modern-clean/bedroom/milan-platform-bed-set.png",
    "inStock": true,
    "dimensions": {
      "width": 84,
      "height": 36,
      "depth": 90
    },
    "weight": 145,
    "materials": ["wood", "fabric"],
    "styleAttributes": ["sleek", "minimal", "contemporary"],
    "colors": ["neutral", "white", "light-tone"],
    "functionality": ["seating", "storage"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center", "wall"],
        "replacementFor": ["bed", "bedding-set", "platform-bed"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["seating"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MINIMALIST", "CONTEMPORARY"],
      "colorHarmony": ["neutral", "white", "light-tone"],
      "materialHarmony": ["wood", "fabric", "metal"]
    },
    "lifestyleTags": ["Minimalist", "Modern living", "Clean aesthetic", "Quality sleep"]
  },
  {
    "id": "modern-clean-nightstand-001",
    "name": "Axis Floating Nightstand",
    "style": "MODERN",
    "category": "storage",
    "subcategory": "nightstands",
    "description": "A sleek wall-mounted nightstand with hidden mounting system, single drawer with soft-close mechanism, and integrated wireless charging pad for modern convenience.",
    "price": 285,
    "imageUrl": "/images/products/modern-clean/bedroom/axis-floating-nightstand.png",
    "inStock": true,
    "dimensions": {
      "width": 24,
      "height": 6,
      "depth": 16
    },
    "weight": 18,
    "materials": ["wood", "metal"],
    "styleAttributes": ["sleek", "minimal", "contemporary"],
    "colors": ["neutral", "light-tone"],
    "functionality": ["storage", "multi-functional"],
    "environmentTags": ["small-space", "natural-light"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["nightstand", "bedside-table"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MINIMALIST", "CONTEMPORARY"],
      "colorHarmony": ["neutral", "white", "light-tone"],
      "materialHarmony": ["wood", "metal", "fabric"]
    },
    "lifestyleTags": ["Tech enthusiast", "Small space living", "Minimalist", "Modern convenience"]
  },
  {
    "id": "modern-clean-dresser-001",
    "name": "Prism Low Profile Dresser",
    "style": "MODERN",
    "category": "storage",
    "subcategory": "dressers",
    "description": "A sophisticated low-profile dresser with six soft-close drawers, walnut wood finish, and brushed steel hairpin legs, combining ample storage with contemporary elegance.",
    "price": 950,
    "imageUrl": "/images/products/modern-clean/bedroom/prism-low-profile-dresser.png",
    "inStock": true,
    "dimensions": {
      "width": 60,
      "height": 30,
      "depth": 18
    },
    "weight": 95,
    "materials": ["wood", "metal"],
    "styleAttributes": ["sleek", "minimal", "elegant"],
    "colors": ["neutral", "light-tone"],
    "functionality": ["storage", "multi-functional"],
    "environmentTags": ["natural-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["dresser", "chest", "storage"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "medium",
      "roomZones": ["storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MINIMALIST", "CONTEMPORARY"],
      "colorHarmony": ["neutral", "light-tone", "white"],
      "materialHarmony": ["wood", "metal", "fabric"]
    },
    "lifestyleTags": ["Storage seeker", "Minimalist", "Modern living", "Organization focused"]
  },
  {
    "id": "modern-clean-bedside-lamp-001",
    "name": "Nexus Bedside Lamp",
    "style": "MODERN",
    "category": "lighting",
    "subcategory": "table-lamps",
    "description": "A sleek adjustable bedside lamp with brushed steel arm, LED reading light, and touch-sensitive dimming controls for personalized bedroom lighting.",
    "price": 165,
    "imageUrl": "/images/products/modern-clean/bedroom/nexus-bedside-lamp.png",
    "inStock": true,
    "dimensions": {
      "width": 8,
      "height": 18,
      "depth": 12
    },
    "weight": 6,
    "materials": ["metal"],
    "styleAttributes": ["sleek", "minimal", "contemporary"],
    "colors": ["neutral", "light-tone"],
    "functionality": ["lighting", "multi-functional"],
    "environmentTags": ["small-space", "natural-light"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["bedside-lamp", "reading-light", "table-lamp"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["wall"],
        "replacementFor": ["desk-lamp", "task-lighting"]
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["lighting", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MINIMALIST", "CONTEMPORARY"],
      "colorHarmony": ["neutral", "light-tone", "white"],
      "materialHarmony": ["metal", "wood", "fabric"]
    },
    "lifestyleTags": ["Tech enthusiast", "Night reader", "Modern convenience", "Adjustable lighting"]
  },
  ///////////////////////////////
  // COZY TRADITIONAL - BEDROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "cozy-traditional-bedding-001",
    "name": "Hampton Upholstered Bedding Set",
    "style": "VINTAGE",
    "category": "bed sets",
    "subcategory": "bed-sets",
    "description": "A refined upholstered panel bed set with linen-gray fabric headboard, weathered oak frame, and soft neutral bedding with subtle pattern mixing for transitional elegance.",
    "price": 1850,
    "imageUrl": "/images/products/cozy-traditional/bedroom/hampton-upholstered-bedding-set.png",
    "inStock": true,
    "dimensions": {
      "width": 88,
      "height": 58,
      "depth": 90
    },
    "weight": 165,
    "materials": ["wood", "fabric"],
    "styleAttributes": ["elegant", "cozy", "casual"],
    "colors": ["neutral", "beige", "light-tone"],
    "functionality": ["seating", "decorative"],
    "environmentTags": ["natural-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center", "wall"],
        "replacementFor": ["bed", "bedding-set", "upholstered-bed"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["seating", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "VINTAGE",
      "secondaryStyles": ["MODERN", "MINIMALIST"],
      "colorHarmony": ["neutral", "beige", "light-tone"],
      "materialHarmony": ["wood", "fabric", "metal"]
    },
    "lifestyleTags": ["Transitional style", "Comfort seeker", "Relaxed elegance", "Neutral palette lover"]
  },
  {
    "id": "cozy-traditional-nightstand-001",
    "name": "Savannah Two-Tone Nightstand",
    "style": "VINTAGE",
    "category": "storage",
    "subcategory": "nightstands",
    "description": "A charming two-drawer nightstand featuring weathered oak top with soft white painted base, brushed nickel hardware, and open shelf storage for transitional bedroom styling.",
    "price": 365,
    "imageUrl": "/images/products/cozy-traditional/bedroom/savannah-two-tone-nightstand.png",
    "inStock": true,
    "dimensions": {
      "width": 26,
      "height": 28,
      "depth": 18
    },
    "weight": 42,
    "materials": ["wood", "metal"],
    "styleAttributes": ["elegant", "cozy", "casual"],
    "colors": ["neutral", "white", "light-tone"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["natural-light", "small-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["nightstand", "bedside-table"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "VINTAGE",
      "secondaryStyles": ["MODERN", "MINIMALIST"],
      "colorHarmony": ["neutral", "white", "light-tone"],
      "materialHarmony": ["wood", "metal", "fabric"]
    },
    "lifestyleTags": ["Transitional style", "Storage seeker", "Casual elegance", "Mixed materials lover"]
  },
  {
    "id": "cozy-traditional-dresser-001",
    "name": "Coastal Weathered Oak Dresser",
    "style": "VINTAGE",
    "category": "storage",
    "subcategory": "dressers",
    "description": "A sophisticated six-drawer dresser with weathered oak top, soft white painted base, and brushed nickel pulls, embodying relaxed transitional elegance with ample storage.",
    "price": 1180,
    "imageUrl": "/images/products/cozy-traditional/bedroom/coastal-weathered-oak-dresser.png",
    "inStock": true,
    "dimensions": {
      "width": 66,
      "height": 36,
      "depth": 20
    },
    "weight": 125,
    "materials": ["wood", "metal"],
    "styleAttributes": ["elegant", "cozy", "casual"],
    "colors": ["neutral", "white", "light-tone"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["natural-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["dresser", "chest", "storage"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "medium",
      "roomZones": ["storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "VINTAGE",
      "secondaryStyles": ["MODERN", "MINIMALIST"],
      "colorHarmony": ["neutral", "white", "light-tone"],
      "materialHarmony": ["wood", "metal", "fabric"]
    },
    "lifestyleTags": ["Storage seeker", "Transitional style", "Organization focused", "Casual elegance"]
  },
  {
    "id": "cozy-traditional-bedside-lamp-001",
    "name": "Chatham Ceramic Table Lamp",
    "style": "VINTAGE",
    "category": "lighting",
    "subcategory": "table-lamps",
    "description": "A sophisticated ceramic table lamp with soft blue-gray glazed base, classic urn shape, and white linen drum shade for gentle transitional bedroom lighting.",
    "price": 175,
    "imageUrl": "/images/products/cozy-traditional/bedroom/chatham-ceramic-table-lamp.png",
    "inStock": true,
    "dimensions": {
      "width": 10,
      "height": 24,
      "depth": 10
    },
    "weight": 8,
    "materials": ["ceramic", "fabric"],
    "styleAttributes": ["elegant", "cozy", "casual"],
    "colors": ["neutral", "light-tone", "beige"],
    "functionality": ["lighting", "decorative"],
    "environmentTags": ["natural-light", "small-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["bedside-lamp", "table-lamp", "reading-light"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["wall"],
        "replacementFor": ["desk-lamp", "task-lighting"]
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["lighting", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "VINTAGE",
      "secondaryStyles": ["MODERN", "MINIMALIST"],
      "colorHarmony": ["neutral", "light-tone", "beige"],
      "materialHarmony": ["ceramic", "fabric", "wood"]
    },
    "lifestyleTags": ["Transitional style", "Soft lighting lover", "Casual elegance", "Bedside reading"]
  },
  ///////////////////////////////
  // BOHO ECLECTIC - BEDROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "boho-eclectic-bedding-001",
    "name": "Casablanca Rattan Bedding Set",
    "style": "BOHO",
    "category": "bed sets",
    "subcategory": "bed-sets",
    "description": "A beautiful platform bed set with handwoven rattan headboard, natural wood frame, and globally-inspired textiles in warm terracotta and cream tones with tribal patterns.",
    "price": 1450,
    "imageUrl": "/images/products/boho-eclectic/bedroom/casablanca-rattan-bedding-set.png",
    "inStock": true,
    "dimensions": {
      "width": 86,
      "height": 48,
      "depth": 90
    },
    "weight": 95,
    "materials": ["rattan", "wood", "fabric"],
    "styleAttributes": ["casual", "eclectic", "cozy"],
    "colors": ["neutral", "brown", "beige"],
    "functionality": ["seating", "decorative"],
    "environmentTags": ["natural-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center", "wall"],
        "replacementFor": ["bed", "bedding-set", "platform-bed"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["seating", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["neutral", "brown", "beige"],
      "materialHarmony": ["rattan", "wood", "fabric"]
    },
    "lifestyleTags": ["Global traveler", "Bohemian lifestyle", "Natural living", "Artistic expression"]
  },
  {
    "id": "boho-eclectic-nightstand-001",
    "name": "Jaipur Carved Wood Nightstand",
    "style": "BOHO",
    "category": "storage",
    "subcategory": "nightstands",
    "description": "An artisan-crafted nightstand featuring hand-carved mango wood with intricate mandala patterns, warm honey finish, and single drawer with brass pull for global bohemian style.",
    "price": 320,
    "imageUrl": "/images/products/boho-eclectic/bedroom/jaipur-carved-wood-nightstand.png",
    "inStock": true,
    "dimensions": {
      "width": 20,
      "height": 24,
      "depth": 16
    },
    "weight": 28,
    "materials": ["wood", "metal"],
    "styleAttributes": ["casual", "eclectic", "rustic"],
    "colors": ["brown", "neutral"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["natural-light", "small-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["nightstand", "bedside-table"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["storage", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["VINTAGE", "MODERN"],
      "colorHarmony": ["brown", "neutral", "beige"],
      "materialHarmony": ["wood", "rattan", "metal"]
    },
    "lifestyleTags": ["Handcrafted appreciation", "Global traveler", "Artistic expression", "Eco-conscious"]
  },
  {
    "id": "boho-eclectic-dresser-001",
    "name": "Nomad Reclaimed Wood Chest",
    "style": "BOHO",
    "category": "storage",
    "subcategory": "dressers",
    "description": "A unique five-drawer chest crafted from reclaimed teak with natural patina, mixed wood tones, and vintage brass hardware, celebrating sustainable global craftsmanship.",
    "price": 980,
    "imageUrl": "/images/products/boho-eclectic/bedroom/nomad-reclaimed-wood-chest.png",
    "inStock": true,
    "dimensions": {
      "width": 54,
      "height": 42,
      "depth": 20
    },
    "weight": 105,
    "materials": ["wood", "metal"],
    "styleAttributes": ["casual", "rustic", "eclectic"],
    "colors": ["brown", "neutral", "dark-tone"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["natural-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["dresser", "chest", "storage"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "medium",
      "roomZones": ["storage", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["VINTAGE", "MODERN"],
      "colorHarmony": ["brown", "neutral", "dark-tone"],
      "materialHarmony": ["wood", "rattan", "metal"]
    },
    "lifestyleTags": ["Eco-conscious", "Global traveler", "Storage seeker", "Sustainable living"]
  },
  {
    "id": "boho-eclectic-bedside-lamp-001",
    "name": "Bali Woven Table Lamp",
    "style": "BOHO",
    "category": "lighting",
    "subcategory": "table-lamps",
    "description": "A charming table lamp with handwoven rattan basket base and natural linen shade, creating warm filtered lighting and authentic global bohemian bedroom ambiance.",
    "price": 145,
    "imageUrl": "/images/products/boho-eclectic/bedroom/bali-woven-table-lamp.png",
    "inStock": true,
    "dimensions": {
      "width": 12,
      "height": 22,
      "depth": 12
    },
    "weight": 5,
    "materials": ["rattan", "fabric"],
    "styleAttributes": ["casual", "cozy", "eclectic"],
    "colors": ["neutral", "brown", "beige"],
    "functionality": ["lighting", "decorative"],
    "environmentTags": ["natural-light", "small-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["bedside-lamp", "table-lamp", "reading-light"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["wall"],
        "replacementFor": ["accent-lighting"]
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["lighting", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["neutral", "brown", "beige"],
      "materialHarmony": ["rattan", "fabric", "wood"]
    },
    "lifestyleTags": ["Global traveler", "Natural living", "Handcrafted appreciation", "Warm lighting lover"]
  },
  ///////////////////////////////
  // WARM MINIMALIST - BEDROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "warm-minimalist-bedding-001",
    "name": "Zen Japanese Platform Bedding Set",
    "style": "MINIMALIST",
    "category": "bed sets",
    "subcategory": "bed-sets",
    "description": "A serene low-profile platform bed set with natural white oak frame, soft linen bedding in warm beige tones, and minimalist Japanese-inspired design for peaceful sleep.",
    "price": 1380,
    "imageUrl": "/images/products/warm-minimalist/bedroom/zen-japanese-platform-bedding-set.png",
    "inStock": true,
    "dimensions": {
      "width": 84,
      "height": 32,
      "depth": 88
    },
    "weight": 85,
    "materials": ["wood", "fabric"],
    "styleAttributes": ["minimal", "natural", "cozy"],
    "colors": ["light-tone", "beige", "neutral"],
    "functionality": ["seating", "storage"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center", "wall"],
        "replacementFor": ["bed", "bedding-set", "platform-bed"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["seating"]
    },
    "styleCoherence": {
      "dominantStyle": "MINIMALIST",
      "secondaryStyles": ["MODERN", "BOHO"],
      "colorHarmony": ["light-tone", "beige", "neutral", "white"],
      "materialHarmony": ["wood", "fabric", "rattan"]
    },
    "lifestyleTags": ["Minimalist", "Natural living", "Mindful sleeping", "Japandi style"]
  },
  {
    "id": "warm-minimalist-nightstand-001",
    "name": "Muji Floating Oak Nightstand",
    "style": "MINIMALIST",
    "category": "storage",
    "subcategory": "nightstands",
    "description": "A minimal floating nightstand in solid white oak with hidden mounting, single soft-close drawer, and clean geometric lines for uncluttered Japandi bedroom spaces.",
    "price": 245,
    "imageUrl": "/images/products/warm-minimalist/bedroom/muji-floating-oak-nightstand.png",
    "inStock": true,
    "dimensions": {
      "width": 20,
      "height": 6,
      "depth": 14
    },
    "weight": 12,
    "materials": ["wood"],
    "styleAttributes": ["minimal", "natural", "cozy"],
    "colors": ["light-tone", "beige", "neutral"],
    "functionality": ["storage", "multi-functional"],
    "environmentTags": ["small-space", "natural-light"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["nightstand", "bedside-table"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MINIMALIST",
      "secondaryStyles": ["MODERN", "BOHO"],
      "colorHarmony": ["light-tone", "beige", "neutral"],
      "materialHarmony": ["wood", "fabric", "rattan"]
    },
    "lifestyleTags": ["Minimalist", "Small space living", "Clean aesthetic", "Japandi style"]
  },
  {
    "id": "warm-minimalist-dresser-001",
    "name": "Hygge Low Oak Console Dresser",
    "style": "MINIMALIST",
    "category": "storage",
    "subcategory": "dressers",
    "description": "A sophisticated low-profile dresser in solid white oak with four soft-close drawers, tapered legs, and natural matte finish embodying Nordic hygge minimalism.",
    "price": 850,
    "imageUrl": "/images/products/warm-minimalist/bedroom/hygge-low-oak-console-dresser.png",
    "inStock": true,
    "dimensions": {
      "width": 60,
      "height": 28,
      "depth": 18
    },
    "weight": 78,
    "materials": ["wood"],
    "styleAttributes": ["minimal", "natural", "cozy"],
    "colors": ["light-tone", "beige", "neutral"],
    "functionality": ["storage", "multi-functional"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["dresser", "chest", "storage"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "medium",
      "roomZones": ["storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MINIMALIST",
      "secondaryStyles": ["MODERN", "BOHO"],
      "colorHarmony": ["light-tone", "beige", "neutral"],
      "materialHarmony": ["wood", "fabric", "rattan"]
    },
    "lifestyleTags": ["Minimalist", "Storage seeker", "Natural living", "Nordic hygge"]
  },
  {
    "id": "warm-minimalist-bedside-lamp-001",
    "name": "Wabi Ceramic Bedside Lamp",
    "style": "MINIMALIST",
    "category": "lighting",
    "subcategory": "table-lamps",
    "description": "A serene ceramic table lamp with organic pebble-shaped base in warm cream glaze and natural linen shade, creating soft ambient lighting for peaceful bedrooms.",
    "price": 125,
    "imageUrl": "/images/products/warm-minimalist/bedroom/wabi-ceramic-bedside-lamp.png",
    "inStock": true,
    "dimensions": {
      "width": 8,
      "height": 16,
      "depth": 8
    },
    "weight": 4,
    "materials": ["ceramic", "fabric"],
    "styleAttributes": ["minimal", "cozy", "natural"],
    "colors": ["light-tone", "neutral", "beige"],
    "functionality": ["lighting", "decorative"],
    "environmentTags": ["natural-light", "small-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["bedside-lamp", "table-lamp", "reading-light"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["wall"],
        "replacementFor": ["accent-lighting"]
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["lighting", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "MINIMALIST",
      "secondaryStyles": ["MODERN", "BOHO"],
      "colorHarmony": ["light-tone", "neutral", "beige"],
      "materialHarmony": ["ceramic", "fabric", "wood"]
    },
    "lifestyleTags": ["Minimalist", "Soft lighting lover", "Natural living", "Mindful sleeping"]
  },
  ///////////////////////////////
  // INDUSTRIAL LOFT - BEDROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "industrial-loft-bedding-001",
    "name": "Brooklyn Steel Frame Platform Bedding Set",
    "style": "INDUSTRIAL",
    "category": "bed sets",
    "subcategory": "bed-sets",
    "description": "A commanding platform bed set with exposed black steel frame, reclaimed wood headboard, and charcoal linen bedding, embodying raw urban loft sophistication.",
    "price": 1620,
    "imageUrl": "/images/products/industrial-loft/bedroom/brooklyn-steel-frame-platform-bedding-set.png",
    "inStock": true,
    "dimensions": {
      "width": 86,
      "height": 44,
      "depth": 90
    },
    "weight": 125,
    "materials": ["metal", "wood", "fabric"],
    "styleAttributes": ["urban", "edgy", "minimal"],
    "colors": ["dark-tone", "black", "gray"],
    "functionality": ["seating", "storage"],
    "environmentTags": ["high-ceiling", "large-space", "open-plan"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["center", "wall"],
        "replacementFor": ["bed", "bedding-set", "platform-bed"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "large",
      "roomZones": ["seating"]
    },
    "styleCoherence": {
      "dominantStyle": "INDUSTRIAL",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["dark-tone", "black", "gray"],
      "materialHarmony": ["metal", "wood", "leather"]
    },
    "lifestyleTags": ["Urban living", "Industrial aesthetic", "Loft dwelling", "Raw materials"]
  },
  {
    "id": "industrial-loft-nightstand-001",
    "name": "Foundry Steel & Wood Nightstand",
    "style": "INDUSTRIAL",
    "category": "storage",
    "subcategory": "nightstands",
    "description": "A rugged nightstand with thick reclaimed wood top and black iron pipe base, featuring industrial joints and raw urban character for authentic loft bedrooms.",
    "price": 285,
    "imageUrl": "/images/products/industrial-loft/bedroom/foundry-steel-wood-nightstand.png",
    "inStock": true,
    "dimensions": {
      "width": 20,
      "height": 24,
      "depth": 16
    },
    "weight": 32,
    "materials": ["wood", "metal"],
    "styleAttributes": ["urban", "edgy", "rustic"],
    "colors": ["dark-tone", "brown", "black"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["high-ceiling", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["nightstand", "bedside-table"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "INDUSTRIAL",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["dark-tone", "brown", "black"],
      "materialHarmony": ["wood", "metal", "leather"]
    },
    "lifestyleTags": ["Urban living", "Raw materials", "Industrial aesthetic", "Storage seeker"]
  },
  {
    "id": "industrial-loft-dresser-001",
    "name": "Metro Steel Pipe Dresser",
    "style": "INDUSTRIAL",
    "category": "storage",
    "subcategory": "dressers",
    "description": "A bold six-drawer dresser featuring reclaimed wood drawers with black steel pipe frame construction, industrial hardware, and raw metropolitan character.",
    "price": 1180,
    "imageUrl": "/images/products/industrial-loft/bedroom/metro-steel-pipe-dresser.png",
    "inStock": true,
    "dimensions": {
      "width": 60,
      "height": 36,
      "depth": 20
    },
    "weight": 145,
    "materials": ["wood", "metal"],
    "styleAttributes": ["urban", "edgy", "rustic"],
    "colors": ["dark-tone", "brown", "black"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["high-ceiling", "large-space", "open-plan"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["dresser", "chest", "storage"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "large",
      "roomZones": ["storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "INDUSTRIAL",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["dark-tone", "brown", "black"],
      "materialHarmony": ["wood", "metal", "leather"]
    },
    "lifestyleTags": ["Storage seeker", "Urban living", "Industrial aesthetic", "Raw materials"]
  },
  {
    "id": "industrial-loft-bedside-lamp-001",
    "name": "Forge Edison Clamp Bedside Lamp",
    "style": "INDUSTRIAL",
    "category": "lighting",
    "subcategory": "table-lamps",
    "description": "A versatile clamp-on bedside lamp with adjustable black iron arm, exposed Edison bulb, and industrial-grade construction for raw urban bedroom lighting.",
    "price": 135,
    "imageUrl": "/images/products/industrial-loft/bedroom/forge-edison-clamp-bedside-lamp.png",
    "inStock": true,
    "dimensions": {
      "width": 6,
      "height": 20,
      "depth": 12
    },
    "weight": 8,
    "materials": ["metal"],
    "styleAttributes": ["urban", "edgy", "minimal"],
    "colors": ["dark-tone", "black"],
    "functionality": ["lighting", "multi-functional"],
    "environmentTags": ["high-ceiling", "small-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["bedside-lamp", "reading-light", "task-lamp"]
      },
      "Bathroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Home Office": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["wall"],
        "replacementFor": ["desk-lamp", "task-lighting"]
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["lighting", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "INDUSTRIAL",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["dark-tone", "black", "gray"],
      "materialHarmony": ["metal", "wood", "leather"]
    },
    "lifestyleTags": ["Urban living", "Task lighting", "Industrial aesthetic", "Space saving"]
  },
  ///////////////////////////////
  // BATHROOM PRODUCTS
  ///////////////////////////////

  ///////////////////////////////
  // MODERN CLEAN - BATHROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "modern-clean-vanity-001",
    "name": "Malibu Floating Walnut Vanity",
    "style": "MODERN",
    "category": "storage",
    "subcategory": "vanities",
    "description": "A sleek floating vanity in warm walnut with integrated white ceramic sink, soft-close drawers, and California modern styling for sophisticated bathroom spaces.",
    "price": 1280,
    "imageUrl": "/images/products/modern-clean/bathroom/malibu-floating-walnut-vanity.png",
    "inStock": true,
    "dimensions": {
      "width": 48,
      "height": 20,
      "depth": 22
    },
    "weight": 85,
    "materials": ["wood", "ceramic"],
    "styleAttributes": ["sleek", "minimal", "contemporary"],
    "colors": ["neutral", "brown", "white"],
    "functionality": ["storage", "multi-functional"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["vanity", "sink", "bathroom-storage"]
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "medium",
      "roomZones": ["storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MODERN", "MINIMALIST"],
      "colorHarmony": ["neutral", "brown", "white", "light-tone"],
      "materialHarmony": ["wood", "ceramic", "metal"]
    },
    "lifestyleTags": ["Modern living", "California style", "Clean aesthetic", "Natural materials"]
  },
  {
    "id": "modern-clean-mirror-001",
    "name": "Laguna Round Brass Mirror",
    "style": "MODERN",
    "category": "decor",
    "subcategory": "mirrors",
    "description": "A sophisticated round mirror with brushed brass frame and beveled edge, embodying California modern elegance with warm metallic accents for stylish bathrooms.",
    "price": 285,
    "imageUrl": "/images/products/modern-clean/bathroom/laguna-round-brass-mirror.png",
    "inStock": true,
    "dimensions": {
      "width": 32,
      "height": 32,
      "depth": 2
    },
    "weight": 15,
    "materials": ["glass", "metal"],
    "styleAttributes": ["sleek", "elegant", "contemporary"],
    "colors": ["neutral", "light-tone"],
    "functionality": ["decorative", "multi-functional"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["mirror", "bathroom-mirror", "vanity-mirror"]
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "small",
      "roomZones": ["decorative", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MODERN", "MINIMALIST"],
      "colorHarmony": ["neutral", "light-tone", "brown"],
      "materialHarmony": ["glass", "metal", "wood"]
    },
    "lifestyleTags": ["Modern living", "California style", "Elegant details", "Natural light lover"]
  },
  {
    "id": "modern-clean-cabinet-001",
    "name": "Venice Wall-Mounted Storage Cabinet",
    "style": "MODERN",
    "category": "storage",
    "subcategory": "cabinets",
    "description": "A streamlined wall-mounted storage cabinet in walnut with frosted glass doors, providing discreet bathroom storage with California modern sophistication.",
    "price": 420,
    "imageUrl": "/images/products/modern-clean/bathroom/venice-wall-mounted-storage-cabinet.png",
    "inStock": true,
    "dimensions": {
      "width": 24,
      "height": 30,
      "depth": 8
    },
    "weight": 25,
    "materials": ["wood", "glass"],
    "styleAttributes": ["sleek", "minimal", "contemporary"],
    "colors": ["neutral", "brown"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["small-space", "natural-light"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["wall"],
        "replacementFor": ["storage-cabinet", "medicine-cabinet", "wall-cabinet"]
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "MODERN",
      "secondaryStyles": ["MODERN", "TRADITIONAL"],
      "colorHarmony": ["neutral", "brown", "light-tone"],
      "materialHarmony": ["wood", "glass", "metal"]
    },
    "lifestyleTags": ["Storage seeker", "Small space living", "Modern living", "Organization focused"]
  },
  ///////////////////////////////
  // COZY TRADITIONAL - BATHROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "cozy-traditional-vanity-001",
    "name": "Hampton Two-Tone Shaker Vanity",
    "style": "VINTAGE",
    "category": "storage",
    "subcategory": "vanities",
    "description": "A sophisticated single vanity with weathered oak top, soft white painted base, and clean shaker-style doors with brushed nickel hardware for relaxed traditional elegance.",
    "price": 1280,
    "imageUrl": "/images/products/cozy-traditional/bathroom/hampton-two-tone-shaker-vanity.png",
    "inStock": true,
    "dimensions": {
      "width": 48,
      "height": 34,
      "depth": 22
    },
    "weight": 95,
    "materials": ["wood", "ceramic"],
    "styleAttributes": ["elegant", "cozy", "casual"],
    "colors": ["neutral", "white", "light-tone"],
    "functionality": ["storage", "multi-functional"],
    "environmentTags": ["natural-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["vanity", "bathroom-vanity", "bathroom-storage"]
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "medium",
      "roomZones": ["storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "VINTAGE",
      "secondaryStyles": ["MODERN", "MINIMALIST"],
      "colorHarmony": ["neutral", "white", "light-tone"],
      "materialHarmony": ["wood", "ceramic", "metal"]
    },
    "lifestyleTags": ["Transitional style", "Casual elegance", "Mixed materials lover", "Clean aesthetic"]
  },
  {
    "id": "cozy-traditional-cabinet-001",
    "name": "Savannah Open Shelf Tower",
    "style": "VINTAGE",
    "category": "storage",
    "subcategory": "cabinets",
    "description": "A charming tall storage tower with weathered oak shelves and soft white painted frame, featuring open shelving and cabinet storage for relaxed traditional bathroom organization.",
    "price": 485,
    "imageUrl": "/images/products/cozy-traditional/bathroom/savannah-open-shelf-tower.png",
    "inStock": true,
    "dimensions": {
      "width": 20,
      "height": 68,
      "depth": 16
    },
    "weight": 55,
    "materials": ["wood"],
    "styleAttributes": ["elegant", "cozy", "casual"],
    "colors": ["neutral", "white", "light-tone"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner", "wall"],
        "replacementFor": ["storage-tower", "linen-cabinet", "bathroom-storage"]
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["storage", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "VINTAGE",
      "secondaryStyles": ["MODERN", "TRADITIONAL"],
      "colorHarmony": ["neutral", "white", "light-tone"],
      "materialHarmony": ["wood", "ceramic", "metal"]
    },
    "lifestyleTags": ["Storage seeker", "Transitional style", "Organization focused", "Casual elegance"]
  },
  ///////////////////////////////
  // BOHO ECLECTIC - BATHROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "boho-eclectic-vanity-001",
    "name": "Marrakech Reclaimed Wood Vanity",
    "style": "BOHO",
    "category": "storage",
    "subcategory": "vanities",
    "description": "A unique vanity crafted from reclaimed teak with natural live edges, featuring a ceramic vessel sink and open shelf storage for authentic global bathroom style.",
    "price": 1180,
    "imageUrl": "/images/products/boho-eclectic/bathroom/marrakech-reclaimed-wood-vanity.png",
    "inStock": true,
    "dimensions": {
      "width": 48,
      "height": 34,
      "depth": 20
    },
    "weight": 75,
    "materials": ["wood", "ceramic"],
    "styleAttributes": ["casual", "eclectic", "rustic"],
    "colors": ["brown", "neutral", "beige"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["natural-light", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["vanity", "bathroom-vanity", "vessel-sink-vanity"]
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "medium",
      "roomZones": ["storage", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["VINTAGE", "MODERN"],
      "colorHarmony": ["brown", "neutral", "beige"],
      "materialHarmony": ["wood", "ceramic", "rattan"]
    },
    "lifestyleTags": ["Eco-conscious", "Global traveler", "Natural living", "Sustainable materials"]
  },
  {
    "id": "boho-eclectic-mirror-001",
    "name": "Bali Rattan Sunburst Mirror",
    "style": "BOHO",
    "category": "decor",
    "subcategory": "mirrors",
    "description": "A striking round mirror with handwoven rattan sunburst frame in natural finish, bringing global artisan craftsmanship and bohemian flair to bathroom spaces.",
    "price": 285,
    "imageUrl": "/images/products/boho-eclectic/bathroom/bali-rattan-sunburst-mirror.png",
    "inStock": true,
    "dimensions": {
      "width": 36,
      "height": 36,
      "depth": 4
    },
    "weight": 8,
    "materials": ["rattan", "glass"],
    "styleAttributes": ["casual", "eclectic", "cozy"],
    "colors": ["neutral", "brown", "beige"],
    "functionality": ["decorative", "multi-functional"],
    "environmentTags": ["natural-light", "small-space", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["mirror", "bathroom-mirror", "decorative-mirror"]
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "medium",
      "roomZones": ["decorative", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["VINTAGE", "MODERN"],
      "colorHarmony": ["neutral", "brown", "beige"],
      "materialHarmony": ["rattan", "wood", "fabric"]
    },
    "lifestyleTags": ["Global traveler", "Handcrafted appreciation", "Natural living", "Artistic expression"]
  },
  {
    "id": "boho-eclectic-cabinet-001",
    "name": "Casablanca Woven Storage Tower",
    "style": "BOHO",
    "category": "storage",
    "subcategory": "cabinets",
    "description": "A unique storage tower with natural wood frame and removable woven seagrass baskets, offering flexible bohemian bathroom organization with global texture.",
    "price": 380,
    "imageUrl": "/images/products/boho-eclectic/bathroom/casablanca-woven-storage-tower.png",
    "inStock": true,
    "dimensions": {
      "width": 18,
      "height": 60,
      "depth": 14
    },
    "weight": 32,
    "materials": ["wood", "rattan"],
    "styleAttributes": ["casual", "eclectic", "cozy"],
    "colors": ["neutral", "brown", "beige"],
    "functionality": ["storage", "multi-functional"],
    "environmentTags": ["natural-light", "small-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner", "wall"],
        "replacementFor": ["storage-tower", "basket-storage", "bathroom-storage"]
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["storage", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "BOHO",
      "secondaryStyles": ["VINTAGE", "MODERN"],
      "colorHarmony": ["neutral", "brown", "beige"],
      "materialHarmony": ["wood", "rattan", "fabric"]
    },
    "lifestyleTags": ["Organization focused", "Natural living", "Global traveler", "Flexible storage"]
  },
  ///////////////////////////////
  // WARM MINIMALIST - BATHROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "warm-minimalist-cabinet-001",
    "name": "Hygge Ladder Storage Shelf",
    "style": "MINIMALIST",
    "category": "storage",
    "subcategory": "cabinets",
    "description": "A minimal ladder-style storage shelf in white oak with three open shelves, embodying Nordic hygge principles with clean lines and natural warmth for serene bathroom organization.",
    "price": 285,
    "imageUrl": "/images/products/warm-minimalist/bathroom/hygge-ladder-storage-shelf.png",
    "inStock": true,
    "dimensions": {
      "width": 18,
      "height": 60,
      "depth": 12
    },
    "weight": 22,
    "materials": ["wood"],
    "styleAttributes": ["minimal", "natural", "cozy"],
    "colors": ["light-tone", "beige", "neutral"],
    "functionality": ["storage", "decorative"],
    "environmentTags": ["natural-light", "small-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": true,
        "priority": "recommended",
        "placementContext": ["corner", "wall"],
        "replacementFor": ["storage-shelf", "ladder-shelf", "bathroom-storage"]
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "secondary",
      "spaceRequirement": "small",
      "roomZones": ["storage", "decorative"]
    },
    "styleCoherence": {
      "dominantStyle": "MINIMALIST",
      "secondaryStyles": ["MODERN", "BOHO"],
      "colorHarmony": ["light-tone", "beige", "neutral"],
      "materialHarmony": ["wood", "ceramic", "fabric"]
    },
    "lifestyleTags": ["Minimalist", "Storage seeker", "Nordic hygge", "Small space living"]
  },
  ///////////////////////////////
  // INDUSTRIAL LOFT - BATHROOM PRODUCTS
  ///////////////////////////////
  {
    "id": "industrial-loft-mirror-001",
    "name": "Foundry Steel Frame Mirror",
    "style": "INDUSTRIAL",
    "category": "decor",
    "subcategory": "mirrors",
    "description": "A commanding rectangular mirror with heavy black steel frame and exposed corner joints, bringing authentic industrial warehouse character to urban loft bathrooms.",
    "price": 320,
    "imageUrl": "/images/products/industrial-loft/bathroom/foundry-steel-frame-mirror.png",
    "inStock": true,
    "dimensions": {
      "width": 30,
      "height": 40,
      "depth": 2
    },
    "weight": 25,
    "materials": ["metal", "glass"],
    "styleAttributes": ["urban", "edgy", "minimal"],
    "colors": ["dark-tone", "black"],
    "functionality": ["decorative", "multi-functional"],
    "environmentTags": ["high-ceiling", "large-space"],
    "roomCompatibility": {
      "Living Room": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bedroom": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Bathroom": {
        "isCompatible": true,
        "priority": "essential",
        "placementContext": ["wall"],
        "replacementFor": ["mirror", "bathroom-mirror", "industrial-mirror"]
      },
      "Home Office": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      },
      "Dining Area": {
        "isCompatible": false,
        "priority": "optional",
        "placementContext": [],
        "replacementFor": []
      }
    },
    "spatialContext": {
      "placementPriority": "primary",
      "spaceRequirement": "medium",
      "roomZones": ["decorative", "functional"]
    },
    "styleCoherence": {
      "dominantStyle": "INDUSTRIAL",
      "secondaryStyles": ["MODERN", "VINTAGE"],
      "colorHarmony": ["dark-tone", "black", "gray"],
      "materialHarmony": ["metal", "glass", "wood"]
    },
    "lifestyleTags": ["Urban living", "Industrial aesthetic", "Raw materials", "Metropolitan style"]
  }
]