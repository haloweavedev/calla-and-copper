'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useDemoStore } from '@/lib/store/demo-store'
import { EyeIcon } from '@heroicons/react/24/solid'

interface ProductVisualizationProps {
  product: {
    imageUrl: string
    category: string
    name: string
  }
}

export function ProductVisualization({ product }: ProductVisualizationProps) {
  const { 
    uploadedFileUrl,
    styleProfile,
    analysisResult,
    lifestyleTags,
    roomType,
    budget
  } = useDemoStore()
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  // Don't render if no room photo is available
  if (!uploadedFileUrl) {
    return null
  }

  const handleVisualize = async () => {
    setIsLoading(true)
    setError(null)

    // Construct absolute URL for product image
    const absoluteProductImageUrl = `${window.location.origin}${product.imageUrl}`

    // Prepare user context for enhanced prompting
    const userContext = {
      styleProfile,
      roomAnalysis: analysisResult,
      lifestyleTags,
      roomType,
      budget
    }

    try {
      // Generate the visualization with context-aware prompting
      console.log('[CLIENT] Calling enhanced generate-image API with user context...')
      const generateResponse = await fetch('/api/visualize/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomImageUrl: uploadedFileUrl,
          productImageUrl: absoluteProductImageUrl,
          productCategory: product.category,
          productName: product.name,
          userContext, // Pass all user context for smart prompting
        }),
      })

      if (!generateResponse.ok) {
        throw new Error('Failed to generate visualization')
      }

      const { imageUrl } = await generateResponse.json()
      console.log('[CLIENT] Generated image received')
      setGeneratedImage(imageUrl)

    } catch (error) {
      console.error('[CLIENT] Error in visualization process:', error)
      setError('Failed to generate visualization. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        className="fixed bottom-8 left-8 bg-gray-800 text-white font-medium py-3 px-6 hover:bg-gray-700 transition-all z-40 flex items-center justify-center"
        onClick={handleVisualize}
        disabled={isLoading}
      >
        <EyeIcon className="w-4 h-4 mr-2" />
        {isLoading ? 'Visualizing...' : 'Visualize in My Room'}
      </button>

      {/* Modal for displaying generated image */}
      {generatedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 border-2 border-black shadow-[8px_8px_0px_#000] relative max-w-2xl max-h-[90vh] overflow-auto">
            <button
              className="absolute top-2 right-2 bg-black text-white w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-800 transition-all"
              onClick={() => setGeneratedImage(null)}
            >
              ×
            </button>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-2">✨ Your {product.name} in Your Space</h3>
              <p className="text-sm text-gray-600 mb-4">
                AI-generated using your {styleProfile?.styleHierarchy?.foundation || 'selected'} style preferences
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2">Original Room</h4>
                  <Image
                    src={uploadedFileUrl}
                    alt="Original Room"
                    width={400}
                    height={300}
                    className="w-full h-auto border border-gray-200"
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-2">With {product.name}</h4>
                  <Image
                    src={generatedImage}
                    alt="Room with Product"
                    width={400}
                    height={300}
                    className="w-full h-auto border border-gray-200"
                  />
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border border-gray-200">
                <h4 className="font-medium mb-2">Personalization Details:</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  {styleProfile?.styleHierarchy?.foundation && (
                    <p>• Styled for <strong>{styleProfile.styleHierarchy.foundation}</strong> aesthetic</p>
                  )}
                  {analysisResult?.description && (
                    <p>• Matched to your room's <strong>{analysisResult.description.split('.')[0].toLowerCase()}</strong></p>
                  )}
                  {lifestyleTags?.length > 0 && (
                    <p>• Considers your lifestyle: <strong>{lifestyleTags.slice(0, 3).join(', ')}</strong></p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error toast */}
      {error && (
        <div className="fixed bottom-20 left-8 bg-red-500 text-white p-3 font-bold shadow-[4px_4px_0px_#000] border-2 border-black z-50 max-w-sm">
          {error}
        </div>
      )}
    </>
  )
}