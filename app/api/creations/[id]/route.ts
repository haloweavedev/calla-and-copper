import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const prisma = new PrismaClient()

  try {
    // Await params as required by Next.js 15+
    const { id } = await params

    // Get authenticated user
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      await prisma.$disconnect()
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch the creation by ID and ensure it belongs to the current user
    const creation = await prisma.creation.findUnique({
      where: {
        id: id,
      },
    })

    if (!creation) {
      await prisma.$disconnect()
      return NextResponse.json({ error: 'Creation not found' }, { status: 404 })
    }

    // Check if the creation belongs to the current user
    if (creation.userId !== session.user.id) {
      await prisma.$disconnect()
      return NextResponse.json({ error: 'Unauthorized access to this creation' }, { status: 403 })
    }

    return NextResponse.json(creation, { status: 200 })

  } catch (error) {
    console.error('[API] Error fetching creation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}