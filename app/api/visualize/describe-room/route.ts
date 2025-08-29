import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import { NextRequest, NextResponse } from 'next/server'

const RoomDescriptionSchema = z.object({
  description: z.string().describe('A concise one-sentence description of the room style and lighting.'),
  mainFurnitureItem: z.string().describe('The single most prominent piece of furniture that could be replaced, e.g., rug, sofa, chair, coffee table.')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl } = body

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Missing required field: imageUrl' },
        { status: 400 }
      )
    }

    console.log('[API] Describing room from image:', imageUrl)

    const { object: roomDescription } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: RoomDescriptionSchema,
      system: 'You are an expert interior designer. Your task is to analyze an image of a room and return a structured description, identifying the main replaceable furniture item.',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Analyze this room' },
            { type: 'image', image: imageUrl }
          ]
        }
      ]
    })

    console.log('[API] Room description generated successfully:', roomDescription)

    return NextResponse.json(roomDescription, { status: 200 })

  } catch (error) {
    console.error('[API] Error in describe-room route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}