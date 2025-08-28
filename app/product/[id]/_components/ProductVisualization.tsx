'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useDemoStore } from '@/lib/store/demo-store'

interface ProductVisualizationProps {
  product: {
    imageUrl: string
    category: string
  }
}

export function ProductVisualization({ product }: ProductVisualizationProps) {
  const { uploadedFileUrl } = useDemoStore()
  
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

    try {
      // Step 1: Describe the room
      console.log('[CLIENT] Calling describe-room API...')
      const describeResponse = await fetch('/api/visualize/describe-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadedFileUrl,
        }),
      })

      if (!describeResponse.ok) {
        throw new Error('Failed to describe room')
      }

      const { description, mainFurnitureItem } = await describeResponse.json()
      console.log('[CLIENT] Room description received:', { description, mainFurnitureItem })

      // Step 2: Generate the visualization
      console.log('[CLIENT] Calling generate-image API...')
      const generateResponse = await fetch('/api/visualize/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomImageUrl: uploadedFileUrl,
          productImageUrl: product.imageUrl,
          productCategory: product.category,
          roomDescription: description,
          mainFurnitureItem,
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
        className="fixed bottom-8 left-8 bg-black text-white font-bold py-3 px-6 shadow-[4px_4px_0px_#000] border-2 border-black hover:bg-gray-800 transition-all z-40"
        onClick={handleVisualize}
        disabled={isLoading}
      >
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
              <h3 className="text-lg font-bold mb-4">AI Visualization Result</h3>
              <Image
                src={generatedImage}
                alt="AI Visualization"
                width={512}
                height={512}
                className="w-full h-auto"
              />
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