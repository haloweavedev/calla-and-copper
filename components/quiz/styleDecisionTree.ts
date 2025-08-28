import { StyleOption, StyleProfile, StyleDecisionTree, StyleDecisionNode } from './types'

// Calla & Copper Style Decision Tree - Complete Data Structure

const styleDecisionTree = {
  // Round 1: Core Style Foundations
  "Modern Clean": {
    description: "Clean, simple, uncluttered spaces with contemporary appeal",
    keywords: ["contemporary", "minimal", "sleek"],
    imageSrc: "/style-quiz/modern-clean.png",
    // Round 2: Style Refinements
    children: {
      "Scandinavian": {
        description: "Light woods, cozy textures, hygge vibes",
        keywords: ["light-wood", "hygge", "cozy-textures", "natural-light"],
        imageSrc: "/style-quiz/scandinavian.png"
      },
      "California Modern": {
        description: "Indoor-outdoor flow, natural materials, relaxed elegance",
        keywords: ["indoor-outdoor", "natural-materials", "relaxed", "flow"],
        imageSrc: "/style-quiz/california-modern.png"
      },
      "Modern Minimalist": {
        description: "Sleek lines, neutral palettes, sophisticated simplicity",
        keywords: ["sleek-lines", "neutral-palette", "sophisticated", "minimal"],
        imageSrc: "/style-quiz/modern-minimalist.png"
      },
      "Mid-Century Modern": {
        description: "Vintage geometric, walnut accents, retro charm",
        keywords: ["vintage-geometric", "walnut-accents", "retro-charm", "iconic-design"],
        imageSrc: "/style-quiz/mid-century-modern.png"
      }
    }
  },

  "Cozy Traditional": {
    description: "Timeless, elegant, refined spaces with lasting appeal",
    keywords: ["timeless", "elegant", "refined"],
    imageSrc: "/style-quiz/cozy-traditional.png",
    children: {
      "Transitional": {
        description: "Classic meets contemporary comfort",
        keywords: ["classic-contemporary", "comfortable", "livable", "refined"],
        imageSrc: "/style-quiz/transitional.png"
      },
      "Farmhouse": {
        description: "Rustic charm, vintage practicality, homey feel",
        keywords: ["rustic-charm", "vintage-practicality", "homey", "barn-aesthetic"],
        imageSrc: "/style-quiz/farmhouse.png"
      },
      "Cottage Core": {
        description: "Soft florals, vintage finds, homey atmosphere",
        keywords: ["soft-florals", "vintage-finds", "homey-atmosphere", "romantic"],
        imageSrc: "/style-quiz/cottage-core.png"
      },
      "Refined Traditional": {
        description: "Elegant, timeless, sophisticated classic style",
        keywords: ["elegant", "timeless", "sophisticated", "classic"],
        imageSrc: "/style-quiz/refined-traditional.png"
      }
    }
  },

  "Boho Eclectic": {
    description: "Colorful, mixed, personality-driven spaces",
    keywords: ["colorful", "eclectic", "personality"],
    imageSrc: "/style-quiz/boho-eclectic.png",
    children: {
      "Global Boho": {
        description: "Travel-inspired, cultural mix, rich textiles",
        keywords: ["travel-inspired", "cultural-mix", "rich-textiles", "global-patterns"],
        imageSrc: "/style-quiz/global-boho.png"
      },
      "Modern Boho": {
        description: "Bohemian meets minimalism, curated eclecticism",
        keywords: ["bohemian-minimalism", "curated", "refined", "urban"],
        imageSrc: "/style-quiz/modern-boho.png"
      },
      "Desert Boho": {
        description: "Earthy tones, natural textures, southwestern influence",
        keywords: ["earth-tones", "natural-textures", "southwestern", "desert-inspired"],
        imageSrc: "/style-quiz/desert-boho.png"
      },
      "Vintage Boho": {
        description: "Retro finds, layered patterns, collected over time",
        keywords: ["retro-finds", "layered-patterns", "collected", "vintage-textiles"],
        imageSrc: "/style-quiz/vintage-boho.png"
      }
    }
  },

  "Warm Minimalist": {
    description: "Simplified living with warmth and natural elements",
    keywords: ["warm", "minimal", "natural"],
    imageSrc: "/style-quiz/warm-minimalist.png",
    children: {
      "Japandi": {
        description: "Japanese-Scandinavian fusion, zen simplicity",
        keywords: ["japanese-scandinavian", "zen-simplicity", "organic-forms", "serene"],
        imageSrc: "/style-quiz/japandi.png"
      },
      "Organic Modern": {
        description: "Natural curves, earth tones, biophilic design",
        keywords: ["natural-curves", "earth-tones", "biophilic-design", "organic-forms"],
        imageSrc: "/style-quiz/organic-modern.png"
      },
      "Soft Minimalism": {
        description: "Gentle colors, comfortable simplicity, approachable minimal",
        keywords: ["gentle-colors", "comfortable-simplicity", "approachable", "soft-textures"],
        imageSrc: "/style-quiz/soft-minimalism.png"
      },
      "Nordic Hygge": {
        description: "Cozy minimalism, natural materials, Danish comfort",
        keywords: ["cozy-minimalism", "natural-materials", "danish-comfort", "hygge"],
        imageSrc: "/style-quiz/nordic-hygge.png"
      }
    }
  },

  "Industrial Chic": {
    description: "Raw, edgy, metropolitan style with urban appeal",
    keywords: ["urban", "edgy", "metropolitan"],
    imageSrc: "/style-quiz/industrial-chic.png",
    children: {
      "Urban Loft": {
        description: "Exposed brick, metal, leather accents, city living",
        keywords: ["exposed-brick", "metal-accents", "leather", "city-living"],
        imageSrc: "/style-quiz/style-urban-loft.png"
      },
      "Refined Industrial": {
        description: "Softened edges, warmer tones, approachable industrial",
        keywords: ["softened-edges", "warmer-tones", "approachable", "luxury-industrial"],
        imageSrc: "/style-quiz/style-refined-industrial.png"
      },
      "Modern Industrial": {
        description: "Clean industrial, contemporary twist, minimalist approach",
        keywords: ["clean-industrial", "contemporary-twist", "minimalist", "tech-integration"],
        imageSrc: "/style-quiz/style-modern-industrial.png"
      },
      "Vintage Industrial": {
        description: "Reclaimed materials, authentic patina, historical elements",
        keywords: ["reclaimed-materials", "authentic-patina", "historical", "vintage-industrial"],
        imageSrc: "/style-quiz/style-vintage-industrial.png"
      }
    }
  }
};

