// Quiz Types and Interfaces

export interface StyleOption {
  id: string
  title: string
  description: string
  keywords: string[]
  imageSrc: string
}

export interface QuizState {
  currentRound: 1 | 2
  selectedPath: string[]
  availableOptions: StyleOption[]
  isComplete: boolean
  finalStyleProfile?: StyleProfile
}

export interface StyleProfile {
  // Raw selection path
  stylePath: string[]  // ["Modern Clean", "Scandinavian"]
  
  // Aggregated data for AI
  combinedKeywords: string[]  // ["white", "bright", "minimal", "clean", "wood", "cozy"]
  styleHierarchy: {
    foundation: string      // "Modern Clean"
    refinement: string      // "Scandinavian" 
  }
  
  // AI-friendly metadata
  styleDescription: string  // "A clean, minimalist Scandinavian space with light woods..."
  dominantThemes: string[] // ["minimalism", "scandinavian", "clean"]
  
  // Product matching hints (for structured filtering)
  preferredMaterials: string[]  // ["light-wood", "white-metal", "natural-textiles"]
  colorPalette: string[]        // ["white", "cream", "light-wood", "sage"]
  avoidMaterials: string[]      // ["dark-wood", "ornate-metal", "bold-patterns"]
}

export interface StyleDecisionNode {
  description: string
  imageSrc: string
  children?: Record<string, StyleDecisionNode>
  keywords?: string[]
}

export interface StyleDecisionTree {
  [key: string]: StyleDecisionNode
}
