'use server'

import { createStorageClient } from '@/lib/supabase/storage'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import type { StyleSelection, RoomType, Budget } from '@/lib/store/demo-store'
import { productCatalog, getRecommendations, getEnhancedRecommendations } from '@/lib/inventory'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { headers } from 'next/headers'
import crypto from 'crypto'

interface AnalyzeRoomParams {
  style: StyleSelection | null;
  roomType: RoomType;
  budget: Budget;
  lifestyleTags: string[];
  image: File;
}

const ImageValidationSchema = z.object({
  isValidInterior: z.boolean().describe('True if the image shows an interior room space suitable for interior design purposes, false otherwise.'),
  reason: z.string().describe('Brief explanation of why the image is or is not suitable for interior design analysis.'),
  suggestions: z.string().optional().describe('If not valid, suggest what type of room interior image would work better.')
})

export async function validateRoomImage(imageFile: File): Promise<{
  isValid: boolean;
  reason: string;
  suggestions?: string;
  error?: string;
}> {
  console.log('[SERVER] Starting image validation for:', imageFile.name);
  
  try {
    // Convert image to base64 for OpenAI
    const arrayBuffer = await imageFile.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = imageFile.type;
    const dataUrl = `data:${mimeType};base64,${base64String}`;

    const systemPrompt = `You are an expert interior design consultant. Your task is to validate whether an uploaded image shows an interior room space that is suitable for interior design analysis and furniture recommendations.

ACCEPT these types of images:
- Living rooms, bedrooms, kitchens, dining rooms, home offices
- Empty rooms or rooms with existing furniture
- Any residential or commercial interior spaces
- Rooms in any condition (messy, clean, under renovation)
- Multiple room angles or wide shots of interior spaces

REJECT these types of images:
- Exterior views, outdoor spaces, patios, decks
- People portraits, selfies, or photos focused on people
- Close-up shots of individual objects/furniture pieces
- Non-room images (landscapes, food, products, etc.)
- Blurry or completely dark images where room details can't be seen
- Images that don't show enough of the space to provide design recommendations`;

    const userPrompt = `Please analyze this image and determine if it shows an interior room space suitable for interior design analysis. Consider whether we can identify room features, layout, lighting, and potential for furniture placement recommendations.`;

    console.log('[SERVER] Calling OpenAI Vision API for validation...');
    const { object: validation } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: ImageValidationSchema,
      system: systemPrompt,
      messages: [{ 
        role: 'user', 
        content: [
          { type: 'text', text: userPrompt }, 
          { type: 'image', image: dataUrl }
        ] 
      }],
    });

    console.log('[SERVER] Image validation result:', validation);

    return {
      isValid: validation.isValidInterior,
      reason: validation.reason,
      suggestions: validation.suggestions
    };

  } catch (error: unknown) {
    console.error('[SERVER] Error during image validation:', error);
    return {
      isValid: false,
      reason: 'Unable to process image for validation.',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
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
      console.log('[SERVER] No session found, returning auth error');
      return { error: 'Authentication required. Please log in again.', requiresAuth: true };
    }

    // 1. Validate image before proceeding with storage
    console.log('[SERVER] Validating image before processing...');
    const validationResult = await validateRoomImage(params.image);
    
    if (!validationResult.isValid) {
      console.log('[SERVER] Image validation failed:', validationResult.reason);
      return { 
        error: `Image not suitable for interior design analysis: ${validationResult.reason}`,
        suggestions: validationResult.suggestions
      };
    }
    
    console.log('[SERVER] Image validation passed:', validationResult.reason);

    const supabase = createStorageClient();
    console.log('[SERVER] Supabase storage client created.');

    const mimeType = params.image.type;
    console.log('[SERVER] Image type:', mimeType);

    // 2. Upload image to Supabase Storage
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

    // 3. Get public URL of the uploaded image
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
        id: randomUUID(),
        userId: session.user.id,
        fileName: params.image.name,
        filePath: filePath,
        publicUrl: publicUrl,
        mimeType: mimeType,
        fileSize: params.image.size,
        updatedAt: new Date(),
      }
    })
    console.log('[SERVER] Upload record saved to database.');

    // 4. Call OpenAI Vision API for room analysis
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

    // 5. Get personalized recommendations using enhanced inventory system
    console.log('[SERVER] Getting personalized recommendations using enhanced inventory system...');
    const { allRecommendations, forTransformation } = getEnhancedRecommendations(
      params.style, 
      params.roomType, 
      analysis.tags, 
      params.lifestyleTags,
      {
        minScoreThreshold: 8,  // Only good matches
        forRoomTransformation: true
      }
    )
    
    console.log(`[SERVER] Found ${allRecommendations.length} total recommendations, using top ${forTransformation.length} for transformation`)
    
    // Transform Product objects to match demo store interface
    const finalRecommendations = forTransformation.map(product => ({
      id: product.id,
      name: product.name,
      style: product.style,
      category: product.category,
      description: product.description,
      tags: [
        ...product.materials,
        ...product.styleAttributes,
        ...product.colors,
        ...product.functionality
      ],
      price: product.price,
      imageUrl: product.imageUrl
    }))

    console.log(`[SERVER] Found ${finalRecommendations.length} recommended products.`)
    console.log('[SERVER] Recommendations:', finalRecommendations.map((p) => ({ name: p.name, category: p.category, style: p.style })))

    // 6. Save the complete creation session to database
    let creationId = crypto.randomUUID();
    try {
      console.log('[SERVER] Saving creation session to database...');
      
      await prisma.creation.create({
        data: {
          id: creationId,
          userId: session.user.id,
          style: params.style || null,
          roomType: params.roomType,
          budget: params.budget,
          lifestyleTags: params.lifestyleTags,
          styleProfile: undefined, // Will be added later if needed
          originalImageUrl: publicUrl,
          originalImageMimeType: mimeType,
          analysisResult: analysis,
          recommendedProductIds: finalRecommendations.map(p => p.id.toString()),
          recommendationsData: finalRecommendations,
          generationStatus: 'not_generated',
          name: `${params.style || 'AI-Styled'} ${params.roomType} - ${new Date().toLocaleDateString()}`,
          notes: null,
          isPublic: false,
          updatedAt: new Date()
        }
      });
      console.log('[SERVER] Creation session saved with ID:', creationId);
    } catch (dbError) {
      console.error('[SERVER] Failed to save creation to database:', dbError);
      // Don't fail the entire flow if database save fails, just log the error
      // User can still see results, just won't be saved to history
      creationId = crypto.randomUUID(); // Fallback ID for redirect
    }

    console.log('[SERVER] Analysis and matching complete. Returning results.');
    return { 
      analysis, 
      recommendations: finalRecommendations, 
      publicUrl, 
      mimeType, 
      creationId, 
      error: null 
    };

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
      console.log('[SERVER] No session found in getUserUploadedImages, returning empty uploads');
      return { error: null, uploads: [], requiresAuth: true };
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
      console.log('[SERVER] No session found in analyzeExistingImage, returning auth error');
      return { error: 'Authentication required. Please log in again.', requiresAuth: true };
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

    // 6. Get personalized recommendations using enhanced inventory system
    console.log('[SERVER] Getting personalized recommendations using enhanced inventory system...');
    const { allRecommendations, forTransformation } = getEnhancedRecommendations(
      params.style, 
      params.roomType, 
      analysis.tags, 
      params.lifestyleTags,
      {
        minScoreThreshold: 8,  // Only good matches
        forRoomTransformation: true
      }
    )
    
    console.log(`[SERVER] Found ${allRecommendations.length} total recommendations, using top ${forTransformation.length} for transformation`)
    
    // Transform Product objects to match demo store interface
    const finalRecommendations = forTransformation.map(product => ({
      id: product.id,
      name: product.name,
      style: product.style,
      category: product.category,
      description: product.description,
      tags: [
        ...product.materials,
        ...product.styleAttributes,
        ...product.colors,
        ...product.functionality
      ],
      price: product.price,
      imageUrl: product.imageUrl
    }))

    console.log(`[SERVER] Found ${finalRecommendations.length} recommended products.`)
    console.log('[SERVER] Recommendations:', finalRecommendations.map((p) => ({ name: p.name, category: p.category, style: p.style })))

    // 5. Save the complete creation session to database
    let creationId = crypto.randomUUID();
    try {
      console.log('[SERVER] Saving existing image creation session to database...');
      const prisma = new PrismaClient();
      
      await prisma.creation.create({
        data: {
          id: creationId,
          userId: session.user.id,
          style: params.style || null,
          roomType: params.roomType,
          budget: params.budget,
          lifestyleTags: params.lifestyleTags,
          styleProfile: undefined,
          originalImageUrl: params.imageUrl,
          originalImageMimeType: null, // Will be detected from URL if needed
          analysisResult: analysis,
          recommendedProductIds: finalRecommendations.map(p => p.id.toString()),
          recommendationsData: finalRecommendations,
          generationStatus: 'not_generated',
          name: `${params.style || 'AI-Styled'} ${params.roomType} - ${new Date().toLocaleDateString()}`,
          notes: null,
          isPublic: false,
          updatedAt: new Date()
        }
      });
      console.log('[SERVER] Existing image creation session saved with ID:', creationId);
      await prisma.$disconnect();
    } catch (dbError) {
      console.error('[SERVER] Failed to save existing image creation to database:', dbError);
      creationId = crypto.randomUUID(); // Fallback ID
    }

    console.log('[SERVER] Analysis and matching complete. Returning results.');
    return { 
      analysis, 
      recommendations: finalRecommendations, 
      publicUrl: params.imageUrl, 
      creationId, 
      error: null 
    };

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
      console.log('[SERVER] No session found in deleteUserUpload, returning auth error');
      return { error: 'Authentication required. Please log in again.', requiresAuth: true };
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