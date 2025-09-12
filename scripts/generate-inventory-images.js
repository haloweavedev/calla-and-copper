#!/usr/bin/env node

const { GoogleGenerativeAI } = require('@google/generative-ai')
const fs = require('fs')
const path = require('path')

// Initialize Gemini (Nano Banana)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY)

// Inventory items we need to generate (15 more to reach 30 total)
const newInventoryItems = [
  // MODERN CLEAN (5 items)
  {
    style: 'MODERN',
    category: 'tables',
    subcategory: 'dining-tables',
    name: 'Linear White Dining Table',
    prompt: 'Modern clean dining table, rectangular white lacquer finish, minimal steel legs, contemporary design, pure white background, studio lighting, furniture catalog photography, realistic texture, 4K resolution'
  },
  {
    style: 'MODERN',
    category: 'seating',
    subcategory: 'benches',
    name: 'Geometric Accent Bench',
    prompt: 'Modern clean bench with geometric form, white upholstery, chrome metal base, minimalist design, pure white background, studio lighting, furniture catalog photography, realistic fabric texture, 4K resolution'
  },
  {
    style: 'MODERN',
    category: 'lighting',
    subcategory: 'table-lamps',
    name: 'Sphere Table Lamp',
    prompt: 'Modern clean table lamp, white ceramic sphere base, fabric drum shade, contemporary minimal design, pure white background, studio lighting, furniture catalog photography, realistic materials, 4K resolution'
  },
  {
    style: 'MODERN',
    category: 'decor',
    subcategory: 'plants',
    name: 'Ceramic Planter Set',
    prompt: 'Modern clean white ceramic planters in different geometric shapes, minimal design, with green plants, pure white background, studio lighting, furniture catalog photography, realistic ceramic texture, 4K resolution'
  },
  {
    style: 'MODERN',
    category: 'storage',
    subcategory: 'nightstands',
    name: 'Float Nightstand',
    prompt: 'Modern clean floating nightstand, white lacquer finish, hidden mounting, drawer with push-to-open, minimal contemporary design, pure white background, studio lighting, furniture catalog photography, 4K resolution'
  },

  // COZY TRADITIONAL (3 items) 
  {
    style: 'VINTAGE',
    category: 'seating',
    subcategory: 'chairs',
    name: 'Wingback Reading Chair',
    prompt: 'Cozy traditional wingback chair, rich burgundy leather upholstery, mahogany wood frame, elegant classic design, pure white background, studio lighting, furniture catalog photography, realistic leather texture, 4K resolution'
  },
  {
    style: 'VINTAGE',
    category: 'tables',
    subcategory: 'side-tables',
    name: 'Antique Side Table',
    prompt: 'Cozy traditional side table, dark walnut wood, ornate carved details, classic elegant design, pure white background, studio lighting, furniture catalog photography, realistic wood grain, 4K resolution'
  },
  {
    style: 'VINTAGE',
    category: 'lighting',
    subcategory: 'floor-lamps',
    name: 'Traditional Floor Lamp',
    prompt: 'Cozy traditional floor lamp, brass base with patina, cream fabric shade, classic elegant design, pure white background, studio lighting, furniture catalog photography, realistic brass texture, 4K resolution'
  },

  // WARM MINIMALIST (4 items)
  {
    style: 'SCANDINAVIAN', 
    category: 'beds',
    subcategory: 'bed-frames',
    name: 'Natural Oak Bed Frame',
    prompt: 'Warm minimalist bed frame, natural light oak wood, simple clean lines, Scandinavian design, pure white background, studio lighting, furniture catalog photography, realistic wood grain, 4K resolution'
  },
  {
    style: 'SCANDINAVIAN',
    category: 'textiles',
    subcategory: 'curtains', 
    name: 'Linen Panel Curtains',
    prompt: 'Warm minimalist curtain panels, natural beige linen fabric, simple hem, Scandinavian style, pure white background, studio lighting, furniture catalog photography, realistic linen texture, 4K resolution'
  },
  {
    style: 'SCANDINAVIAN',
    category: 'storage',
    subcategory: 'dressers',
    name: 'Oak Chest Drawers',
    prompt: 'Warm minimalist chest of drawers, light oak wood, 6 drawers, clean Scandinavian design, pure white background, studio lighting, furniture catalog photography, realistic wood texture, 4K resolution'
  },
  {
    style: 'SCANDINAVIAN',
    category: 'decor',
    subcategory: 'mirrors',
    name: 'Round Oak Mirror',
    prompt: 'Warm minimalist round mirror, light oak wood frame, simple Scandinavian design, pure white background, studio lighting, furniture catalog photography, realistic wood and glass, 4K resolution'
  },

  // INDUSTRIAL CHIC (3 items)
  {
    style: 'INDUSTRIAL',
    category: 'seating',
    subcategory: 'sofas',
    name: 'Leather Industrial Sofa',
    prompt: 'Industrial chic sofa, distressed brown leather, black metal frame, urban loft style, pure white background, studio lighting, furniture catalog photography, realistic aged leather texture, 4K resolution'
  },
  {
    style: 'INDUSTRIAL',
    category: 'tables',
    subcategory: 'side-tables',
    name: 'Pipe Side Table',
    prompt: 'Industrial chic side table, black iron pipe base, reclaimed wood top, urban raw design, pure white background, studio lighting, furniture catalog photography, realistic metal and wood textures, 4K resolution'
  },
  {
    style: 'INDUSTRIAL',
    category: 'lighting',
    subcategory: 'table-lamps',
    name: 'Edison Desk Lamp',
    prompt: 'Industrial chic desk lamp, black metal arm, Edison bulb, adjustable joint, urban workshop style, pure white background, studio lighting, furniture catalog photography, realistic metal texture, 4K resolution'
  }
]

