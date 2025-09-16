'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PlusIcon, PhotoIcon } from '@heroicons/react/24/outline'

interface CreationData {
  id: string
  name?: string
  style?: string
  roomType?: string
  budget?: string
  lifestyleTags: string[]
  styleProfile?: Record<string, unknown>
  originalImageUrl?: string
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

export default function DashboardPage() {
  const [sessions, setSessions] = useState<CreationData[]>([])
  const [loading, setLoading] = useState(true)
  const [, ] = useState<string | null>(null)

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/creations')
        
        if (response.ok) {
          const data = await response.json()
          setSessions(data)
        } else {
          // Don't show error, just show empty state
          console.log('API not available, showing empty state')
          setSessions([])
        }
      } catch (err) {
        console.error('Error fetching sessions:', err)
        setSessions([])
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [])

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center py-12">
          <video
            src="/logo-loading.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-46 h-46 object-contain opacity-90"
            aria-label="Loading animation"
          />
          <div className="animate-pulse text-gray-600">Loading your dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="w-full px-6 py-8">

        {/* Recent Creations */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-3xl font-medium md:font-base">Recent Designs</h2>
              <Link
                href="/dashboard/history"
                className="text-black/80 hover:text-black/60 font-medium text-sm"
              >
                View All
              </Link>
            </div>
          </div>

          {sessions.length === 0 ? (
            <div className="p-6 flex flex-col items-center justify-center">
              <Image src="/images/empty-box.png" alt="No designs" width={100} height={100} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No designs yet</h3>
              <p className="text-gray-600 mb-6 text-center">Start creating your first personalized room design!</p>
              <Link
                href="/welcome"
                className="inline-flex items-center px-6 py-3 bg-brand-gold text-white font-medium rounded-lg hover:bg-brand-dark-brown transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create Your First Design
              </Link>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.slice(0, 6).map((session) => (
                  <Link key={session.id} href={`/dashboard/${session.id}`}>
                    <div className="bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                      {/* Image Preview */}
                      <div className="aspect-video bg-gray-200 relative">
                        {session.generatedImageUrl ? (
                          <Image
                            src={session.generatedImageUrl}
                            alt="Generated room visualization"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            unoptimized={session.generatedImageUrl.startsWith('data:')}
                          />
                        ) : session.originalImageUrl ? (
                          <Image
                            src={session.originalImageUrl}
                            alt="Original room image"
                            fill
                            className="object-cover opacity-70 group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <PhotoIcon className="w-12 h-12" />
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <div className="absolute top-2 right-2">
                          {session.generationStatus === 'completed' && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              ✓ Complete
                            </span>
                          )}
                          {session.generationStatus === 'generating' && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                              ⏳ Processing
                            </span>
                          )}
                          {session.generationStatus === 'not_generated' && (
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                              ◯ Draft
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-900 truncate uppercase">
                            {`${session.style || 'AI Styled'} ${session.roomType || 'Room'}`}
                          </h3>
                          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                            {new Date(session.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                          {session.budget && (
                            <div>Budget: <span className="font-medium">{session.budget}</span></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {sessions.length > 6 && (
                <div className="text-center mt-6">
                  <Link
                    href="/dashboard/history"
                    className="inline-flex items-center px-4 py-2 text-black/80 hover:text-black/60 font-medium"
                  >
                    View All {sessions.length} Designs →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-brand-gold to-brand-warm-brown rounded-lg px-6 py-4 text-white flex flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Start New Design</h3>
              <p className="text-brand-cream mb-4 text-sm">Upload your space, get product recommendations</p>
            </div>
            <Link
              href="/welcome"
              className="inline-flex items-center px-4 py-2 bg-white text-brand-dark-brown font-medium rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-brand-forest to-brand-dark-brown rounded-lg p-6 text-white flex flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Browse History</h3>
              <p className="text-gray-200 mb-4 text-sm">View all your previous designs and visualizations</p>
            </div>
            <Link
              href="/dashboard/history"
              className="inline-flex items-center px-4 py-2 bg-white text-brand-dark-brown font-medium rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              View History
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}