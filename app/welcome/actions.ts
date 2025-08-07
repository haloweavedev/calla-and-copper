'use server'

import { createClient } from '@/lib/supabase/server'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import type { StyleSelection, RoomType, Budget } from '@/lib/store/demo-store'

// Mock Product Catalog
const productCatalog = [
    { id: 1, name: 'Oakwood Minimalist Chair', style: 'SCANDINAVIAN', tags: ['wood', 'minimal', 'light-tone'], price: 250, imageUrl: '/images/products/chair1.jpg' },
    { id: 2, name: 'Steel Frame Coffee Table', style: 'INDUSTRIAL', tags: ['metal', 'urban', 'raw-finish'], price: 350, imageUrl: '/images/products/table1.jpg' },
    { id: 3, name: 'Macrame Wall Hanging', style: 'BOHO', tags: ['textured', 'natural-fiber', 'eclectic'], price: 80, imageUrl: '/images/products/wall-art1.jpg' },
    { id: 4, name: 'Gloss White Sideboard', style: 'MODERN', tags: ['sleek', 'contemporary', 'storage'], price: 600, imageUrl: '/images/products/sideboard1.jpg' },
    { id: 5, name: 'Velvet Chesterfield Sofa', style: 'VINTAGE', tags: ['classic', 'cozy', 'upholstered'], price: 1200, imageUrl: '/images/products/sofa1.jpg' },
    { id: 6, name: 'Edison Bulb Pendant Light', style: 'INDUSTRIAL', tags: ['lighting', 'metal', 'exposed-bulb'], price: 120, imageUrl: '/images/products/light1.jpg' },
    { id: 7, name: 'Linen Blend Throw Pillow', style: 'SCANDINAVIAN', tags: ['cozy', 'natural-fiber', 'minimal'], price: 50, imageUrl: '/images/products/pillow1.jpg' },
];

interface AnalyzeRoomParams {
  style: StyleSelection;
  roomType: RoomType;
  budget: Budget;
  lifestyleTags: string[];
  image: File;
}

export async function analyzeAndMatch(params: AnalyzeRoomParams) {
  const supabase = await createClient()

  // 1. Upload image to Supabase Storage
  const filePath = `room-uploads/${Date.now()}-${params.image.name}`
  const { error: uploadError } = await supabase.storage
    .from('product_assets') // Ensure this bucket exists and is public
    .upload(filePath, params.image)

  if (uploadError) {
    console.error('Supabase Upload Error:', uploadError)
    throw new Error('Failed to upload room photo.')
  }

  // 2. Get public URL of the uploaded image
  const { data: { publicUrl } } = supabase.storage
    .from('product_assets')
    .getPublicUrl(filePath)

  // 3. Call OpenAI Vision API
  const systemPrompt = `You are an expert interior design assistant. Your task is to analyze an image of a user's room in the context of their stated style preferences. Based on ALL the information, provide a structured analysis of the room. Identify key visual elements, materials, lighting conditions, and overall current vibe. Generate a list of descriptive tags that can be used to match products. The user's desired style is the most important factor.`

  const userPrompt = `
    User Preferences:
    - Desired Style: ${params.style}
    - Room Type: ${params.roomType}
    - Budget: ${params.budget}
    - Lifestyle Needs: ${params.lifestyleTags.join(', ')}

    Analyze the room in the provided image and generate a description and tags.
  `

  const { object: analysis } = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: z.object({
      description: z.string().describe("A brief, one-paragraph description of the room's current state, style, and key features."),
      tags: z.array(z.string()).describe("A list of 5-10 descriptive tags about the room (e.g., 'natural-light', 'wooden-floor', 'white-walls', 'needs-color', 'cluttered')."),
      colorPalette: z.array(z.string()).describe("A list of the 3-5 dominant colors in the room (e.g., 'beige', 'oak-wood', 'charcoal-gray')."),
    }),
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: userPrompt },
          { type: 'image', image: publicUrl },
        ],
      },
    ],
  })

  // 4. Match products from catalog
  const recommendedProducts = productCatalog.filter(product => {
    // Primary filter: must match the user's chosen style
    if (product.style !== params.style) {
      return false
    }
    // Secondary filter: check for tag overlap
    const matchingTags = product.tags.filter(tag => analysis.tags.includes(tag))
    return matchingTags.length > 0
  })

  return {
    analysis,
    recommendations: recommendedProducts.length > 0 ? recommendedProducts : productCatalog.filter(p => p.style === params.style).slice(0, 3) // Fallback to style match
  }
}