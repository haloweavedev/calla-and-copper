'use client'
import { useDemoStore } from '@/lib/store/demo-store'
import Image from 'next/image'
import Link from 'next/link'
import { CompleteRoomVisualization } from './_components/CompleteRoomVisualization'
import { useEffect, useState, useCallback } from 'react'
import type { Creation } from '@prisma/client'

interface DashboardGenerationPageProps {
  params: Promise<{ id: string }>
}

export default function DashboardGenerationPage({ params }: DashboardGenerationPageProps) {
  const { analysisResult, recommendations, uploadedFileUrl, setData } = useDemoStore()
  const [creation, setCreation] = useState<Creation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    resolveParams()
  }, [params])

  const fetchCreation = useCallback(async () => {
    if (!resolvedParams) return
    
    try {
      setLoading(true)
      const response = await fetch(`/api/creations/${resolvedParams.id}`)
      if (!response.ok) {
        throw new Error('Creation not found')
      }
      const creationData = await response.json()
      console.log('[DASHBOARD] Creation data received:', {
        id: creationData.id,
        hasGeneratedImage: !!creationData.generatedImageUrl,
        generationStatus: creationData.generationStatus,
        imagePreview: creationData.generatedImageUrl?.substring(0, 50) || 'none'
      })
      setCreation(creationData)
      
      // Set the data in demo store for compatibility
      setData({
        analysisResult: creationData.analysisResult,
        recommendations: creationData.recommendationsData,
        uploadedFileUrl: creationData.originalImageUrl
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load creation')
    } finally {
      setLoading(false)
    }
  }, [resolvedParams, setData])

  useEffect(() => {
    fetchCreation()
  }, [fetchCreation])

  const handleImageGenerated = (imageUrl: string) => {
    // Update the creation state with the new generated image
    setCreation(prev => prev ? { ...prev, generatedImageUrl: imageUrl, generationStatus: 'completed' } : null)
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center py-12 flex flex-col items-center justify-center">
          <video
            src="/logo-loading.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-46 h-46 object-contain opacity-90"
            aria-label="Loading animation"
          />
          <p className='text-gray-600 animate-pulse'>Retrieving your personalized matches...</p>
        </div>
      </div>
    )
  }

  if (error || !creation) {
    return (
      <div className="w-full min-h-screen bg-white text-black flex flex-col p-4 sm:p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">Creation Not Found</h1>
          <p className="mb-4">{error || 'The requested creation could not be found.'}</p>
          <Link href="/welcome" className="px-6 py-2 font-medium bg-black text-white hover:bg-gray-800 transition-colors">
            Start New Analysis
          </Link>
        </div>
      </div>
    )
  }

  if (!analysisResult || !recommendations) {
    return (
      <div className="w-full p-6">
        <div className="text-center py-12 flex flex-col items-center justify-center">
          <video
            src="/logo-loading.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-46 h-46 object-contain opacity-90"
            aria-label="Loading animation"
          />
          <p className='text-gray-600 animate-pulse'>Retrieving your personalized matches...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">Here are your personalized matches</h1>
          <p className="text-lg uppercase font-light">Each recommendation is scored based on your style, space, and budget</p>
        </div>

        {/* Complete Room Visualization */}
        {uploadedFileUrl && recommendations.length > 0 && resolvedParams && (
          <CompleteRoomVisualization 
            products={recommendations} 
            creationId={resolvedParams.id}
            existingGeneratedImage={creation?.generatedImageUrl || null}
            onImageGenerated={handleImageGenerated}
          />
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((product) => (
            <div key={product.id} className="bg-brand-cream border border-8 border-brand-cream flex flex-col transition-all duration-200 hover:scale-105">
              <Link href={`/demo/product/${product.id}`}>
                <div className="w-full h-64 relative bg-white cursor-pointer hover:opacity-90 transition-opacity">
                  <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain' }} />
                </div>
              </Link>
              <div className="text-left mt-2 flex-grow flex flex-col justify-between p-2">
                <div className='mb-4'>
                  <Link href={`/demo/product/${product.id}`}>
                    <h3 className="text-xl font-medium uppercase text-left mb-2 cursor-pointer hover:text-brand-dark-brown transition-colors">{product.name}</h3>
                  </Link>
                  {product.category ? (
                    <p className="font-light text-sm text-left uppercase text-black/60">{product.category}</p>
                  ) : null}
                </div>
                <p className="font-medium text-2xl mb-2">${product.price} <span className="text-sm font-light uppercase">USD</span></p>
              </div>
            </div>
          ))}
        </div>
        {/* Do we need this button? */}
        {/* <div className="text-center mt-12">
          <button onClick={reset} className="px-6 py-2 font-medium transition-all duration-200 bg-white text-black/80 border-2 border-black/80 hover:bg-black/80 hover:text-white cursor-pointer">Start Over</button>
        </div> */}
      </div>
  )
}