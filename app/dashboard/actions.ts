'use server'

import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

const prisma = new PrismaClient()

export async function getSmartSuggestions() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  // 1. Fetch user preferences and all products from DB
  const [userProfile, products] = await Promise.all([
    prisma.userProfile.findUnique({ where: { userId: session.user.id } }),
    prisma.product.findMany({ where: { status: 'ACTIVE' } }),
  ])

  if (!userProfile) {
    // User hasn't completed onboarding
    redirect('/onboarding')
  }

  // 2. Construct the prompt for the AI
  const systemPrompt = `
    You are an expert interior designer for an e-commerce store called "Calla & Copper".
    Your task is to analyze the user's style preferences and a list of available products.
    You must recommend a curated list of products that best match the user's taste.
    For each recommendation, provide a short, compelling reason why it's a good fit.
    Only return products from the provided list.
  `

  const userContext = `
    User Preferences:
    - Style: ${userProfile.preferredStyle}
    - Budget: ${userProfile.budget}
    - Additional Tags: ${userProfile.tags.join(', ')}
  `

  const productCatalog = `
    Available Products (JSON format):
    ${JSON.stringify(products.map(p => ({ id: p.id, name: p.name, description: p.description, category: p.category, styleTags: p.styleTags, price: p.price })))}
  `

  // 3. Call the AI using Vercel AI SDK's generateObject
  const { object: suggestions } = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: z.object({
      recommendations: z.array(
        z.object({
          productId: z.string().describe('The ID of the recommended product.'),
          reason: z.string().describe("A short, 1-2 sentence explanation for why this product is a great match for the user's style and preferences."),
        })
      ),
    }),
    system: systemPrompt,
    prompt: `${userContext}\n\n${productCatalog}`,
  })

  // 4. Fetch full product details for the recommended IDs
  const recommendedProductIds = suggestions.recommendations.map(r => r.productId)
  const recommendedProducts = await prisma.product.findMany({
    where: {
      id: { in: recommendedProductIds },
    },
  })

  // 5. Combine product details with the AI's reasoning
  const finalSuggestions = suggestions.recommendations.map(rec => {
    const productDetails = recommendedProducts.find(p => p.id === rec.productId)
    return {
      ...productDetails,
      reason: rec.reason,
    }
  }).filter(Boolean) // Filter out any potential mismatches

  return finalSuggestions
} 