// Helper function to get options for next round based on current selection
function getNextOptions(tree: StyleDecisionTree, currentPath: string[]): StyleOption[] | null {
  let current: any = tree;
  
  // Navigate to current position in tree
  for (const step of currentPath) {
    if (current.children && current.children[step]) {
      current = current.children[step];
    } else if (current[step]) {
      current = current[step];
    } else {
      console.error(`Path not found: ${currentPath.join(' → ')}`);
      return null; // Path not found
    }
  }
  
  // Return next level options
  if (current.children) {
    return Object.entries(current.children).map(([key, value]) => {
      const node = value as StyleDecisionNode;
      return {
        id: key,
        title: key,
        description: node.description,
        keywords: node.keywords || [],
        imageSrc: node.imageSrc
      };
    });
  }
  
  return null; // No more options available
}

// Helper function to get all possible style paths
function getAllStylePaths(tree: any): string[][] {
  const paths: string[][] = [];
  
  function traverse(node: any, currentPath: string[] = []) {
    if (node.children) {
      // This is not a leaf node, continue traversing
      Object.entries(node.children).forEach(([key, child]: [string, any]) => {
        traverse(child, [...currentPath, key]);
      });
    } else {
      // This is a leaf node, add the complete path
      paths.push(currentPath);
    }
  }
  
  Object.entries(tree).forEach(([rootKey, rootNode]: [string, any]) => {
    traverse(rootNode, [rootKey]);
  });
  
  return paths;
}

// Helper function to generate style profile from selected path
function generateStyleProfile(stylePath: string[], styleTree: any): StyleProfile {
  if (stylePath.length !== 2) {
    console.error('Style path must have exactly 2 levels');
    throw new Error('Invalid style path length');
  }

  const [foundation, refinement] = stylePath;
  
  // Navigate to get all keywords and descriptions
  const foundationNode = styleTree[foundation];
  const refinementNode = foundationNode.children[refinement];
  
  if (!foundationNode || !refinementNode) {
    console.error('Invalid style path in tree');
    throw new Error('Invalid style path');
  }
  
  // Combine all keywords
  const combinedKeywords = [
    ...(foundationNode.keywords || []),
    ...(refinementNode.keywords || [])
  ];
  
  // Generate style description
  const styleDescription = `${refinementNode.description}. This style combines ${foundationNode.description} with ${refinementNode.description}.`;
  
  // Extract dominant themes from keywords
  const dominantThemes = combinedKeywords.slice(0, 3);
  
  // Generate product matching hints (simplified for now)
  const preferredMaterials = combinedKeywords.filter(k => 
    ['wood', 'metal', 'textiles', 'natural', 'leather'].some(m => k.includes(m))
  );
  
  const colorPalette = combinedKeywords.filter(k => 
    ['white', 'cream', 'warm', 'earth', 'coastal', 'desert'].some(c => k.includes(c))
  );
  
  const avoidMaterials = ['dark-wood', 'ornate-metal', 'bold-patterns'];
  
  return {
    stylePath,
    combinedKeywords,
    styleHierarchy: { foundation, refinement },
    styleDescription,
    dominantThemes,
    preferredMaterials,
    colorPalette,
    avoidMaterials
  };
}

export { styleDecisionTree, getNextOptions, getAllStylePaths, generateStyleProfile };
