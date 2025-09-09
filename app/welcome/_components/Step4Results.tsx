'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDemoStore } from '@/lib/store/demo-store'

export function Step4Results() {
  const { analysisResult, recommendations } = useDemoStore()
  const router = useRouter()

  useEffect(() => {
    if (analysisResult && recommendations && recommendations.length > 0) {
      // Generate a unique ID for this session (could be timestamp-based or UUID)
      const sessionId = Date.now().toString()
      router.push(`/dashboard/${sessionId}`)
    }
  }, [analysisResult, recommendations, router])

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold animate-pulse">Analyzing your space...</h1>
      <p>Our AI is curating your personalized matches.</p>
    </div>
  )
}