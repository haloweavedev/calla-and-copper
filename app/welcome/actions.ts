'use server'

import { createStorageClient } from '@/lib/supabase/storage'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import type { StyleSelection, RoomType, Budget } from '@/lib/store/demo-store'
import { productCatalog } from '@/lib/mock-data/products'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

interface AnalyzeRoomParams {
  style: StyleSelection | null;
  roomType: RoomType;
  budget: Budget;
  lifestyleTags: string[];
  image: File;
}

export async function analyzeAndMatch(params: AnalyzeRoomParams) {
  console.log('[SERVER] Received request to analyze room.');
  const prisma = new PrismaClient()
  
  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      redirect('/login')
    }

    const supabase = createStorageClient();
    console.log('[SERVER] Supabase storage client created.');

    // 1. Convert image to base64 for Gemini usage later
    const arrayBuffer = await params.image.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = params.image.type;
    console.log('[SERVER] Image converted to base64 for Gemini usage.');

    // 2. Upload image to Supabase Storage for OpenAI Vision
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

    // 3. Get public URL of the uploaded image for OpenAI Vision
    const { data: { publicUrl } } = supabase.storage
      .from('product-assets')
      .getPublicUrl(filePath);
    console.log(`[SERVER] Got public URL for image: ${publicUrl}`);

    if (!publicUrl) {
      console.error('[SERVER] Failed to get public URL.');
      return { error: 'Could not retrieve image URL after upload.' };
    }

    // Save upload record to database
    await prisma.userUpload.create({
      data: {
        userId: session.user.id,
        fileName: params.image.name,
        filePath: filePath,
        publicUrl: publicUrl,
        mimeType: mimeType,
        fileSize: params.image.size,
      }
    })
    console.log('[SERVER] Upload record saved to database.');

    // 4. Call OpenAI Vision API
    const systemPrompt = `You are an expert interior design assistant. Your task is to analyze an image of a user's room in the context of their stated style preferences. Based on ALL the information, provide a structured analysis of the room. Identify key visual elements, materials, lighting conditions, and overall current vibe. Generate a list of descriptive tags that can be used to match products. The user's desired style is the most important factor.`;
    const userPrompt = `User Preferences:\n- Desired Style: ${params.style || 'AI-Powered Discovery (let AI determine best style)'}\n- Room Type: ${params.roomType}\n- Budget: ${params.budget}\n- Lifestyle Needs: ${params.lifestyleTags.join(', ')}\n\nAnalyze the room in the provided image and generate a description and tags.`;
    
    console.log('[SERVER] Calling OpenAI Vision API...');
    const { object: analysis } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        description: z.string().describe("A brief, one-paragraph description of the room's current state, style, and key features."),
        tags: z.array(z.string()).describe("A list of 5-10 descriptive tags about the room (e.g., 'natural-light', 'wooden-floor', 'white-walls', 'needs-color', 'cluttered')."),
        colorPalette: z
          .array(z.string())
          .describe("A list of the 3-5 dominant colors in the room (e.g., 'beige', 'oak-wood', 'charcoal-gray').")
          .optional(),
      }),
      system: systemPrompt,
      messages: [{ role: 'user', content: [{ type: 'text', text: userPrompt }, { type: 'image', image: publicUrl }] }],
    });
    console.log('[SERVER] OpenAI analysis successful:', analysis);

    // 5. Match products from catalog using a scoring system
    console.log('[SERVER] Matching products from catalog with scoring system...');
    const scoredProducts = productCatalog.map((product) => {
      let score = 0
      // Major score for matching the desired style (skip if no style selected)
      if (params.style && product.style === params.style) {
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
      : params.style 
        ? productCatalog.filter((p) => p.style === params.style).slice(0, 3)
        : productCatalog.slice(0, 3) // If no style, return top 3 products

    console.log('[SERVER] Analysis and matching complete. Returning results.');
    return { analysis, recommendations: finalRecommendations, publicUrl, base64String, mimeType, error: null };

  } catch (e: unknown) {
    console.error('[SERVER] A critical error occurred in analyzeAndMatch:', e);
    return { error: e instanceof Error ? e.message : 'An unexpected server error occurred.' };
  } finally {
    await prisma.$disconnect()
  }
}

export async function getUserUploadedImages() {
  const prisma = new PrismaClient()
  
  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      redirect('/login')
    }

    // Fetch user's uploaded images, most recent first
    const uploads = await prisma.userUpload.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { uploads, error: null }
  } catch (e: unknown) {
    console.error('[SERVER] Error fetching user uploads (DB might be paused):', e)
    // Return empty array when database is unreachable
    return { error: null, uploads: [] }
  } finally {
    try {
      await prisma.$disconnect()
    } catch {}
  }
}

