'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface CreationData {
  id: string
  name?: string
  style?: string
  roomType?: string
  budget?: string
  lifestyleTags: string[]
  styleProfile?: Record<string, unknown>
  originalImageUrl?: string
  originalImageBase64?: string
  originalImageMimeType?: string
  analysisResult?: Record<string, unknown>
  recommendedProductIds: string[]
  recommendationsData?: Record<string, unknown>[]
  generatedImageUrl?: string
  generationStatus: string
  notes?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export default function HistoryPage() {
  const [sessions, setSessions] = useState<CreationData[]>([])
  const [loading, setLoading] = useState(true)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/creations')
        
        if (response.ok) {
          const data = await response.json()
          setSessions(data)
        } else {
          // Don't show error, just show empty state when database is unavailable
          console.log('API not available, showing empty state')
          setSessions([])
        }
      } catch (err) {
        console.error('Error fetching sessions:', err)
        // Don't show error, just show empty state when database is unavailable
        setSessions([])
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Creation History</h1>
        <div className="text-center py-12">
          <div className="animate-pulse text-gray-600">Loading your creations...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Creation History</h1>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-brand-gold text-white rounded hover:bg-brand-dark-brown transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Creation History</h1>
        <Link 
          href="/welcome" 
          className="px-4 py-2 bg-brand-gold text-white font-medium rounded hover:bg-brand-dark-brown transition-colors"
        >
          Create New Design
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-600 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No creations yet</h3>
          <p className="text-gray-600 mb-6">Start creating your first personalized room design!</p>
          <Link 
            href="/welcome" 
            className="px-6 py-3 bg-brand-gold text-white font-medium rounded-lg hover:bg-brand-dark-brown transition-colors"
          >
            Get Started
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <Link key={session.id} href={`/dashboard/${session.id}`}>
              <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                {/* Image Preview */}
                <div className="aspect-video bg-gray-100 relative">
                  {session.generatedImageUrl ? (
                    <Image
                      src={session.generatedImageUrl}
                      alt="Generated room visualization"
                      fill
                      className="object-cover"
                      unoptimized={session.generatedImageUrl.startsWith('data:')}
                    />
                  ) : session.originalImageUrl ? (
                    <Image
                      src={session.originalImageUrl}
                      alt="Original room image"
                      fill
                      className="object-cover opacity-60"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Generation Status Badge */}
                  <div className="absolute top-2 right-2">
                    {session.generationStatus === 'completed' && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        ✓ Generated
                      </span>
                    )}
                    {session.generationStatus === 'generating' && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        ⏳ Generating
                      </span>
                    )}
                    {session.generationStatus === 'not_generated' && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        ◯ Not Generated
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 truncate">
                      {session.name || `${session.style || 'Styled'} ${session.roomType || 'Room'}`}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    {session.style && (
                      <div>Style: <span className="font-medium">{session.style}</span></div>
                    )}
                    {session.roomType && (
                      <div>Room: <span className="font-medium">{session.roomType}</span></div>
                    )}
                    {session.budget && (
                      <div>Budget: <span className="font-medium">{session.budget}</span></div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}