async function generateImage(item, index) {
  try {
    console.log(`\n[${index + 1}/${newInventoryItems.length}] Generating: ${item.name}`)
    console.log(`Style: ${item.style} | Category: ${item.category}/${item.subcategory}`)
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image-preview' })
    
    const result = await model.generateContent([{
      text: item.prompt
    }])
    
    const response = await result.response
    const parts = response.candidates?.[0]?.content?.parts
    
    if (!parts || parts.length === 0) {
      throw new Error('No content parts generated')
    }
    
    const imagePart = parts.find(part => part.inlineData)
    if (!imagePart || !imagePart.inlineData) {
      throw new Error('No image was generated')
    }
    
    // Create directory structure
    const categoryDir = path.join('assets/inventory', item.category)
    const subcategoryDir = path.join(categoryDir, item.subcategory)
    
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true })
    }
    if (!fs.existsSync(subcategoryDir)) {
      fs.mkdirSync(subcategoryDir, { recursive: true })
    }
    
    // Save image
    const filename = item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const filepath = path.join(subcategoryDir, `${item.style.toLowerCase()}-${filename}.png`)
    
    // Convert base64 to buffer and save
    const imageBuffer = Buffer.from(imagePart.inlineData.data, 'base64')
    fs.writeFileSync(filepath, imageBuffer)
    
    console.log(`✅ Generated: ${filepath}`)
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    return {
      ...item,
      imageUrl: `/assets/inventory/${item.category}/${item.subcategory}/${item.style.toLowerCase()}-${filename}.png`,
      success: true
    }
    
  } catch (error) {
    console.error(`❌ Failed to generate ${item.name}:`, error.message)
    return {
      ...item,
      success: false,
      error: error.message
    }
  }
}

async function main() {
  console.log('🍌 Starting Nano Banana Inventory Generation')
  console.log(`📊 Generating ${newInventoryItems.length} new inventory items...`)
  
  const results = []
  
  for (let i = 0; i < newInventoryItems.length; i++) {
    const result = await generateImage(newInventoryItems[i], i)
    results.push(result)
  }
  
  // Summary
  const successful = results.filter(r => r.success)
  const failed = results.filter(r => !r.success)
  
  console.log('\n📈 GENERATION SUMMARY:')
  console.log(`✅ Successful: ${successful.length}`)
  console.log(`❌ Failed: ${failed.length}`)
  
  if (failed.length > 0) {
    console.log('\n❌ Failed Items:')
    failed.forEach(item => {
      console.log(`  - ${item.name}: ${item.error}`)
    })
  }
  
  console.log('\n🎯 Next Steps:')
  console.log('1. Add successful items to lib/inventory/catalog.ts')
  console.log('2. Update product IDs (16-30)')
  console.log('3. Test compatibility with room visualization')
}

// Check for API key
if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  console.error('❌ GOOGLE_GENERATIVE_AI_API_KEY environment variable not set')
  process.exit(1)
}

main().catch(console.error)