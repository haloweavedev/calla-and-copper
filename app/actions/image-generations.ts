'use server'

import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getUserGenerationHistory() {
  const prisma = new PrismaClient()
  
  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      redirect('/login')
    }

    // Fetch user's image generations, most recent first
    const generations = await prisma.imageGeneration.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limit to last 50 generations
    })

    return { generations, error: null }
  } catch (e: unknown) {
    console.error('[SERVER] Error fetching generation history:', e)
    return { error: e instanceof Error ? e.message : 'Failed to fetch generation history.', generations: [] }
  } finally {
    await prisma.$disconnect()
  }
}

export async function getUserGenerationStats() {
  const prisma = new PrismaClient()
  
  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      redirect('/login')
    }

    // Get generation counts
    const [totalGenerations, todayGenerations, completedGenerations, failedGenerations] = await Promise.all([
      prisma.imageGeneration.count({
        where: { userId: session.user.id },
      }),
      prisma.imageGeneration.count({
        where: { 
          userId: session.user.id,
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of today
          },
        },
      }),
      prisma.imageGeneration.count({
        where: { 
          userId: session.user.id,
          status: 'completed',
        },
      }),
      prisma.imageGeneration.count({
        where: { 
          userId: session.user.id,
          status: 'failed',
        },
      }),
    ])

    // Get generation counts by type
    const generationsByType = await prisma.imageGeneration.groupBy({
      by: ['generationType'],
      where: { userId: session.user.id },
      _count: {
        generationType: true,
      },
    })

    // Calculate average processing time for completed generations
    const avgProcessingTime = await prisma.imageGeneration.aggregate({
      where: { 
        userId: session.user.id,
        status: 'completed',
        processingTimeMs: { not: null },
      },
      _avg: {
        processingTimeMs: true,
      },
    })

    const stats = {
      totalGenerations,
      todayGenerations,
      completedGenerations,
      failedGenerations,
      successRate: totalGenerations > 0 ? Math.round((completedGenerations / totalGenerations) * 100) : 0,
      averageProcessingTimeSeconds: avgProcessingTime._avg.processingTimeMs 
        ? Math.round(avgProcessingTime._avg.processingTimeMs / 1000) 
        : null,
      generationsByType: generationsByType.reduce((acc, item) => {
        acc[item.generationType] = item._count.generationType
        return acc
      }, {} as Record<string, number>),
    }

    return { stats, error: null }
  } catch (e: unknown) {
    console.error('[SERVER] Error fetching generation stats:', e)
    return { error: e instanceof Error ? e.message : 'Failed to fetch generation stats.', stats: null }
  } finally {
    await prisma.$disconnect()
  }
}

export async function checkGenerationLimits() {
  const prisma = new PrismaClient()
  
  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      redirect('/login')
    }

    // Check daily limit (example: 50 generations per day)
    const DAILY_LIMIT = 50
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0))
    
    const todayGenerations = await prisma.imageGeneration.count({
      where: { 
        userId: session.user.id,
        createdAt: {
          gte: todayStart,
        },
      },
    })

    const canGenerate = todayGenerations < DAILY_LIMIT
    const remainingGenerations = Math.max(0, DAILY_LIMIT - todayGenerations)

    return { 
      canGenerate, 
      remainingGenerations, 
      dailyLimit: DAILY_LIMIT,
      usedToday: todayGenerations,
      error: null 
    }
  } catch (e: unknown) {
    console.error('[SERVER] Error checking generation limits:', e)
    return { 
      error: e instanceof Error ? e.message : 'Failed to check generation limits.',
      canGenerate: false,
      remainingGenerations: 0,
      dailyLimit: 50,
      usedToday: 0,
    }
  } finally {
    await prisma.$disconnect()
  }
}