// General lifestyle tags that apply to ALL room types
export const GENERAL_LIFESTYLE_TAGS = [
  // Space & Practical (4 tags)
  'Small space living',     // Affects furniture size selection
  'Storage seeker',         // Prioritizes storage solutions
  'Natural light lover',    // Affects color/material choices
  'Pet-friendly',          // Affects material durability
  
  // Lifestyle & Values (4 tags)  
  'Minimalist',            // Affects style and quantity
  'Cozy homebody',         // Affects comfort and warmth
  'Budget-conscious',      // Affects price filtering
  'Eco-conscious'          // Affects material preferences
] as const

// Future room-specific tags (for later phases)
export const ROOM_SPECIFIC_LIFESTYLE_TAGS = {
  'Living Room': [
    'Frequent entertainer',  // Affects seating arrangements
    'Work from home',        // Affects desk/office setup
    'Tech enthusiast'        // Affects smart home integration
  ],
  'Bathroom': [
    'Spa-like preferences',  // Affects luxury vs. functional
    'Shared bathroom',       // Affects storage needs
    'Quick morning routine'  // Affects efficiency focus
  ],
  'Bedroom': [
    'Light sleeper',         // Affects blackout solutions
    'Early riser',          // Affects lighting choices
    'Night owl'             // Affects evening lighting
  ],
  'Kitchen': [
    'Home chef',            // Affects workspace needs
    'Quick meals',          // Affects efficiency focus
    'Entertainment cooking' // Affects social space setup
  ]
} as const

// Type definitions for better TypeScript support
export type GeneralLifestyleTag = typeof GENERAL_LIFESTYLE_TAGS[number]
export type RoomSpecificLifestyleTag = typeof ROOM_SPECIFIC_LIFESTYLE_TAGS[keyof typeof ROOM_SPECIFIC_LIFESTYLE_TAGS][number]

// Helper function to get all available tags for a room type
export function getLifestyleTagsForRoom(roomType: string): string[] {
  const generalTags = [...GENERAL_LIFESTYLE_TAGS] as string[]
  const roomSpecificTags = ROOM_SPECIFIC_LIFESTYLE_TAGS[roomType as keyof typeof ROOM_SPECIFIC_LIFESTYLE_TAGS] || []
  return [...generalTags, ...roomSpecificTags] as string[]
}

// Helper function to get lifestyle sections for UI
export function getLifestyleSections(roomType?: string): Array<{ title: string; tags: string[] }> {
  const allTags = roomType ? getLifestyleTagsForRoom(roomType) : [...GENERAL_LIFESTYLE_TAGS] as string[]
  
  const spaceTags = allTags.filter(tag => 
    ['Small space living', 'Storage seeker', 'Natural light lover', 'Pet-friendly'].includes(tag)
  )
  
  const lifestyleTags = allTags.filter(tag => 
    ['Minimalist', 'Cozy homebody', 'Budget-conscious', 'Eco-conscious'].includes(tag)
  )
  
  const sections: Array<{ title: string; tags: string[] }> = [
    {
      title: 'Space & Practical',
      tags: spaceTags
    },
    {
      title: 'Lifestyle & Values',
      tags: lifestyleTags
    }
  ]
  
  if (roomType && ROOM_SPECIFIC_LIFESTYLE_TAGS[roomType as keyof typeof ROOM_SPECIFIC_LIFESTYLE_TAGS]) {
    sections.push({
      title: `${roomType} Specific`,
      tags: [...ROOM_SPECIFIC_LIFESTYLE_TAGS[roomType as keyof typeof ROOM_SPECIFIC_LIFESTYLE_TAGS]]
    })
  }
  
  return sections.filter(section => section.tags.length > 0)
}
