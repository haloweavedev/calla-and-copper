// Quiz Types and Interfaces

export interface StyleOption {
  id: string
  title: string
  description: string
  keywords: string[]
  imageSrc: string
}

export interface QuizState {
  selectedPath: string[]
  selectedStyle: string | null
  availableOptions: StyleOption[]
  isComplete: boolean
  finalStyleProfile?: StyleProfile
}

export interface StyleProfile {
  // Raw selection path
  stylePath: string[]  // ["Modern Clean"]
  
  // Aggregated data for AI
  combinedKeywords: string[]  // ["contemporary", "minimal", "sleek", "clean-lines"]
  styleHierarchy: {
    foundation: string      // "Modern Clean"
    refinement: string      // "" - empty for single round
  }
  
  // AI-friendly metadata
  styleDescription: string  // "Clean, simple, uncluttered spaces with contemporary appeal"
  dominantThemes: string[] // ["contemporary", "minimal", "sleek"]
  
  // Product matching hints (for structured filtering)
  preferredMaterials: string[]  // ["light-wood", "white-metal", "natural-textiles"]
  colorPalette: string[]        // ["white", "cream", "light-wood", "sage"]
  avoidMaterials: string[]      // ["dark-wood", "ornate-metal", "bold-patterns"]
}

export interface StyleDecisionNode {
  description: string
  imageSrc: string
  keywords?: string[]
}

export interface StyleDecisionTree {
  [key: string]: StyleDecisionNode
}
