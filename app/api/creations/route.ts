import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get URL params
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      // Get specific creation by ID
      const creation = await prisma.creation.findFirst({
        where: {
          id: id,
          userId: session.user.id
        }
      })

      if (!creation) {
        return NextResponse.json({ error: 'Creation not found' }, { status: 404 })
      }

      return NextResponse.json(creation)
    } else {
      // Get all creations for the user
      const creations = await prisma.creation.findMany({
        where: {
          userId: session.user.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return NextResponse.json(creations)
    }
  } catch (error) {
    console.error('Error fetching creations:', error)
    return NextResponse.json({ error: 'Failed to fetch creations' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    const creation = await prisma.creation.create({
      data: {
        ...body,
        userId: session.user.id,
        id: body.id || crypto.randomUUID() // Generate ID if not provided
      }
    })

    return NextResponse.json(creation)
  } catch (error) {
    console.error('Error creating creation:', error)
    return NextResponse.json({ error: 'Failed to create creation' }, { status: 500 })
  }
}