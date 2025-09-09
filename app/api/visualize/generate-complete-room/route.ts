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
        inputImageUrl: 'data:' + roomImageMimeType + ';base64,' + roomImageBase64,
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

    // Create specific replacement instructions for each furniture category
    const sofaProduct = products.find(p => p.category === 'Sofas')
    const tableProduct = products.find(p => p.category === 'Tables')  
    const chairProduct = products.find(p => p.category === 'Chairs')
    const storageProduct = products.find(p => p.category === 'Storage')
    const rugProduct = products.find(p => p.category === 'Rugs')
    const decorProduct = products.find(p => p.category === 'Decor')

    let replacementInstructions = []
    let imageIndex = 1 // Start from 1 since 0 is the room image
    
    if (sofaProduct && imageIndex <= 3) {
      replacementInstructions.push(`take the ${sofaProduct.name} from image ${imageIndex + 1} and place it in the center of the room facing the existing sideboard`)
      imageIndex++
    }
    if (tableProduct && imageIndex <= 3) {
      replacementInstructions.push(`take the ${tableProduct.name} from image ${imageIndex + 1} and put it in front of the sofa as a coffee table`)
      imageIndex++
    }
    if (chairProduct && imageIndex <= 3) {
      replacementInstructions.push(`take the ${chairProduct.name} from image ${imageIndex + 1} and position it to the side of the room as an accent chair`)
      imageIndex++
    }
    if (storageProduct && storageProduct.name !== 'Walnut Record Console' && imageIndex <= 3) {
      replacementInstructions.push(`replace the existing sideboard with the ${storageProduct.name} from one of the product images`)
    }
    if (rugProduct) replacementInstructions.push(`add the ${rugProduct.name} under the seating area`)
    if (decorProduct && decorProduct.name !== 'Ornate Gilt Mirror') replacementInstructions.push(`replace the round mirror with the ${decorProduct.name}`)
    
    // Add personalization context from user analysis
    let personalizationContext = ''
    if (userContext) {
      const { styleProfile, analysisResult, lifestyleTags, roomType, budget } = userContext
      
      // Extract style information
      const primaryStyle = styleProfile?.styleProfile?.styleHierarchy?.foundation || analysisResult?.tags?.find(tag => tag.includes('vintage') || tag.includes('modern') || tag.includes('boho')) || 'harmonious'
      
      // Create personalization details
      personalizationContext = `Style the arrangement for a ${primaryStyle} aesthetic that feels cozy and inviting. `
      
      if (lifestyleTags?.length > 0) {
        personalizationContext += `Consider the lifestyle needs: ${lifestyleTags.join(', ')}. `
      }
      
      if (roomType) {
        personalizationContext += `Optimize the layout and flow for a ${roomType}. `
      }
      
      personalizationContext += `Arrange the ${products.length} products together harmoniously to create a cohesive, lived-in feeling. `
    }

    // Reference images specifically like the docs composition example with personalization
    let promptText = `Using the first image of the room as the base, make these specific changes: ${replacementInstructions.join(', ')}. Keep the walls, flooring, lighting, windows, and architectural details exactly the same as the first image. Use the furniture from the subsequent product images and arrange them in a natural, livable way. ${personalizationContext}Make the space feel warm, inviting, and perfectly suited to the user's lifestyle and aesthetic preferences.`

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
    console.log('[API] Room image data - First 50 chars:', roomImageBase64?.substring(0, 50))

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