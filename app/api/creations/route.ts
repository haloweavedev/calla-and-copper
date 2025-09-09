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
      // Get specific snapshot by ID
      const snapshot = await prisma.snapshot.findFirst({
        where: {
          id: id,
          userId: session.user.id
        },
        include: {
          snapshotProducts: {
            include: {
              product: true
            }
          }
        }
      })

      if (!snapshot) {
        return NextResponse.json({ error: 'Snapshot not found' }, { status: 404 })
      }

      return NextResponse.json(snapshot)
    } else {
      // Get all snapshots for the user
      const snapshots = await prisma.snapshot.findMany({
        where: {
          userId: session.user.id
        },
        include: {
          snapshotProducts: {
            include: {
              product: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return NextResponse.json(snapshots)
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
    
    const snapshot = await prisma.snapshot.create({
      data: {
        ...body,
        userId: session.user.id
      }
    })

    return NextResponse.json(snapshot)
  } catch (error) {
    console.error('Error creating creation:', error)
    return NextResponse.json({ error: 'Failed to create creation' }, { status: 500 })
  }
}