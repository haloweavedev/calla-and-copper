import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  const startTime = Date.now()
  let generationRecord: { id: string } | null = null

  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      await prisma.$disconnect()
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { roomImageBase64, roomImageMimeType, products, userContext, creationId } = body

    console.log('[API] 📨 INCOMING REQUEST DATA:')
    console.log('[API] 🖼️ Room image data:', {
      base64Available: !!roomImageBase64,
      base64Length: roomImageBase64?.length,
      mimeType: roomImageMimeType,
      startsWithSlash: roomImageBase64?.startsWith('/'),
      startsWithData: roomImageBase64?.startsWith('data:'),
      isValidBase64: roomImageBase64 && /^[A-Za-z0-9+/]*={0,2}$/.test(roomImageBase64.slice(0, 100))
    })
    console.log('[API] 🛋️ Products:', products?.length || 0, 'items')
    console.log('[API] 📄 User context provided:', !!userContext)

    // Validate all required fields are present
    if (!roomImageBase64 || !roomImageMimeType || !products || !Array.isArray(products) || products.length === 0) {
      console.log('[API] ❌ VALIDATION FAILED - Missing required fields')
      await prisma.$disconnect()
      return NextResponse.json(
        { error: 'Missing required fields: roomImageBase64, roomImageMimeType, products (array)' },
        { status: 400 }
      )
    }

    console.log('[API] ✅ Validation passed - Generating complete room with', products.length, 'products')

    // Create generation record (with error handling)
    const productNames = products.map(p => p.name).join(', ')
    try {
      generationRecord = await prisma.imageGeneration.create({
        data: {
          id: `gen_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
          userId: session.user.id,
          generationType: 'complete-room',
          prompt: `Complete room with: ${productNames}`,
          inputImageUrl: `data:${roomImageMimeType};base64,[BASE64_DATA]`, // Don't store full base64 to avoid huge logs
          productIds: products.map(p => String(p.id)).filter(Boolean),
          metadata: {
            products: products.map(p => ({
              id: p.id,
              name: p.name,
              category: p.category,
              imageUrl: p.imageUrl,
            })),
            userContext: userContext || null,
          },
          status: 'pending',
          updatedAt: new Date(),
        },
      })
      console.log('[API] ✅ Generation record created:', generationRecord.id)
    } catch (dbError) {
      console.warn('[API] ⚠️ Failed to create generation record (continuing anyway):', dbError)
      // Continue with generation even if DB logging fails
    }


    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!)

    // Create a simple, natural prompt following Gemini's best practices
    
    // Add personalization context
    let styleContext = ''
    if (userContext) {
      const { styleProfile, lifestyleTags } = userContext
      const primaryStyle = styleProfile?.styleProfile?.styleHierarchy?.foundation || 'cozy and inviting'
      styleContext = ` in a ${primaryStyle} style`
      
      if (lifestyleTags?.length > 0) {
        styleContext += ` that suits a ${lifestyleTags.join(', ').toLowerCase()} lifestyle`
      }
    }

    // Use proper semantic masking to edit the existing room image
    const promptText = `Using the provided room image, add the furniture pieces from the product images to the available floor space. Place each item where it would naturally belong: ${products.map(p => `${p.name} (${p.category})`).join(', ')}. Keep all walls, flooring, windows, lighting, architectural details, and existing built-in features completely unchanged${styleContext}. Only add the new furniture to empty areas of the floor.`

    console.log('[API] Sending room editing prompt to Gemini:', promptText)
    console.log('[API] Personalization details:')
    console.log(`[API] • ${products.length} products styled together harmoniously`)
    if (userContext) {
      const primaryStyle = userContext.styleProfile?.styleProfile?.styleHierarchy?.foundation || userContext.analysisResult?.tags?.find((tag: string) => tag.includes('vintage') || tag.includes('modern') || tag.includes('boho')) || 'harmonious'
      console.log(`[API] • Designed for ${primaryStyle} aesthetic`)
      if (userContext.roomType) console.log(`[API] • Optimized for ${userContext.roomType} layout and flow`)
      if (userContext.lifestyleTags?.length > 0) console.log(`[API] • Considers lifestyle: ${userContext.lifestyleTags.join(', ')}`)
    }
    console.log('[API] Room image data - MIME type:', roomImageMimeType)
    console.log('[API] Room image data - Base64 length:', roomImageBase64?.length)

    // Following docs multi-image composition - room image first, then product images, then text
    console.log('[API] 📝 Preparing content parts for Gemini:')
    console.log('[API] 🖼️ Room image part:', {
      mimeType: roomImageMimeType,
      dataLength: roomImageBase64?.length,
      dataPreview: roomImageBase64?.substring(0, 50) + '...' || 'NO DATA'
    })
    
    const contentParts: { inlineData?: { mimeType: string; data: string }; text?: string }[] = []
    contentParts.push({
      inlineData: {
        mimeType: roomImageMimeType,
        data: roomImageBase64,
      },
    })

    // Add product images for visual reference - LIMIT TO 2 to stay within Gemini's 3-image limit
    console.log('[API] 🛋️ Fetching product images for Gemini (max 2 to preserve room)...')
    for (const product of products.slice(0, 2)) { // Limit to 2 products to stay within 3 total images
      try {
        console.log(`[API] 🍇 Fetching product image: ${product.name} - ${product.imageUrl}`)
        const response = await fetch(product.imageUrl)
        const arrayBuffer = await response.arrayBuffer()
        const base64ProductImage = Buffer.from(arrayBuffer).toString('base64')
        const mimeType = response.headers.get('content-type') || 'image/jpeg'
        
        console.log(`[API] ✅ Product image fetched: ${product.name}, base64 length: ${base64ProductImage.length}`)
        
        contentParts.push({
          inlineData: {
            mimeType: mimeType,
            data: base64ProductImage,
          },
        })
      } catch (error) {
        console.error(`[API] ❌ Failed to fetch product image: ${product.imageUrl}`, error)
      }
    }
    
    console.log('[API] 📊 Content parts prepared for Gemini:', {
      totalParts: contentParts.length,
      roomImagePart: 1,
      productImageParts: contentParts.length - 2, // -2 for room image and text parts
      textParts: 1,
      withinLimit: contentParts.length <= 3 ? '✅ WITHIN 3-IMAGE LIMIT' : '❌ EXCEEDS LIMIT'
    })

    // Add the specific placement instructions referencing the images
    contentParts.push({ text: promptText })

    // HARD LIMIT: Only send first 3 parts to Gemini (stay within limit)
    const limitedContentParts = contentParts.slice(0, 3)
    console.log('[API] 🚨 ENFORCING 3-IMAGE LIMIT:', {
      originalParts: contentParts.length,
      limitedParts: limitedContentParts.length,
      parts: limitedContentParts.map((part, i) => 
        'text' in part ? `${i}: TEXT` : `${i}: IMAGE`
      )
    })

    console.log('[API] 🤖 Sending request to Gemini 2.5 Flash Image Preview...')
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image-preview' })
    // @ts-expect-error - Gemini types are complex, but this works at runtime
    const result = await model.generateContent(limitedContentParts)

    console.log('[API] ✅ Gemini generation completed, checking for image parts...')

    // Check if result contains image parts
    const response = await result.response
    const parts = response.candidates?.[0]?.content?.parts

    if (!parts || parts.length === 0) {
      throw new Error('No content parts generated by Gemini')
    }

    // Find the first image part
    const imagePart = parts.find((part: { inlineData?: { mimeType?: string; data?: string } }) => part.inlineData)
    
    if (!imagePart || !imagePart.inlineData) {
      throw new Error('No image was generated by Gemini')
    }

    console.log(`[API] 📸 Generated image received from Gemini:`, {
      mimeType: imagePart.inlineData.mimeType,
      base64Length: imagePart.inlineData.data?.length,
      dataPreview: imagePart.inlineData.data?.substring(0, 50) + '...' || 'NO DATA'
    })

    // Get the raw base64 string
    const rawBase64 = imagePart.inlineData.data
    
    // Construct the proper Data URL with prefix
    const dataUrl = `data:${imagePart.inlineData.mimeType || 'image/png'};base64,${rawBase64}`

    console.log('[API] ✅ Complete room generation successful, returning data URL:', {
      dataUrlLength: dataUrl.length,
      mimeType: imagePart.inlineData.mimeType || 'image/png'
    })

    // Update generation record with success
    if (generationRecord) {
      await prisma.imageGeneration.update({
        where: { id: generationRecord.id },
        data: {
          status: 'completed',
          outputImageUrl: dataUrl,
          processingTimeMs: Date.now() - startTime,
        },
      })
    }

    // Update the creation record with the generated image
    if (creationId) {
      try {
        console.log('[API] 💾 Saving generated image to creation:', creationId)
        await prisma.creation.update({
          where: { id: creationId },
          data: {
            generatedImageUrl: dataUrl,
            generationStatus: 'completed',
            updatedAt: new Date(),
          },
        })
        console.log('[API] ✅ Creation updated with generated image')
      } catch (error) {
        console.error('[API] ❌ Failed to update creation with generated image:', error)
        // Don't fail the entire request if creation update fails
      }
    } else {
      console.warn('[API] ⚠️ No creationId provided, generated image not saved to creation')
    }

    return NextResponse.json({ 
      imageUrl: dataUrl,
      generationId: generationRecord?.id 
    }, { status: 200 })

  } catch (error) {
    console.error('[API] Error in generate-complete-room route:', error)
    
    // Update generation record with error
    if (generationRecord) {
      try {
        await prisma.imageGeneration.update({
          where: { id: generationRecord.id },
          data: {
            status: 'failed',
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
            processingTimeMs: Date.now() - startTime,
          },
        })
      } catch (updateError) {
        console.error('[API] Failed to update generation record:', updateError)
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}