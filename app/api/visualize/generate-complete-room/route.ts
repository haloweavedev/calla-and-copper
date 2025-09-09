import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  const startTime = Date.now()
  let generationRecord: any = null

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
    const { roomImageBase64, roomImageMimeType, products, userContext } = body

    // Validate all required fields are present
    if (!roomImageBase64 || !roomImageMimeType || !products || !Array.isArray(products) || products.length === 0) {
      await prisma.$disconnect()
      return NextResponse.json(
        { error: 'Missing required fields: roomImageBase64, roomImageMimeType, products (array)' },
        { status: 400 }
      )
    }

    console.log('[API] Generating complete room with', products.length, 'products')
    console.log('[API] User context provided:', !!userContext)

    // Create generation record
    const productNames = products.map(p => p.name).join(', ')
    generationRecord = await prisma.imageGeneration.create({
      data: {
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
      },
    })

    console.log('[API] Generation record created:', generationRecord.id)

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!)

    // Create a simple, natural prompt following Gemini's best practices
    const productNames = products.map(p => p.name).join(', ')
    
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

    // Simple, natural prompt that lets Gemini decide placement
    let promptText = `Create a new image by combining the room from the first image with the furniture pieces from the following product images. Add the ${productNames} to the room naturally and tastefully${styleContext}. 

Keep the room's walls, flooring, lighting, windows, and all architectural details exactly the same as the original room image. You may remove or replace any existing furniture if needed to make space for the new pieces. Arrange everything in a way that looks natural and livable.

The final image should show the same room with the new furniture pieces integrated seamlessly.`

    console.log('[API] Sending room editing prompt to Gemini:', promptText)
    console.log('[API] Personalization details:')
    console.log(`[API] • ${products.length} products styled together harmoniously`)
    if (userContext) {
      const primaryStyle = userContext.styleProfile?.styleProfile?.styleHierarchy?.foundation || userContext.analysisResult?.tags?.find(tag => tag.includes('vintage') || tag.includes('modern') || tag.includes('boho')) || 'harmonious'
      console.log(`[API] • Designed for ${primaryStyle} aesthetic`)
      if (userContext.roomType) console.log(`[API] • Optimized for ${userContext.roomType} layout and flow`)
      if (userContext.lifestyleTags?.length > 0) console.log(`[API] • Considers lifestyle: ${userContext.lifestyleTags.join(', ')}`)
    }
    console.log('[API] Room image data - MIME type:', roomImageMimeType)
    console.log('[API] Room image data - Base64 length:', roomImageBase64?.length)

    // Following docs multi-image composition - room image first, then product images, then text
    const contentParts = [
      {
        inlineData: {
          mimeType: roomImageMimeType,
          data: roomImageBase64,
        },
      }
    ]

    // Add product images for visual reference (like the docs composition example)
    for (const product of products.slice(0, 3)) { // Limit to 3 products for better performance
      try {
        const response = await fetch(product.imageUrl)
        const arrayBuffer = await response.arrayBuffer()
        const base64ProductImage = Buffer.from(arrayBuffer).toString('base64')
        const mimeType = response.headers.get('content-type') || 'image/jpeg'
        
        contentParts.push({
          inlineData: {
            mimeType: mimeType,
            data: base64ProductImage,
          },
        })
      } catch (error) {
        console.error(`[API] Failed to fetch product image: ${product.imageUrl}`, error)
      }
    }

    // Add the specific placement instructions referencing the images
    contentParts.push({ text: promptText })

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image-preview' })
    const result = await model.generateContent(contentParts)

    console.log('[API] Gemini generation completed, checking for image parts...')

    // Check if result contains image parts
    const response = await result.response
    const parts = response.candidates?.[0]?.content?.parts

    if (!parts || parts.length === 0) {
      throw new Error('No content parts generated by Gemini')
    }

    // Find the first image part
    const imagePart = parts.find((part: any) => part.inlineData)
    
    if (!imagePart || !imagePart.inlineData) {
      throw new Error('No image was generated by Gemini')
    }

    console.log(`[API] Image file received, type: ${imagePart.inlineData.mimeType}`)
    console.log(`[API] Generated image file received successfully`)

    // Get the raw base64 string
    const rawBase64 = imagePart.inlineData.data
    
    // Construct the proper Data URL with prefix
    const dataUrl = `data:${imagePart.inlineData.mimeType || 'image/png'};base64,${rawBase64}`

    console.log('[API] Complete room generation successful, returning data URL')

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