'use client'

import { useState } from 'react'
import { XMarkIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [experience, setExperience] = useState<{value: string, emoji: string, text: string} | null>(null)
  const [features, setFeatures] = useState<string[]>([])
  const [improvementText, setImprovementText] = useState('')

  if (!isOpen) return null

  const handleFeatureToggle = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  const handleNext = () => {
    if (currentStep === 1 && experience) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Experience:', experience)
    console.log('Features used:', features)
    onClose()
  }

  const resetForm = () => {
    setCurrentStep(1)
    setExperience(null)
    setFeatures([])
    setImprovementText('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-99 transition-all duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {currentStep === 2 && (
              <button
                onClick={handleBack}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
              </button>
            )}
            <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-black" />
              Share Feedback
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-50">
          {/* Step 1: Experience Rating */}
          {currentStep === 1 && (
            <div>
            <div className='bg-white rounded-b-xl p-6 space-y-4'>
              <div className='text-center'>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  How was your experience today?
                </h3>
                <p className="text-gray-600 text-sm">
                  Help us understand how your visit went
                </p>
              </div>
              
              <div className="gap-4 flex justify-center">
                {[ 
                    { value: 'very-poor', emoji: '😞', text: 'Very Poor - major problems' },
                    { value: 'poor', emoji: '😕', text: 'Poor - faced some frustrations' },
                    { value: 'okay', emoji: '😐', text: 'Okay - it was fine but could be better' },
                    { value: 'good', emoji: '🙂', text: 'Good - mostly positive with minor issues' },
                    { value: 'great', emoji: '😀', text: 'Great - everything worked smoothly' },
                ].map((option) => (
                    <div
                      key={option.value}
                      onClick={() => setExperience(option)}
                      className={`flex items-center justify-center p-2 w-8 h-8 rounded-full cursor-pointer transition-colors ${
                        experience?.value === option.value
                          ? 'bg-gray-200'
                          : 'bg-transparent'
                      }`}
                    >
                      <span className="text-2xl">{option.emoji}</span>
                    </div>
                ))}
              </div>
              {experience && (
                <p className="text-black/60 text-sm text-center font-semibold">
                  {experience.text}
                </p>
              )}
              </div>
              {/* Improvement textarea - shows when experience is not "Great" */}
              {experience && experience.value !== 'great' && (
                <div className="p-6">
                  <label className="block text-lg font-medium text-gray-700 mb-2 text-center">
                    What specifically could we improve?
                  </label>
                  <textarea
                    value={improvementText}
                    onChange={(e) => setImprovementText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-forest focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Tell us what we can do better..."
                  />
                </div>
              )}
              
              {experience && (
                <div className="flex justify-end p-6">
                    <button
                    onClick={handleNext}
                    disabled={!experience}
                    className="px-6 py-2 text-sm font-medium text-white bg-brand-gold hover:bg-brand-dark-brown disabled:bg-gray-300 disabled:cursor-not-allowed rounded-md transition-colors"
                    >
                    Next
                    </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Features Used */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Which part of Calla & Copper did you use today?
                </h3>
                <p className="text-gray-600 text-sm">
                  Select all that apply
                </p>
              </div>
              
              <div className="space-y-3">
                {[
                  'Style quiz',
                  'Room visualizer', 
                  'Product recommendations',
                  'Other'
                ].map((feature) => (
                  <div
                    key={feature}
                    onClick={() => handleFeatureToggle(feature)}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      features.includes(feature)
                        ? 'border-brand-gold bg-brand-gold/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                      features.includes(feature)
                        ? 'border-brand-gold bg-brand-gold'
                        : 'border-gray-300'
                    }`}>
                      {features.includes(feature) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 text-sm font-medium text-white bg-brand-gold hover:bg-brand-dark-brown rounded-md transition-colors"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}