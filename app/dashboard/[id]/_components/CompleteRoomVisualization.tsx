'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useDemoStore } from '@/lib/store/demo-store'
import { SparklesIcon, EyeIcon } from '@heroicons/react/24/solid'

interface Product {
  id: number
  name: string
  style: string
  category?: string
  description?: string
  tags: string[]
  price: number
  imageUrl: string
}

interface CompleteRoomVisualizationProps {
  products: Product[]
  creationId?: string
  existingGeneratedImage?: string | null
  onImageGenerated?: (imageUrl: string) => void
}

export function CompleteRoomVisualization({ products, creationId, existingGeneratedImage, onImageGenerated }: CompleteRoomVisualizationProps) {
  const { 
    uploadedFileUrl, 
    uploadedFileBase64,
    uploadedFileMimeType,
    styleProfile, 
    analysisResult, 
    lifestyleTags, 
    roomType,
    budget 
  } = useDemoStore()
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(existingGeneratedImage || null)
  const [showModal, setShowModal] = useState(false)

  const handleGenerateRoom = useCallback(async () => {
    console.log('[CLIENT] 🎨 ROOM GENERATION - Starting')
    console.log('[CLIENT] 📊 Current demo store state:', {
      uploadedFileUrl: uploadedFileUrl,
      uploadedFileBase64Length: uploadedFileBase64?.length,
      uploadedFileMimeType: uploadedFileMimeType,
      productsCount: products.length
    })
    
    setIsLoading(true)
    setError(null)

    // Prepare products with absolute URLs
    const productsWithAbsoluteUrls = products.map(product => ({
      ...product,
      imageUrl: `${window.location.origin}${product.imageUrl}`
    }))

    // Prepare user context for enhanced prompting
    const userContext = {
      styleProfile,
      roomAnalysis: analysisResult,
      lifestyleTags,
      roomType,
      budget
    }

    try {
      console.log('[CLIENT] 🛋️ Generating complete room visualization with', products.length, 'products')
      console.log('[CLIENT] 🖼️ Image data being sent to API:', {
        uploadedFileBase64Available: !!uploadedFileBase64,
        base64Length: uploadedFileBase64?.length,
        mimeType: uploadedFileMimeType,
        roomImageUrl: uploadedFileUrl
      })
      const requestPayload = {
        roomImageBase64: uploadedFileBase64,
        roomImageMimeType: uploadedFileMimeType,
        products: productsWithAbsoluteUrls,
        userContext,
        creationId, // Pass creation ID to save to database
      }
      
      console.log('[CLIENT] 📤 Sending request to generate-complete-room API:', {
        roomImageBase64Length: requestPayload.roomImageBase64?.length,
        roomImageMimeType: requestPayload.roomImageMimeType,
        productsCount: requestPayload.products.length,
        hasUserContext: !!requestPayload.userContext
      })
      
      const generateResponse = await fetch('/api/visualize/generate-complete-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      })

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json()
        throw new Error(errorData.error || 'Failed to generate room visualization')
      }

      const { imageUrl } = await generateResponse.json()
      console.log('[CLIENT] ✅ Complete room visualization generated successfully')
      console.log('[CLIENT] 📸 Generated image details:', {
        imageUrlType: typeof imageUrl,
        imageUrlLength: imageUrl?.length,
        startsWithData: imageUrl?.startsWith('data:'),
        mimeType: imageUrl?.split(';')[0]?.split(':')[1] || 'unknown'
      })
      console.log('[CLIENT] 💾 Image automatically saved to database via API')
      setGeneratedImage(imageUrl)
      
      // Notify parent component that image was generated
      if (onImageGenerated) {
        onImageGenerated(imageUrl)
      }

    } catch (error) {
      console.error('[CLIENT] Error in complete room visualization:', error)
      
      // Check if it's a quota error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      if (errorMessage.includes('quota') || errorMessage.includes('exceeded')) {
        setError('API quota exceeded. The feature works - we just need to upgrade the API plan for unlimited usage. Try again in a few minutes or contact support.')
      } else {
        setError('Failed to generate room visualization. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [uploadedFileBase64, uploadedFileMimeType, uploadedFileUrl, products, styleProfile, analysisResult, lifestyleTags, roomType, budget, creationId, onImageGenerated])

  // Load existing generated image on mount
  useEffect(() => {
    console.log('[CLIENT] 🔍 CompleteRoomVisualization props:', {
      hasExistingImage: !!existingGeneratedImage,
      existingImagePreview: existingGeneratedImage?.substring(0, 50) || 'none',
      creationId: creationId || 'none'
    })
    if (existingGeneratedImage) {
      console.log('[CLIENT] 🖼️ Loading existing generated image from database')
      setGeneratedImage(existingGeneratedImage)
    }
  }, [existingGeneratedImage, creationId])

  // Auto-generate on component mount if we have all the data but no existing image
  useEffect(() => {
    if (uploadedFileUrl && products.length > 0 && !generatedImage && !isLoading && !existingGeneratedImage) {
      console.log('[CLIENT] 🤖 Auto-generating room since no existing image found')
      // Add a small delay to prevent duplicate calls
      const timer = setTimeout(() => {
        handleGenerateRoom()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [uploadedFileUrl, products, generatedImage, isLoading, existingGeneratedImage, handleGenerateRoom])

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
  if (!uploadedFileUrl || !uploadedFileBase64 || !uploadedFileMimeType || products.length === 0) {
    return null
  }

  const handleShowFullView = () => {
    setShowModal(true)
  }

  return (
    <>
      <div className="mb-12 bg-gradient-to-r from-brand-cream to-amber-50 p-8 border-2 border-brand-gold/30">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-brand-dark-brown mb-2 flex items-center justify-center gap-2">
            <SparklesIcon className="w-6 h-6 text-brand-gold" />
            Your Complete Room Transformation
          </h2>
          <p className="text-brand-warm-brown">
            See all your personalized recommendations styled together in your space
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <video
              src="/seat-loading.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-24 h-24 object-contain opacity-90 mb-4 mix-blend-darken"
              aria-label="Loading animation"
            />
            <p className="text-brand-dark-brown font-medium">Creating your dream room...</p>
            <p className="text-sm text-brand-warm-brown mt-2">
              AI is placing {products.length} items perfectly in your space
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={handleGenerateRoom}
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium hover:from-yellow-500 hover:to-orange-600 transition-all rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🍌 Try Again with Nano Banana
            </button>
          </div>
        ) : generatedImage ? (
          <div className="space-y-4">
            <div className="cursor-pointer border-2 border-brand-gold/30 hover:border-brand-gold transition-colors bg-white rounded-lg overflow-hidden max-w-lg mx-auto shadow-md hover:shadow-lg" onClick={handleShowFullView}>
              <Image
                src={generatedImage}
                alt="Complete Room Transformation"
                width={500}
                height={350}
                className="w-full h-auto block"
                priority
                unoptimized={generatedImage.startsWith('data:')}
                style={{ maxWidth: '100%', height: 'auto' }}
                onLoad={() => console.log('[CLIENT] Image loaded successfully')}
                onError={(e) => console.error('[CLIENT] Image load error:', e)}
              />
            </div>
            <p className="text-center text-sm text-gray-600 italic">Click to view side by side comparison</p>
            
            <div className="text-center">
              <button
                onClick={handleShowFullView}
                className="px-6 py-2 bg-brand-gold text-white font-medium hover:bg-brand-dark-brown transition-colors flex items-center gap-2 mx-auto"
              >
              <EyeIcon className="w-4 h-4" />
              Compare View
              </button>
            </div>

            <div className="bg-white p-4 border border-brand-gold/30">
              <h4 className="font-medium mb-2 text-black uppercase">Personalization Details:</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <p>• <strong>{products.length} products</strong> styled together</p>
                {styleProfile?.styleHierarchy?.foundation && (
                  <p>• Designed for <strong>{styleProfile.styleHierarchy.foundation}</strong> aesthetic</p>
                )}
                {roomType && (
                  <p>• Optimized for <strong>{roomType}</strong> layout and flow</p>
                )}
                {lifestyleTags?.length > 0 && (
                  <p>• Considers your lifestyle: <strong>{lifestyleTags.slice(0, 3).join(', ')}</strong></p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <button
              onClick={handleGenerateRoom}
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all flex items-center gap-2 mx-auto rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <SparklesIcon className="w-5 h-5" />
              🍌 Generate with Nano Banana
            </button>
            <p className="text-sm text-gray-600 mt-3">
              Generate your complete room visualization with AI magic
            </p>
          </div>
        )}
      </div>

      {/* Full-size modal */}
      {showModal && generatedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 border-2 border-black shadow-[8px_8px_0px_#000] relative max-w-6xl max-h-[90vh] overflow-auto">
            <button
              className="absolute top-2 right-2 bg-black text-white w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-800 transition-all"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-2">✨ Your Complete Room Transformation</h3>
              <p className="text-gray-600 mb-6">
                Before and after comparison with your top recommended products
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3 text-lg">Before: Original Room</h4>
                  <Image
                    src={uploadedFileUrl}
                    alt="Original Room"
                    width={500}
                    height={400}
                    className="w-full h-auto border-2 border-gray-200"
                    priority
                  />
                </div>
                <div>
                  <h4 className="font-bold mb-3 text-lg">After: With Your Recommendations</h4>
                  <Image
                    src={generatedImage}
                    alt="Transformed Room"
                    width={500}
                    height={400}
                    className="w-full h-auto border-2 border-gray-200"
                    priority
                    unoptimized={generatedImage.startsWith('data:')}
                  />
                </div>
              </div>
              
              <div className="mt-6 p-6 bg-gradient-to-r from-brand-cream to-amber-50 border-2 border-brand-gold/30">
                <h4 className="font-medium mb-2 text-black uppercase mb-2">Complete Transformation Details:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium mb-2">Products Included:</p>
                    <ul className="space-y-1 text-gray-700">
                      {products.map(product => (
                        <li key={product.id}>• {product.name} ({product.category})</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Design Considerations:</p>
                    <div className="space-y-1 text-gray-700">
                      {styleProfile?.styleHierarchy?.foundation && (
                        <p>• {styleProfile.styleHierarchy.foundation} style cohesion</p>
                      )}
                      {roomType && <p>• {roomType} optimization</p>}
                      {lifestyleTags?.slice(0, 3).map(tag => (
                        <p key={tag}>• {tag} considerations</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error toast */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-3 font-bold shadow-[4px_4px_0px_#000] border-2 border-black z-50 max-w-sm">
          {error}
        </div>
      )}
    </>
  )
}