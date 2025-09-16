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
      <div className="text-center py-12 flex flex-col items-center justify-center gap-4">
        <video
          src="/logo-loading.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-46 h-46 object-contain opacity-90"
          aria-label="Loading animation"
        />
        <div className="animate-pulse text-gray-600">Our AI is curating your personalized matches...</div>
      </div>
    </div>
  )
}