export async function analyzeExistingImage(params: Omit<AnalyzeRoomParams, 'image'> & { imageUrl: string }) {
  console.log('[SERVER] Received request to analyze existing image.');
  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      redirect('/login')
    }

    // 4. Call OpenAI Vision API with existing image URL
    const systemPrompt = `You are an expert interior design assistant. Your task is to analyze an image of a user's room in the context of their stated style preferences. Based on ALL the information, provide a structured analysis of the room. Identify key visual elements, materials, lighting conditions, and overall current vibe. Generate a list of descriptive tags that can be used to match products. The user's desired style is the most important factor.`;
    const userPrompt = `User Preferences:\n- Desired Style: ${params.style || 'AI-Powered Discovery (let AI determine best style)'}\n- Room Type: ${params.roomType}\n- Budget: ${params.budget}\n- Lifestyle Needs: ${params.lifestyleTags.join(', ')}\n\nAnalyze the room in the provided image and generate a description and tags.`;
    
    console.log('[SERVER] Calling OpenAI Vision API...');
    const { object: analysis } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        description: z.string().describe("A brief, one-paragraph description of the room's current state, style, and key features."),
        tags: z.array(z.string()).describe("A list of 5-10 descriptive tags about the room (e.g., 'natural-light', 'wooden-floor', 'white-walls', 'needs-color', 'cluttered')."),
        colorPalette: z
          .array(z.string())
          .describe("A list of the 3-5 dominant colors in the room (e.g., 'beige', 'oak-wood', 'charcoal-gray').")
          .optional(),
      }),
      system: systemPrompt,
      messages: [{ role: 'user', content: [{ type: 'text', text: userPrompt }, { type: 'image', image: params.imageUrl }] }],
    });
    console.log('[SERVER] OpenAI analysis successful:', analysis);

    // 5. Match products from catalog using a scoring system
    console.log('[SERVER] Matching products from catalog with scoring system...');
    const scoredProducts = productCatalog.map((product) => {
      let score = 0
      // Major score for matching the desired style (skip if no style selected)
      if (params.style && product.style === params.style) {
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
      : params.style 
        ? productCatalog.filter((p) => p.style === params.style).slice(0, 3)
        : productCatalog.slice(0, 3) // If no style, return top 3 products

    console.log('[SERVER] Analysis and matching complete. Returning results.');
    return { analysis, recommendations: finalRecommendations, publicUrl: params.imageUrl, error: null };

  } catch (e: unknown) {
    console.error('[SERVER] A critical error occurred in analyzeExistingImage:', e);
    return { error: e instanceof Error ? e.message : 'An unexpected server error occurred.' };
  }
}

export async function deleteUserUpload(uploadId: string) {
  console.log('[SERVER] Received request to delete upload:', uploadId);
  const prisma = new PrismaClient()
  
  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      redirect('/login')
    }

    // Verify the upload belongs to the current user before deleting
    const upload = await prisma.userUpload.findUnique({
      where: { id: uploadId },
    })

    if (!upload) {
      return { error: 'Upload not found.' }
    }

    if (upload.userId !== session.user.id) {
      return { error: 'Unauthorized to delete this upload.' }
    }

    // Delete the upload record from database
    await prisma.userUpload.delete({
      where: { id: uploadId },
    })

    // Optionally delete from Supabase storage as well
    try {
      const supabase = createStorageClient()
      const { error: storageError } = await supabase.storage
        .from('product-assets')
        .remove([upload.filePath])
      
      if (storageError) {
        console.warn('[SERVER] Failed to delete file from storage:', storageError.message)
        // Don't fail the entire operation if storage deletion fails
      }
    } catch (storageError) {
      console.warn('[SERVER] Storage deletion error:', storageError)
    }

    console.log('[SERVER] Upload deleted successfully:', uploadId)
    return { success: true, error: null }

  } catch (e: unknown) {
    console.error('[SERVER] Error deleting upload:', e)
    return { error: e instanceof Error ? e.message : 'Failed to delete upload.' }
  } finally {
    await prisma.$disconnect()
  }
}