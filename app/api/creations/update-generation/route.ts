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

    const { creationId, generationStatus, generatedImageUrl } = await request.json()

    if (!creationId) {
      return NextResponse.json({ error: 'Creation ID is required' }, { status: 400 })
    }

    const creation = await prisma.creation.updateMany({
      where: {
        id: creationId,
        userId: session.user.id // Ensure user owns the creation
      },
      data: {
        generationStatus,
        ...(generatedImageUrl && { generatedImageUrl })
      }
    })

    if (creation.count === 0) {
      return NextResponse.json({ error: 'Creation not found or not authorized' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating creation generation status:', error)
    return NextResponse.json({ error: 'Failed to update creation' }, { status: 500 })
  }
}