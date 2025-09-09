'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDemoStore } from '@/lib/store/demo-store'

export function Step4Results() {
  const { analysisResult, recommendations, creationId } = useDemoStore()
  const router = useRouter()

  useEffect(() => {
    console.log('[CLIENT] Step4Results useEffect triggered:', {
      hasAnalysis: !!analysisResult,
      hasRecommendations: !!recommendations,
      recommendationsLength: recommendations?.length,
      hasCreationId: !!creationId,
      creationId
    })
    
    if (analysisResult && recommendations && recommendations.length > 0) {
      if (creationId) {
        console.log('[CLIENT] All conditions met, redirecting to:', `/dashboard/${creationId}`)
        router.push(`/dashboard/${creationId}`)
      } else {
        // Fallback: redirect after a short delay if creationId is missing
        console.log('[CLIENT] Missing creationId, using fallback redirect after 2s')
        setTimeout(() => {
          const fallbackId = Date.now().toString()
          router.push(`/dashboard/${fallbackId}`)
        }, 2000)
      }
    }
  }, [analysisResult, recommendations, creationId, router])

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold animate-pulse">Analyzing your space...</h1>
      <p>Our AI is curating your personalized matches.</p>
    </div>
  )
}