import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { generationId, status, outputImageUrl } = await request.json()

    if (!generationId) {
      return NextResponse.json({ error: 'Generation ID is required' }, { status: 400 })
    }

    const imageGeneration = await prisma.imageGeneration.updateMany({
      where: {
        id: generationId,
        userId: session.user.id // Ensure user owns the generation
      },
      data: {
        status,
        ...(outputImageUrl && { outputImageUrl })
      }
    })

    if (imageGeneration.count === 0) {
      return NextResponse.json({ error: 'Image generation not found or not authorized' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating creation generation status:', error)
    return NextResponse.json({ error: 'Failed to update creation' }, { status: 500 })
  }
}