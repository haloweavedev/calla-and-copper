// Living Room Specific AI Configuration
// This configuration provides room-specific intelligence for AI analysis

export const LIVING_ROOM_CONFIG = {
  // Core focus areas for living room analysis
  focusAreas: [
    'seating', 
    'tables', 
    'storage', 
    'lighting', 
    'decorative'
  ],

  // Essential furniture categories for living rooms
  essentialCategories: [
    'sofas', 
    'coffee-tables', 
    'side-tables', 
    'rugs', 
    'lamps'
  ],

  // Spatial priorities for living room layout
  spatialPriorities: [
    'seating-arrangement', 
    'traffic-flow', 
    'entertainment-zone'
  ],

  // Furniture types that can be identified and replaced
  identifiableFurniture: [
    'sofa',
    'sectional', 
    'loveseat',
    'armchair',
    'coffee-table',
    'ottoman',
    'side-table',
    'end-table',
    'console-table',
    'bookshelf',
    'cabinet',
    'floor-lamp',
    'table-lamp',
    'rug',
    'carpet'
  ],

  // Placement contexts for spatial analysis
  placementContexts: [
    'center',
    'wall',
    'corner',
    'floating',
    'window',
    'fireplace',
    'tv-area'
  ],

  // Room size categories for spatial analysis
  roomSizes: [
    'small',    // < 200 sq ft
    'medium',   // 200-400 sq ft  
    'large'     // > 400 sq ft
  ],

  // Layout types for spatial analysis
  layoutTypes: [
    'open-plan',
    'closed',
    'L-shaped',
    'rectangular',
    'square',
    'irregular'
  ],

  // Traffic flow patterns
  trafficFlowPatterns: [
    'linear',
    'circular',
    'multiple-paths',
    'open-circulation'
  ],

  // Entertainment zone considerations
  entertainmentZones: [
    'tv-focused',
    'conversation-focused',
    'reading-nook',
    'gaming-area',
    'music-listening'
  ]
}

// Enhanced system prompt for living room analysis
export const LIVING_ROOM_SYSTEM_PROMPT = `You are an expert living room interior design consultant specializing in furniture placement, spatial analysis, and style transformation. Your task is to analyze living room images and provide comprehensive furniture and spatial intelligence.

IMPORTANT: You must return a JSON object with the exact structure specified in the schema. Do NOT wrap your response in a "type" or "properties" object. Return the data directly as a JSON object.

CORE EXPERTISE AREAS:
- Seating arrangements (sofas, sectionals, chairs, loveseats)
- Table placement (coffee tables, side tables, console tables)
- Storage solutions (bookshelves, cabinets, storage ottomans)
- Lighting design (floor lamps, table lamps, overhead lighting)
- Decorative elements (rugs, pillows, wall art, plants)

ESSENTIAL FURNITURE CATEGORIES TO IDENTIFY:
- Primary seating: sofas, sectionals, loveseats
- Secondary seating: armchairs, accent chairs
- Tables: coffee tables, ottomans, side tables, end tables
- Storage: bookshelves, cabinets, console tables
- Lighting: floor lamps, table lamps, pendant lights
- Flooring: area rugs, carpets

SPATIAL ANALYSIS PRIORITIES:
1. Seating arrangement and comfort zones
2. Traffic flow and accessibility patterns
3. Entertainment zone setup and focal points
4. Storage and organization solutions
5. Lighting placement and ambiance

FURNITURE ASSESSMENT CRITERIA:
- Condition: good, fair, poor, needs-replacement
- Style compatibility with desired aesthetic
- Size appropriateness for the space
- Placement optimization opportunities
- Replacement priority and reasoning

For each piece of furniture identified, provide:
- Specific type and current condition
- Current placement and effectiveness
- Replacement recommendations with reasoning
- Spatial optimization suggestions

Focus on creating cohesive, functional living spaces that balance style, comfort, and practicality.`

// User prompt template for living room analysis
export const LIVING_ROOM_USER_PROMPT_TEMPLATE = (params: {
  style: string | null;
  roomType: string;
  budget: string;
  lifestyleTags: string[];
}) => `LIVING ROOM DESIGN ANALYSIS REQUEST

User Preferences:
- Desired Style: ${params.style || 'AI-Powered Discovery (determine best style from room analysis)'}
- Room Type: ${params.roomType}
- Budget Range: ${params.budget}
- Lifestyle Needs: ${params.lifestyleTags.join(', ') || 'None specified'}

ANALYSIS REQUIREMENTS:
Please analyze this living room image and provide a JSON response with the following structure:

1. FURNITURE IDENTIFICATION:
   - Identify all visible furniture pieces
   - Assess condition and style compatibility
   - Determine replacement priorities

2. SPATIAL ANALYSIS:
   - Evaluate room size and layout
   - Analyze traffic flow patterns
   - Identify focal points and zones

3. REPLACEMENT RECOMMENDATIONS:
   - Suggest specific furniture replacements
   - Explain reasoning for each recommendation
   - Consider budget and lifestyle constraints

4. STYLE TRANSFORMATION:
   - Assess current style vs. desired style
   - Identify key transformation opportunities
   - Recommend cohesive style elements

IMPORTANT: Return your analysis as a JSON object matching the provided schema exactly. Do not wrap the response in any additional objects or schema descriptions.

Focus on creating a complete living room transformation that addresses seating, tables, storage, lighting, and decorative elements while maintaining excellent traffic flow and functionality.`
