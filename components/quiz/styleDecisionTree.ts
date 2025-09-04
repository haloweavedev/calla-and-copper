import { StyleOption, StyleProfile, StyleDecisionTree } from './types'

// Calla & Copper Style Decision Tree - Complete Data Structure

const styleDecisionTree: StyleDecisionTree = {
  // Single Round: Core Style Foundations Only
  "Modern Clean": {
    description: "Clean, simple, uncluttered spaces with contemporary appeal",
    keywords: ["contemporary", "minimal", "sleek"],
    imageSrc: "/style-quiz/modern-clean.png"
  },

  "Cozy Traditional": {
    description: "Timeless, elegant, refined spaces with lasting appeal",
    keywords: ["timeless", "elegant", "comfortable"],
    imageSrc: "/style-quiz/cozy-traditional.png"
  },

  "Boho Eclectic": {
    description: "Colorful, mixed, personality-driven spaces",
    keywords: ["colorful", "eclectic", "artistic"],
    imageSrc: "/style-quiz/boho-eclectic.png"
  },

  "Warm Minimalist": {
    description: "Simplified living with warmth and natural elements",
    keywords: ["warm", "minimal", "natural"],
    imageSrc: "/style-quiz/warm-minimalist.png"
  },

  "Industrial Chic": {
    description: "Raw, edgy, metropolitan style with urban appeal",
    keywords: ["urban", "edgy", "metropolitan"],
    imageSrc: "/style-quiz/industrial-chic.png"
  }
};

// Single round style decision tree - no complex navigation needed

// Helper function to get all available style options (for single round)
function getAllStyleOptions(tree: StyleDecisionTree): StyleOption[] {
  return Object.entries(tree).map(([key, node]) => ({
    id: key,
    title: key,
    description: node.description,
    keywords: node.keywords || [],
    imageSrc: node.imageSrc
  }));
}

// Helper function to get all possible style paths (single level now)
function getAllStylePaths(tree: StyleDecisionTree): string[][] {
  return Object.keys(tree).map(styleName => [styleName]);
}

// Helper function to generate style profile from selected path (single level now)
function generateStyleProfile(stylePath: string[], styleTree: StyleDecisionTree): StyleProfile {
  if (stylePath.length !== 1) {
    console.error('Style path must have exactly 1 level');
    throw new Error('Invalid style path length');
  }

  const [foundation] = stylePath;
  
  // Get the foundation node
  const foundationNode = styleTree[foundation];
  
  if (!foundationNode) {
    console.error('Invalid style path in tree');
    throw new Error('Invalid style path');
  }
  
  // Use foundation keywords directly
  const combinedKeywords = foundationNode.keywords || [];
  
  // Generate style description
  const styleDescription = foundationNode.description;
  
  // Extract dominant themes from keywords
  const dominantThemes = combinedKeywords.slice(0, 3);
  
  // Generate product matching hints (simplified for now)
  const preferredMaterials = combinedKeywords.filter(k => 
    ['wood', 'metal', 'textiles', 'natural', 'leather', 'exposed-materials', 'organic-forms'].some(m => k.includes(m))
  );
  
  const colorPalette = combinedKeywords.filter(k => 
    ['white', 'cream', 'warm', 'earth', 'coastal', 'desert', 'neutral-palette', 'earth-tones'].some(c => k.includes(c))
  );
  
  const avoidMaterials = ['dark-wood', 'ornate-metal', 'bold-patterns'];
  
  return {
    stylePath,
    combinedKeywords,
    styleHierarchy: { foundation, refinement: '' }, // refinement is empty for single round
    styleDescription,
    dominantThemes,
    preferredMaterials,
    colorPalette,
    avoidMaterials
  };
}

export { styleDecisionTree, getAllStyleOptions, getAllStylePaths, generateStyleProfile };
