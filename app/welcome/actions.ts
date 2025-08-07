'use server'

import { createClient } from '@/lib/supabase/server'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import type { StyleSelection, RoomType, Budget } from '@/lib/store/demo-store'
import { productCatalog } from '@/lib/mock-data/products'

interface AnalyzeRoomParams {
  style: StyleSelection;
  roomType: RoomType;
  budget: Budget;
  lifestyleTags: string[];
  image: File;
}

export async function analyzeAndMatch(params: AnalyzeRoomParams) {
  console.log('[SERVER] Received request to analyze room.');
  try {
    const supabase = await createClient();
    console.log('[SERVER] Supabase client created.');

    // 1. Upload image to Supabase Storage
    const filePath = `room-uploads/${Date.now()}-${params.image.name}`;
    console.log(`[SERVER] Attempting to upload to Supabase Storage at path: ${filePath}`);
    
    const { error: uploadError } = await supabase.storage
      .from('product-assets')
      .upload(filePath, params.image);

    if (uploadError) {
      console.error('[SERVER] Supabase Upload Error:', uploadError.message);
      return { error: `Storage Error: ${uploadError.message}` };
    }
    console.log('[SERVER] Image upload successful.');

    // 2. Get public URL of the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from('product-assets')
      .getPublicUrl(filePath);
    console.log(`[SERVER] Got public URL for image: ${publicUrl}`);

    if (!publicUrl) {
      console.error('[SERVER] Failed to get public URL.');
      return { error: 'Could not retrieve image URL after upload.' };
    }

    // 3. Call OpenAI Vision API
    const systemPrompt = `You are an expert interior design assistant. Your task is to analyze an image of a user's room in the context of their stated style preferences. Based on ALL the information, provide a structured analysis of the room. Identify key visual elements, materials, lighting conditions, and overall current vibe. Generate a list of descriptive tags that can be used to match products. The user's desired style is the most important factor.`;
    const userPrompt = `User Preferences:\n- Desired Style: ${params.style}\n- Room Type: ${params.roomType}\n- Budget: ${params.budget}\n- Lifestyle Needs: ${params.lifestyleTags.join(', ')}\n\nAnalyze the room in the provided image and generate a description and tags.`;
    
    console.log('[SERVER] Calling OpenAI Vision API...');
    const { object: analysis } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        description: z.string().describe("A brief, one-paragraph description of the room's current state, style, and key features."),
        tags: z.array(z.string()).describe("A list of 5-10 descriptive tags about the room (e.g., 'natural-light', 'wooden-floor', 'white-walls', 'needs-color', 'cluttered')."),
        colorPalette: z.array(z.string()).describe("A list of the 3-5 dominant colors in the room (e.g., 'beige', 'oak-wood', 'charcoal-gray')."),
      }),
      system: systemPrompt,
      messages: [{ role: 'user', content: [{ type: 'text', text: userPrompt }, { type: 'image', image: publicUrl }] }],
    });
    console.log('[SERVER] OpenAI analysis successful:', analysis);

    // 4. Match products from catalog using a scoring system
    console.log('[SERVER] Matching products from catalog with scoring system...');
    const scoredProducts = productCatalog.map((product) => {
      let score = 0
      // Major score for matching the desired style
      if (product.style === params.style) {
        score += 10
      }
      // Score for overlapping tags between product and AI analysis
      const matchingTags = product.tags.filter((tag) => analysis.tags.includes(tag))
      score += matchingTags.length * 2
      // Bonus points if product category seems relevant to room type
      if (params.roomType === 'Living Room' && ['Chairs', 'Sofas', 'Tables', 'Rugs'].includes(product.category)) {
        score += 3
      }
      if (params.roomType === 'Bedroom' && ['Beds', 'Storage', 'Rugs'].includes(product.category)) {
        score += 3
      }
      if (params.roomType === 'Home Office' && ['Chairs', 'Storage', 'Lighting'].includes(product.category)) {
        score += 3
      }
      if (params.roomType === 'Kitchen' && ['Tables', 'Lighting', 'Storage'].includes(product.category)) {
        score += 3
      }
      return { ...product, score }
    })

    const recommendedProducts = scoredProducts
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score)

    console.log(`[SERVER] Found ${recommendedProducts.length} products with a score > 0.`)
    console.log('[SERVER] Top 5 scored products:', recommendedProducts.slice(0, 5).map((p) => ({ name: p.name, score: p.score })))

    const finalRecommendations = recommendedProducts.length > 0
      ? recommendedProducts.slice(0, 6)
      : productCatalog.filter((p) => p.style === params.style).slice(0, 3)

    console.log('[SERVER] Analysis and matching complete. Returning results.');
    return { analysis, recommendations: finalRecommendations, error: null };

  } catch (e: unknown) {
    console.error('[SERVER] A critical error occurred in analyzeAndMatch:', e);
    return { error: e instanceof Error ? e.message : 'An unexpected server error occurred.' };
  }
}