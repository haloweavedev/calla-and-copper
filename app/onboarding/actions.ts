'use server'

import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

const prisma = new PrismaClient()

// Define enum types to match our schema
enum Style {
  SCANDINAVIAN = 'SCANDINAVIAN',
  INDUSTRIAL = 'INDUSTRIAL',
  BOHO = 'BOHO',
  MODERN = 'MODERN',
  JAPANDI = 'JAPANDI',
  MINIMALIST = 'MINIMALIST',
  ECLECTIC = 'ECLECTIC'
}

enum RoomType {
  LIVING_ROOM = 'LIVING_ROOM',
  BEDROOM = 'BEDROOM',
  STUDIO = 'STUDIO',
  OFFICE = 'OFFICE',
  DINING_ROOM = 'DINING_ROOM',
  KITCHEN = 'KITCHEN'
}

enum Budget {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  FLEXIBLE = 'FLEXIBLE'
}

interface OnboardingData {
  style: Style
  roomType: RoomType
  budget: Budget
}

export async function saveOnboardingData(data: OnboardingData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/login')
  }

  const user = session.user

  try {
    console.log('Saving onboarding data:', data, 'for user:', user.id)
    
    // Use a transaction to ensure both user and profile data are created
    await prisma.$transaction(async (tx) => {
      // First, ensure the user exists in our database
      await tx.user.upsert({
        where: { id: user.id },
        update: {}, // No updates needed if user already exists
        create: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      })

      // Create or update the UserProfile
      await tx.userProfile.upsert({
        where: { userId: user.id },
        update: {
          preferredStyle: data.style,
          budget: data.budget,
        },
        create: {
          userId: user.id,
          preferredStyle: data.style,
          budget: data.budget,
        },
      })

      // Create the initial RoomData
      await tx.roomData.create({
        data: {
          userId: user.id,
          roomType: data.roomType,
        },
      })
    })

  } catch (error) {
    console.error('Failed to save onboarding data:', error)
    // Optionally, redirect to an error page
    return { error: 'Failed to save your preferences. Please try again.' }
  }

  revalidatePath('/dashboard') // Invalidate cache for the dashboard
  redirect('/dashboard') // Redirect to the dashboard page
} 